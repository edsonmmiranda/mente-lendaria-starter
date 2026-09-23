// Roda uma skill do Kit com um agente real sobre uma fixture e confere o resultado com o checador
// determinístico. Ferramenta do mantenedor. Consome a assinatura ou a API do agente escolhido.
//
// Uso: node scripts/bench-agent.mjs --agent claude|codex|grok|gemini [--task maintain|ask|voice] [--model <id>]
// Sem --model, usa o modelo padrão do agente.

import { spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { checkRun, prepareFixture } from "./maintenance-check.mjs";
import { TASKS, checkAsk, checkVoice, prepareVault } from "./task-checks.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const fixtureDir = path.join(repoRoot, "fixtures", "alimentacao-continua");
const expectedPath = path.join(fixtureDir, "expected.json");

function argument(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

// A instrução vem da própria skill de agendamento: uma fonte só para o texto que o aluno usa.
function scheduledInstruction() {
  const skill = fs.readFileSync(
    path.join(repoRoot, "vault", ".agents", "skills", "schedule-maintenance", "SKILL.md"),
    "utf8"
  );
  const match = skill.match(/## Instrução da tarefa[\s\S]*?```text\n([\s\S]*?)\n```/);
  if (!match) throw new Error("Instrução da tarefa não encontrada em schedule-maintenance");
  return match[1].trim();
}

function command(agent, vault, prompt, model) {
  const withModel = (args, flag = "--model") => (model ? [...args, flag, model] : args);
  switch (agent) {
    case "claude":
      return ["claude", withModel([
        "-p", prompt,
        "--allowedTools", "Read,Write,Edit,Glob,Grep",
        "--disallowedTools", "Bash,WebFetch,WebSearch",
        "--permission-mode", "dontAsk",
        "--output-format", "json",
        "--no-session-persistence"
      ])];
    case "codex":
      return ["codex", withModel([
        "exec", "-s", "workspace-write", "--skip-git-repo-check", "--ephemeral", "--json", "-C", vault, prompt
      ], "-m")];
    case "grok":
      return ["grok", withModel([
        "-p", prompt,
        "--cwd", vault,
        "--disallowed-tools", "run_terminal_cmd,web_search,web_fetch,task",
        "--always-approve",
        "--output-format", "json"
      ], "-m")];
    case "gemini":
      return ["gemini", withModel(["-p", prompt, "--approval-mode", "auto_edit", "-o", "json"], "-m")];
    default:
      throw new Error(`agente desconhecido: ${agent}`);
  }
}

// Texto final do agente, para a tarefa de pergunta.
function finalAnswer(agent, stdout) {
  try {
    if (agent === "codex") {
      const messages = stdout
        .split("\n")
        .map((line) => { try { return JSON.parse(line); } catch { return null; } })
        .filter((event) => event?.type === "item.completed" && event.item?.type === "agent_message");
      return messages.at(-1)?.item?.text ?? "";
    }
    const parsed = JSON.parse(stdout);
    return parsed.result ?? parsed.text ?? parsed.response ?? "";
  } catch {
    return stdout;
  }
}

const agent = argument("--agent");
const task = argument("--task") ?? "maintain";
if (!agent || !["maintain", "ask", "voice"].includes(task)) {
  console.error("uso: node scripts/bench-agent.mjs --agent claude|codex|grok|gemini [--task maintain|ask|voice] [--model <id>]");
  process.exit(2);
}
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const resultDir = path.join(repoRoot, "bench-results", `${stamp}-${task}-${agent}`);
const workRoot = fs.mkdtempSync(path.join(os.tmpdir(), `segundo-cerebro-bench-${agent}-`));
const { vault, prestatePath } =
  task === "maintain" ? prepareFixture(fixtureDir, workRoot) : prepareVault(TASKS[task].overlays, workRoot);
const prompt = task === "maintain" ? scheduledInstruction() : TASKS[task].prompt;
const [binary, args] = command(agent, vault, prompt, argument("--model"));

const started = Date.now();
const run = spawnSync(binary, args, {
  cwd: vault,
  encoding: "utf8",
  timeout: 20 * 60 * 1000,
  maxBuffer: 64 * 1024 * 1024,
  stdio: ["ignore", "pipe", "pipe"]
});
const seconds = Math.round((Date.now() - started) / 1000);

fs.mkdirSync(resultDir, { recursive: true });
fs.writeFileSync(path.join(resultDir, "stdout.txt"), run.stdout ?? "");
fs.writeFileSync(path.join(resultDir, "stderr.txt"), run.stderr ?? "");
fs.cpSync(vault, path.join(resultDir, "vault-depois"), { recursive: true });
fs.copyFileSync(prestatePath, path.join(resultDir, "prestate.json"));

const answer = task === "ask" ? finalAnswer(agent, run.stdout ?? "") : null;
if (answer !== null) fs.writeFileSync(path.join(resultDir, "resposta.md"), answer);
const result =
  task === "maintain"
    ? checkRun({ vault, prestatePath, expectedPath })
    : task === "ask"
      ? { ...checkAsk({ vault, prestatePath, answer }), changedNotes: [] }
      : { ...checkVoice({ vault, prestatePath }), changedNotes: fs.existsSync(path.join(vault, "Minha Voz.md")) ? ["Minha Voz.md"] : [] };
const report = {
  agent,
  task,
  model: argument("--model") ?? "padrão do agente",
  exit_status: run.status,
  error: run.error ? String(run.error.message) : null,
  seconds,
  skill_sha256: crypto
    .createHash("sha256")
    .update(fs.readFileSync(path.join(repoRoot, "vault", ".agents", "skills", "maintain-vault", "SKILL.md")))
    .digest("hex")
    .slice(0, 12),
  instruction: prompt,
  command: [binary, ...args.map((value) => (value === prompt ? "<instrução da tarefa>" : value))],
  check_ok: result.ok,
  failures: result.failures,
  changed_notes: result.changedNotes
};
fs.writeFileSync(path.join(resultDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
fs.rmSync(workRoot, { recursive: true, force: true });

if (run.status !== 0 || run.error) {
  console.log(`ERRO DO AGENTE: ${agent} saiu com ${run.status ?? run.error?.message}. Veja stderr.txt antes de ler o checador.`);
}
console.log(`${task} ${agent}: saída ${run.status}, ${seconds}s, notas criadas ou editadas: ${result.changedNotes.join(", ") || "nenhuma"}`);
console.log(result.ok ? "PASS" : `FAIL\n${result.failures.join("\n")}`);
console.log(`Evidência: ${path.relative(repoRoot, resultDir)}`);
process.exit(result.ok ? 0 : 1);
