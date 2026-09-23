import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { TASKS, checkAsk, checkVoice, prepareVault } from "./task-checks.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const goldenAnswer = fs.readFileSync(path.join(repoRoot, "fixtures", "pergunta", "resposta-de-referencia.md"), "utf8");
const goldenCard = path.join(repoRoot, "fixtures", "voz", "golden", "Minha Voz.md");
const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "segundo-cerebro-kit-tasks-"));

function codes(result) {
  return [...new Set(result.failures.map((failure) => failure.split(" ")[0]))].sort();
}

function run(name, task) {
  const root = path.join(temporaryRoot, name);
  fs.mkdirSync(root);
  return prepareVault(TASKS[task].overlays, root);
}

try {
  const ask = run("ask-good", "ask");
  const good = checkAsk({ ...ask, answer: goldenAnswer });
  assert.equal(good.ok, true, good.failures.join("\n"));

  const askMutations = [
    ["gravou-arquivo", ["A1"], (vault) => fs.writeFileSync(path.join(vault, "Resposta.md"), "x\n"), goldenAnswer],
    ["numero-errado", ["A2", "A6"], null, goldenAnswer.replaceAll("4,5 mm/s", "4,3 mm/s")],
    ["proposta-virou-decisao", ["A3"], null, goldenAnswer.replace("foi uma proposta na reunião", "foi definido na reunião").replace("Proposta de alarme", "Alarme")],
    ["sem-lacuna", ["A4"], null, goldenAnswer.slice(0, goldenAnswer.indexOf("## Lacunas"))],
    ["link-quebrado", ["A5"], null, goldenAnswer.replace("[[Monitoramento de Condição da B-12]]", "[[Monitoramento da B-13]]")]
  ];
  for (const [name, expected, mutate, answer] of askMutations) {
    const prepared = run(`ask-${name}`, "ask");
    if (mutate) mutate(prepared.vault);
    const result = checkAsk({ ...prepared, answer });
    assert.equal(result.ok, false, `mutação ${name} passou`);
    assert.deepEqual(codes(result), expected, `mutação ${name}: ${result.failures.join(" | ")}`);
  }

  const voice = run("voice-good", "voice");
  fs.copyFileSync(goldenCard, path.join(voice.vault, "Minha Voz.md"));
  const voiceGood = checkVoice(voice);
  assert.equal(voiceGood.ok, true, voiceGood.failures.join("\n"));

  const card = fs.readFileSync(goldenCard, "utf8");
  const voiceMutations = [
    ["sem-aprovacao-confirmou", ["V2"], card.replace("status: proposta", "status: confirmada")],
    ["evidencia-inventada", ["V4"], card.replace("parou às 14h10 de 02/06/2026", "parou às 14h10 de 03/06/2026")],
    ["sem-testes", ["V5"], card.replaceAll("Acerta quando", "Exemplo").replaceAll("Falha quando", "Contraexemplo")]
  ];
  for (const [name, expected, text] of voiceMutations) {
    const prepared = run(`voice-${name}`, "voice");
    fs.writeFileSync(path.join(prepared.vault, "Minha Voz.md"), text);
    const result = checkVoice(prepared);
    assert.equal(result.ok, false, `mutação ${name} passou`);
    assert.deepEqual(codes(result), expected, `mutação ${name}: ${result.failures.join(" | ")}`);
  }
  const touched = run("voice-touched-norte", "voice");
  fs.copyFileSync(goldenCard, path.join(touched.vault, "Minha Voz.md"));
  fs.appendFileSync(path.join(touched.vault, "Meu Norte.md"), "\n- [[Minha Voz]]\n");
  assert.deepEqual(codes(checkVoice(touched)), ["V1"]);

  console.log(
    `PASS checador de pergunta e voz: referências aprovadas, ${askMutations.length} erros de resposta e ${voiceMutations.length + 1} erros de cartão detectados.`
  );
} finally {
  fs.rmSync(temporaryRoot, { recursive: true, force: true });
}
