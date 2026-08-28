import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const vaultRoot = path.join(repoRoot, "vault");
const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "segundo-cerebro-kit-portability-"));
const phases = ["prepared", "inventory", "capture", "connections", "maps", "interface", "validation", "open"];
const executableExtensions = new Set([".py", ".js", ".mjs", ".cjs", ".sh", ".bash", ".zsh", ".ps1", ".bat", ".cmd", ".exe"]);
const bundledPluginRelativeRoot = path.join(".obsidian", "plugins", "codex-panel");
const bundledPluginMain = path.join(vaultRoot, bundledPluginRelativeRoot, "main.js");

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function nextDestination(parent, baseName) {
  let candidate = path.join(parent, baseName);
  let suffix = 2;
  while (fs.existsSync(candidate)) {
    candidate = path.join(parent, `${baseName}-${suffix}`);
    suffix += 1;
  }
  return candidate;
}

function copyWithoutOverwrite(source, parent, baseName) {
  const destination = nextDestination(parent, baseName);
  fs.cpSync(source, destination, { recursive: true, errorOnExist: true, force: false });
  return destination;
}

function updatePhase(state, phase, status, evidence) {
  const index = phases.indexOf(phase);
  assert.notEqual(index, -1);
  for (const previous of phases.slice(0, index)) {
    assert.ok(["complete", "skipped"].includes(state.phases[previous].status), `fase anterior incompleta: ${previous}`);
  }
  state.phases[phase] = { status, evidence, updated_at: "2026-08-25T00:00:00Z" };
  const statuses = phases.map((name) => state.phases[name].status);
  state.status = statuses.every((value) => ["complete", "skipped"].includes(value)) ? "complete" : "running";
  state.updated_at = "2026-08-25T00:00:00Z";
}

function visibleNotes(vault) {
  const operational = new Set(["AGENTS.md", "CLAUDE.md", "INICIE-AQUI-IA.md"]);
  return walk(vault).filter((file) => {
    const relative = path.relative(vault, file);
    return file.endsWith(".md") && !relative.split(path.sep).some((part) => part.startsWith(".")) && !operational.has(relative);
  });
}

function health(vault) {
  const notes = visibleNotes(vault);
  const canvases = walk(vault).filter((file) => file.endsWith(".canvas") && !path.relative(vault, file).split(path.sep).some((part) => part.startsWith(".")));
  const byName = new Map([...notes, ...canvases].map((file) => [path.basename(file, path.extname(file)), file]));
  const brokenLinks = [];
  let links = 0;
  const incoming = new Map(notes.map((file) => [file, 0]));
  const outgoing = new Map();

  for (const note of notes) {
    const targets = [...fs.readFileSync(note, "utf8").matchAll(/\[\[([^\]]+)\]\]/g)]
      .map((match) => match[1].split("|", 1)[0].split("#", 1)[0].replace(/\.md$/i, "").trim())
      .filter(Boolean);
    outgoing.set(note, targets.length);
    links += targets.length;
    for (const target of targets) {
      const resolved = byName.get(path.basename(target));
      if (!resolved) brokenLinks.push({ source: path.basename(note), target });
      else if (incoming.has(resolved)) incoming.set(resolved, incoming.get(resolved) + 1);
    }
  }

  const orphanNotes = notes.filter((note) => outgoing.get(note) + incoming.get(note) === 0);
  return { notes: notes.length, links, brokenLinks, orphanNotes };
}

try {
  const distributedExecutables = walk(vaultRoot).filter((file) => executableExtensions.has(path.extname(file).toLowerCase()));
  assert.deepEqual(distributedExecutables, [bundledPluginMain], "o cofre contém executável fora do plugin aprovado");

  const source = path.join(temporaryRoot, "download", "meu-segundo-cerebro");
  const documents = path.join(temporaryRoot, "Documents");
  fs.mkdirSync(path.dirname(source), { recursive: true });
  fs.mkdirSync(documents, { recursive: true });
  fs.cpSync(vaultRoot, source, { recursive: true });
  const originalHome = fs.readFileSync(path.join(source, "00 - Comece Aqui.md"), "utf8");

  const first = copyWithoutOverwrite(source, documents, "meu-segundo-cerebro");
  const second = copyWithoutOverwrite(source, documents, "meu-segundo-cerebro");
  assert.equal(path.basename(first), "meu-segundo-cerebro");
  assert.equal(path.basename(second), "meu-segundo-cerebro-2");
  assert.equal(fs.readFileSync(path.join(source, "00 - Comece Aqui.md"), "utf8"), originalHome);
  assert.equal(fs.existsSync(path.join(first, ".segundo-cerebro-kit", "completion-receipt.json")), false);

  const enabledPlugins = JSON.parse(fs.readFileSync(path.join(first, ".obsidian", "community-plugins.json"), "utf8"));
  assert.deepEqual(enabledPlugins, ["codex-panel"]);
  const copiedPluginRoot = path.join(first, bundledPluginRelativeRoot);
  const copiedPluginManifest = JSON.parse(fs.readFileSync(path.join(copiedPluginRoot, "manifest.json"), "utf8"));
  assert.equal(copiedPluginManifest.id, "codex-panel");
  assert.equal(copiedPluginManifest.version, "5.6.0");
  assert.equal(copiedPluginManifest.isDesktopOnly, true);
  assert.equal(fs.existsSync(path.join(copiedPluginRoot, "data.json")), false);
  assert.ok(fs.readFileSync(path.join(copiedPluginRoot, "main.js")).equals(fs.readFileSync(bundledPluginMain)));

  const statePath = path.join(first, ".segundo-cerebro-kit", "run-state.json");
  const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
  state.vault_path = first;
  state.created_at = "2026-08-25T00:00:00Z";
  updatePhase(state, "prepared", "complete", "cópia confirmada");
  assert.throws(() => updatePhase(state, "capture", "complete", "fora de ordem"), /fase anterior incompleta/);

  for (const phase of ["inventory", "capture", "connections", "maps", "interface", "validation"]) {
    updatePhase(state, phase, "complete", `evidência ${phase}`);
  }
  updatePhase(state, "open", "skipped", "controle visual indisponível");
  assert.equal(state.status, "complete");
  fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);

  const report = health(first);
  assert.equal(report.brokenLinks.length, 0);
  assert.equal(report.orphanNotes.length, 0);

  const schema = JSON.parse(fs.readFileSync(path.join(first, ".segundo-cerebro-kit", "completion-receipt.schema.json"), "utf8"));
  const receipt = {
    ...schema,
    vault_path: first,
    completed_at: "2026-08-25T00:00:00Z",
    state_status: state.status,
    notes: report.notes,
    links: report.links,
    broken_links: report.brokenLinks.length,
    orphan_notes: report.orphanNotes.length,
    open_status: state.phases.open.status
  };
  const receiptPath = path.join(first, ".segundo-cerebro-kit", "completion-receipt.json");
  fs.writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
  const verifiedReceipt = JSON.parse(fs.readFileSync(receiptPath, "utf8"));
  assert.equal(verifiedReceipt.status, "complete");
  assert.equal(verifiedReceipt.verification_mode, "agent-native-file-tools");
  assert.equal(verifiedReceipt.broken_links, 0);

  console.log("PASS portabilidade: somente plugin aprovado, cópia segura, ordem de fases, validação e recibo verificável.");
} finally {
  fs.rmSync(temporaryRoot, { recursive: true, force: true });
}
