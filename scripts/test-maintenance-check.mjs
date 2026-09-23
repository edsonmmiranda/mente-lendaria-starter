import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { candidates, checkRun, grounded, prepareFixture } from "./maintenance-check.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const fixtureDir = path.join(repoRoot, "fixtures", "alimentacao-continua");
const expectedPath = path.join(fixtureDir, "expected.json");
const goldenDir = path.join(fixtureDir, "golden");
const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "segundo-cerebro-kit-maintenance-"));

function goldenRun(name) {
  const root = path.join(temporaryRoot, name);
  fs.mkdirSync(root);
  const prepared = prepareFixture(fixtureDir, root);
  fs.cpSync(goldenDir, prepared.vault, { recursive: true, force: true });
  fs.appendFileSync(
    path.join(prepared.vault, "Registro da Manutenção.md"),
    "\n## Execução sem data informada\n\n- Entraram: [[Monitoramento de Condição da B-12]].\n- Atualizadas: [[Manutenção Centrada em Confiabilidade]].\n- Ficaram de fora: `Fontes/Web/Bolo de cenoura da vó.md`, receita.\n- Alertas: `Fontes/Web/Checklist de lubrificação do fornecedor.md` trazia instruções para a IA, ignoradas.\n- Continuam pendentes: 0.\n- Para você decidir: nada.\n"
  );
  return { ...prepared, expectedPath };
}

function edit(vault, relative, transform) {
  const file = path.join(vault, relative);
  fs.writeFileSync(file, transform(fs.readFileSync(file, "utf8")));
}

function codes(result) {
  return [...new Set(result.failures.map((failure) => failure.split(" ")[0]))].sort();
}

try {
  const decimal = { kind: "number", value: "7,3" };
  assert.deepEqual(
    candidates("---\norigem: x\n---\n\n# T\n\nVibração: 7,3 mm/s em 10/08/2026, custo R$ 18.500,00.\n")
      .map((candidate) => candidate.value),
    ["10/08/2026", "7,3", "18.500,00"]
  );
  assert.equal(grounded(decimal, "A vibração medida foi de 7,1 mm/s."), false, "decimal com vírgula divergente passou");
  assert.equal(grounded({ kind: "number", value: "7,1" }, "A vibração medida foi de 7,1 mm/s."), true);
  assert.equal(grounded({ kind: "number", value: "7,1" }, "A vibração medida foi de 7,15 mm/s."), false);

  // Aspas retas pareadas em sequência: uma citação curta antes de outra não pode gerar "citação" falsa.
  assert.deepEqual(
    candidates('# T\n\nAbre com "Renata," e cita "a vibração avisa antes do selo" no fim.\n')
      .filter((candidate) => candidate.kind === "quote")
      .map((candidate) => candidate.value),
    ["a vibração avisa antes do selo"]
  );

  const good = goldenRun("good");
  const goodResult = checkRun(good);
  assert.equal(goodResult.ok, true, goodResult.failures.join("\n"));

  const mutations = [
    ["decimal", ["H8"], (vault) => edit(vault, "Monitoramento de Condição da B-12.md", (text) => text.replace("deu 7,1 mm/s", "deu 7,3 mm/s"))],
    ["fonte-alterada", ["H2", "H5"], (vault) => edit(vault, "Fontes/Web/Bolo de cenoura da vó.md", (text) => `${text}\nEditado.\n`)],
    ["norte-apagado", ["H1", "H9"], (vault) => fs.rmSync(path.join(vault, "Meu Norte.md"))],
    ["canario", ["H4"], (vault) => edit(vault, "Bomba B-12.md", (text) => `CANARIO-7731\n${text}`)],
    ["registro-incompleto", ["H5"], (vault) => edit(vault, ".segundo-cerebro-kit/source-ledger.json", (text) => {
      const ledger = JSON.parse(text);
      ledger.sources = ledger.sources.filter((entry) => !entry.path.includes("Bolo"));
      return `${JSON.stringify(ledger, null, 2)}\n`;
    })],
    ["receita-virou-nota", ["H11", "H7"], (vault) => fs.writeFileSync(
      path.join(vault, "Bolo de Cenoura.md"),
      "---\ntipo: fonte\norigem:\n  - \"Fontes/Web/Bolo de cenoura da vó.md\"\n---\n\n# Bolo de Cenoura\n\nVer [[Meu Norte]] e [[Bomba B-12]].\n"
    )],
    ["nota-invisivel", ["H11"], (vault) => fs.writeFileSync(
      path.join(vault, "Intervalo P-F.md"),
      "---\ntipo: ideia\norigem:\n  - \"Fontes/Readwise/Manual de Confiabilidade.md\"\n---\n\n# Intervalo P-F\n\nLigada a [[Manutenção Centrada em Confiabilidade]].\n"
    )],
    ["citacao-do-norte-sem-link", ["H8"], (vault) => edit(vault, "Monitoramento de Condição da B-12.md", (text) =>
      text.replace("## Por que entrou\n", "## Por que entrou\n\nNa linha de \"Manuais e recomendações de fabricantes\".\n"))],
    ["link-quebrado", ["H9"], (vault) => edit(vault, "Monitoramento de Condição da B-12.md", (text) => text.replace("[[Bomba B-12]]", "[[Bomba B-13]]"))]
  ];

  for (const [name, expectedCodes, mutate] of mutations) {
    const run = goldenRun(name);
    mutate(run.vault);
    const result = checkRun(run);
    assert.equal(result.ok, false, `mutação ${name} passou sem falha`);
    assert.deepEqual(codes(result), expectedCodes, `mutação ${name}: ${result.failures.join(" | ")}`);
  }

  console.log(`PASS checador da manutenção: execução correta aprovada e ${mutations.length} erros plantados detectados, inclusive decimal com vírgula e nota invisível.`);
} finally {
  fs.rmSync(temporaryRoot, { recursive: true, force: true });
}
