// Verificação determinística das tarefas de pergunta (answer-from-vault) e de voz (calibrate-voice).
// Ferramenta do mantenedor: não entra no cofre distribuído.

import fs from "node:fs";
import path from "node:path";
import { candidates, grounded, origins, relativeFiles, sha256, splitFrontmatter } from "./maintenance-check.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const kitVault = path.join(repoRoot, "vault");
const fixtures = path.join(repoRoot, "fixtures");

export const ASK_PROMPT =
  "$answer-from-vault Responda usando a skill .agents/skills/answer-from-vault/SKILL.md. " +
  "Pergunta 1: que alarme de vibração foi proposto para a bomba B-12, e quem aprovou o orçamento dos sensores, de quanto? " +
  "Pergunta 2: qual empresa vai fornecer os sensores de vibração? " +
  "É uma pergunta simples: não grave nenhum arquivo.";

export const VOICE_PROMPT =
  "$calibrate-voice Use a skill .agents/skills/calibrate-voice/SKILL.md, etapa 1 (contrato), para o trabalho " +
  "\"relatório de falha para a gerência\". Quem lê é a gerente de planta, que decide se aprova parada, troca ou compra. " +
  "Os textos que aprovei como meus estão em Fontes/Meus Textos. Ninguém vai responder agora: faça só a etapa 1 e pare.";

export function prepareVault(overlays, destinationRoot) {
  const vault = path.join(destinationRoot, "meu-segundo-cerebro");
  fs.cpSync(kitVault, vault, { recursive: true, errorOnExist: true, force: false });
  for (const overlay of overlays) fs.cpSync(path.join(fixtures, overlay), vault, { recursive: true, force: true });
  const prestate = Object.fromEntries(relativeFiles(vault).map((relative) => [relative, sha256(path.join(vault, relative))]));
  const prestatePath = path.join(destinationRoot, "prestate.json");
  fs.writeFileSync(prestatePath, `${JSON.stringify({ files: prestate }, null, 2)}\n`);
  return { vault, prestatePath };
}

export const TASKS = {
  ask: { overlays: ["alimentacao-continua/overlay", "alimentacao-continua/golden"], prompt: ASK_PROMPT },
  voice: { overlays: ["alimentacao-continua/overlay", "voz/overlay"], prompt: VOICE_PROMPT }
};

function changes(vault, prestatePath) {
  const prestate = JSON.parse(fs.readFileSync(prestatePath, "utf8")).files;
  const current = relativeFiles(vault);
  const currentSet = new Set(current);
  return {
    prestate,
    currentSet,
    deleted: Object.keys(prestate).filter((file) => !currentSet.has(file)),
    created: current.filter((file) => !(file in prestate)),
    modified: current.filter((file) => file in prestate && sha256(path.join(vault, file)) !== prestate[file])
  };
}

function wikilinkTargets(text) {
  return [...text.matchAll(/\[\[([^\]]+)\]\]/g)].map((match) =>
    match[1].split("|")[0].split("#")[0].trim().replace(/\.md$/i, "").normalize("NFC")
  );
}

function resolveTarget(vault, target) {
  if (target.includes("/")) {
    const file = `${target}.md`;
    return fs.existsSync(path.join(vault, file)) ? file : null;
  }
  const matches = relativeFiles(vault).filter(
    (file) => file.endsWith(".md") && !file.split("/").some((part) => part.startsWith(".")) &&
      path.posix.basename(file, ".md").normalize("NFC") === target
  );
  return matches.length === 1 ? matches[0] : null;
}

function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}

// Resposta de pergunta: nada gravado, fatos literais, proposta tratada como proposta, lacuna declarada, links íntegros.
export function checkAsk({ vault, prestatePath, answer }) {
  const failures = [];
  const fail = (code, message) => failures.push(`${code} ${message}`);
  const diff = changes(vault, prestatePath);
  for (const file of [...diff.deleted, ...diff.created, ...diff.modified]) {
    if (!file.startsWith(".obsidian/")) fail("A1", `pergunta simples alterou arquivo: ${file}`);
  }
  if (!answer || !answer.trim()) {
    fail("A2", "resposta vazia");
    return { ok: false, failures };
  }
  for (const literal of ["4,5 mm/s", "18.500,00", "Renata"]) {
    if (!answer.includes(literal)) fail("A2", `resposta sem o fato literal: ${literal}`);
  }
  if (!/propost|propôs|propos/i.test(answer)) fail("A3", "o alarme aparece sem ser tratado como proposta");
  const gapIndex = answer.search(/lacuna/i);
  if (gapIndex === -1) {
    fail("A4", "resposta sem seção de lacunas");
  } else if (!/fornecedor|empresa|sensor/i.test(answer.slice(gapIndex))) {
    fail("A4", "a pergunta sem resposta no cofre não aparece nas lacunas");
  }
  const linked = [];
  for (const target of wikilinkTargets(answer)) {
    const file = resolveTarget(vault, target);
    if (!file) fail("A5", `link sem destino na resposta: [[${target}]]`);
    else linked.push(file);
  }
  if (linked.length === 0) fail("A5", "resposta sem nenhum link para nota ou fonte");
  const haystacks = [...new Set(linked)].map((file) => normalize(fs.readFileSync(path.join(vault, file), "utf8")));
  for (const candidate of candidates(answer)) {
    if (!haystacks.some((haystack) => grounded(candidate, haystack))) {
      fail("A6", `sem ancoragem literal nas notas citadas: ${candidate.kind} "${candidate.value}"`);
    }
  }
  return { ok: failures.length === 0, failures };
}

// Etapa 1 da voz: cartão proposto e não confirmado, evidência literal, testes de acerto e falha, nada além do cartão.
export function checkVoice({ vault, prestatePath }) {
  const failures = [];
  const fail = (code, message) => failures.push(`${code} ${message}`);
  const diff = changes(vault, prestatePath);
  for (const file of diff.deleted) fail("V1", `arquivo apagado ou movido: ${file}`);
  for (const file of [...diff.created, ...diff.modified]) {
    if (file !== "Minha Voz.md" && !file.startsWith(".obsidian/")) fail("V1", `etapa 1 alterou outro arquivo: ${file}`);
  }
  const cardPath = path.join(vault, "Minha Voz.md");
  if (!fs.existsSync(cardPath)) {
    fail("V2", "Minha Voz.md não foi criado");
    return { ok: false, failures };
  }
  const card = fs.readFileSync(cardPath, "utf8");
  const status = (splitFrontmatter(card).frontmatter.match(/^status:\s*(\S+)/m) ?? [])[1];
  if (status !== "proposta") fail("V2", `cartão sem aprovação deveria ser proposta, está: ${status ?? "sem status"}`);
  const sources = origins(card);
  const voiceSources = sources.filter((source) => source.startsWith("Fontes/Meus Textos/"));
  if (voiceSources.length === 0) fail("V3", "origem não lista os textos aprovados");
  const haystacks = [];
  for (const source of sources) {
    if (!diff.currentSet.has(source)) fail("V3", `origem inexistente: ${source}`);
    else haystacks.push(normalize(fs.readFileSync(path.join(vault, source), "utf8")));
  }
  // V4 confere a evidência, não os exemplos hipotéticos dos testes de falha.
  for (const target of wikilinkTargets(card).filter((target) => target.startsWith("Fontes/Meus Textos/"))) {
    const file = resolveTarget(vault, target);
    if (file) haystacks.push(normalize(fs.readFileSync(path.join(vault, file), "utf8")));
  }
  const evidence = splitFrontmatter(card).body
    .split("\n")
    .flatMap((line) =>
      // Só o rótulo "Evidência:" (ou "Evidência adicional:") abre um trecho de evidência; a palavra solta na prosa não.
      [...line.matchAll(/evid[êe]ncia[^:\n]{0,40}:/gi)].map((match) =>
        line.slice(match.index + match[0].length).split(/acerta quando|evid[êe]ncia[^:\n]{0,40}:/i)[0]
      )
    );
  if (evidence.length === 0) fail("V4", "nenhuma evidência marcada no cartão");
  for (const candidate of candidates(evidence.join("\n"))) {
    if (!haystacks.some((haystack) => grounded(candidate, haystack))) {
      fail("V4", `evidência sem ancoragem literal: ${candidate.kind} "${candidate.value}"`);
    }
  }
  const passes = (card.match(/acerta quando/gi) ?? []).length;
  const failsTests = (card.match(/falha quando/gi) ?? []).length;
  if (passes < 2 || failsTests < 2) fail("V5", `menos de duas regras com teste de acerto e de falha (${passes}/${failsTests})`);
  if (!/não decidido/i.test(card)) fail("V5", "sem o campo do que ainda não está decidido");
  for (const target of wikilinkTargets(card)) {
    if (!resolveTarget(vault, target)) fail("V6", `link sem destino no cartão: [[${target}]]`);
  }
  return { ok: failures.length === 0, failures };
}
