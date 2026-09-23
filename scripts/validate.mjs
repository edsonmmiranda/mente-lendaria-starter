import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = path.resolve(import.meta.dirname, "..");
const vaultRoot = path.join(repoRoot, "vault");
const canonicalSkillsRoot = path.join(vaultRoot, ".agents", "skills");
const claudeSkillsRoot = path.join(vaultRoot, ".claude", "skills");
const skillNames = [
  "segundo-cerebro-setup",
  "capture-source",
  "connect-notes",
  "build-moc",
  "review-vault",
  "maintain-vault",
  "interview-me",
  "schedule-maintenance",
  "answer-from-vault",
  "calibrate-voice"
];
const requiredCapabilities = [
  "download_or_receive_public_archive",
  "extract_or_open_archive",
  "list_local_file_metadata",
  "copy_folder_without_overwrite",
  "read_selected_local_files",
  "write_and_verify_vault_files"
];
const operationalMarkdown = new Set(["AGENTS.md", "CLAUDE.md", "INICIE-AQUI-IA.md"]);
const bundledPlugin = {
  id: "codex-panel",
  version: "5.6.0",
  relativeRoot: ".obsidian/plugins/codex-panel",
  files: {
    LICENSE: "cfc7749b96f63bd31c3c42b5c471bf756814053e847c10f3eb003417bc523d30",
    NOTICE: "737fa38c37150bc4e814c598cd01eb0f82244ff639b489032c05a948cea7943c",
    "main.js": "427698b8496d1f13e37950e9a0ff28bc75e1eab7a04d9bc6b559182b1a1404dd",
    "manifest.json": "28a56cd668132590de9cdde70972b2187843931970827f0f6c428e6b075f1c56",
    "styles.css": "8a63fa10b0ab252294f104d796e32b1b0f4d2faab1441355e099b3ac7e08c72d"
  }
};
const expectedRuntimeDependencies = [
  {
    id: "codex-cli",
    required_for: "codex-panel",
    expected_preinstalled: true,
    credentials_bundled: false
  }
];
const expectedCommunityPlugins = [
  {
    id: "codex-panel",
    version: "5.6.0",
    enabled: true,
    desktop_only: true,
    metadata: ".segundo-cerebro-kit/bundled-plugins.json"
  }
];

const requiredFiles = [
  "AGENTS.md",
  "CLAUDE.md",
  "INICIE-AQUI-IA.md",
  ".segundo-cerebro-kit/INSTRUCOES-DA-IA.md",
  ".segundo-cerebro-kit/completion-receipt.schema.json",
  ".segundo-cerebro-kit/bundled-plugins.json",
  ".segundo-cerebro-kit/manifest.json",
  ".segundo-cerebro-kit/run-state.json",
  ".segundo-cerebro-kit/source-ledger.json",
  ".segundo-cerebro-kit/preferences.json",
  ".obsidian/app.json",
  ".obsidian/appearance.json",
  ".obsidian/core-plugins.json",
  ".obsidian/community-plugins.json",
  ".obsidian/graph.json",
  ".obsidian/snippets/segundo-cerebro-kit.css",
  ...Object.keys(bundledPlugin.files).map((file) => `${bundledPlugin.relativeRoot}/${file}`),
  ...skillNames.flatMap((skill) => [
    `.agents/skills/${skill}/SKILL.md`,
    `.agents/skills/${skill}/agents/openai.yaml`,
    `.claude/skills/${skill}/SKILL.md`,
    `.claude/skills/${skill}/agents/openai.yaml`
  ]),
  "00 - Comece Aqui.md",
  "Ideias que me Perseguem.md",
  "Mapa Inicial.canvas",
  "Meu Norte.md",
  "Perguntas que me Movem.md",
  "Pessoas e Conversas.md",
  "Projetos em Movimento.md",
  "Registro da Manutenção.md",
  "Fontes/LEIA-ME.md",
  ".agents/skills/calibrate-voice/LICENSE",
  ".claude/skills/calibrate-voice/LICENSE"
];

const errors = [];

for (const relativePath of requiredFiles) {
  if (!fs.existsSync(path.join(vaultRoot, relativePath))) {
    errors.push(`Arquivo obrigatório ausente: ${relativePath}`);
  }
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function relativeVaultPath(file) {
  return path.relative(vaultRoot, file);
}

function isHiddenVaultPath(file) {
  return relativeVaultPath(file).split(path.sep).some((part) => part.startsWith("."));
}

function relativeFiles(root) {
  if (!fs.existsSync(root)) return [];
  return walk(root)
    .map((file) => path.relative(root, file))
    .filter((relative) => !relative.split(path.sep).some((part) => part === "__pycache__" || part === ".DS_Store"))
    .sort();
}

const canonicalFiles = relativeFiles(canonicalSkillsRoot);
const claudeFiles = relativeFiles(claudeSkillsRoot);
if (JSON.stringify(canonicalFiles) !== JSON.stringify(claudeFiles)) {
  errors.push("Projeção .claude/skills diverge da lista canônica em .agents/skills");
}
for (const relative of canonicalFiles) {
  const projection = path.join(claudeSkillsRoot, relative);
  if (!fs.existsSync(projection)) continue;
  if (!fs.readFileSync(path.join(canonicalSkillsRoot, relative)).equals(fs.readFileSync(projection))) {
    errors.push(`Projeção Claude divergente: ${relative}`);
  }
}

const files = walk(vaultRoot);
const forbiddenRuntimeExtensions = new Set([".py", ".js", ".mjs", ".cjs", ".sh", ".bash", ".zsh", ".ps1", ".bat", ".cmd", ".exe"]);
const allowedRuntimeFiles = new Set([path.normalize(`${bundledPlugin.relativeRoot}/main.js`)]);
for (const file of files) {
  if (
    forbiddenRuntimeExtensions.has(path.extname(file).toLowerCase()) &&
    !allowedRuntimeFiles.has(path.normalize(relativeVaultPath(file)))
  ) {
    errors.push(`Executável não permitido no cofre zero-runtime: ${relativeVaultPath(file)}`);
  }
}

for (const generatedFile of [".segundo-cerebro-kit/completion-receipt.json", ".segundo-cerebro-kit/inventory.json"]) {
  if (fs.existsSync(path.join(vaultRoot, generatedFile))) {
    errors.push(`Artefato de execução não pode existir no kit inicial: ${generatedFile}`);
  }
}

const markdownFiles = files.filter((file) => file.endsWith(".md"));
const visibleMarkdownFiles = markdownFiles.filter((file) => !isHiddenVaultPath(file));
const seedMarkdownFiles = visibleMarkdownFiles.filter(
  (file) => !operationalMarkdown.has(relativeVaultPath(file))
);
const linkableFiles = files.filter(
  (file) => !isHiddenVaultPath(file) && (file.endsWith(".md") || file.endsWith(".canvas"))
);
const linkableByName = new Map(
  linkableFiles.map((file) => [path.basename(file, path.extname(file)).normalize("NFC"), file])
);

for (const file of files.filter((candidate) => candidate.endsWith(".json") || candidate.endsWith(".canvas"))) {
  try {
    JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    errors.push(`JSON inválido em ${path.relative(repoRoot, file)}: ${error.message}`);
  }
}

const communityPlugins = JSON.parse(
  fs.readFileSync(path.join(vaultRoot, ".obsidian", "community-plugins.json"), "utf8")
);
if (JSON.stringify(communityPlugins) !== JSON.stringify([bundledPlugin.id])) {
  errors.push("Codex Panel não está habilitado como único plugin comunitário do kit");
}

const pluginRoot = path.join(vaultRoot, bundledPlugin.relativeRoot);
const expectedPluginFiles = Object.keys(bundledPlugin.files).sort();
const actualPluginFiles = relativeFiles(pluginRoot);
if (JSON.stringify(actualPluginFiles) !== JSON.stringify(expectedPluginFiles)) {
  errors.push("Arquivos distribuídos do Codex Panel divergem do conjunto aprovado");
}
for (const [file, expectedHash] of Object.entries(bundledPlugin.files)) {
  const pluginFile = path.join(pluginRoot, file);
  if (!fs.existsSync(pluginFile)) continue;
  const actualHash = crypto.createHash("sha256").update(fs.readFileSync(pluginFile)).digest("hex");
  if (actualHash !== expectedHash) errors.push(`Checksum divergente no Codex Panel: ${file}`);
}

const pluginManifest = JSON.parse(fs.readFileSync(path.join(pluginRoot, "manifest.json"), "utf8"));
if (pluginManifest.id !== bundledPlugin.id || pluginManifest.version !== bundledPlugin.version) {
  errors.push("Manifesto do Codex Panel diverge da versão aprovada");
}
if (pluginManifest.minAppVersion !== "1.12.0" || pluginManifest.isDesktopOnly !== true) {
  errors.push("Compatibilidade declarada do Codex Panel está incorreta");
}

const bundledPluginsMetadata = JSON.parse(
  fs.readFileSync(path.join(vaultRoot, ".segundo-cerebro-kit", "bundled-plugins.json"), "utf8")
);
const bundledPluginMetadata = bundledPluginsMetadata.plugins?.find((plugin) => plugin.id === bundledPlugin.id);
if (bundledPluginsMetadata.schema_version !== 1 || !bundledPluginMetadata) {
  errors.push("Metadados do plugin comunitário ausentes ou inválidos");
} else {
  if (bundledPluginMetadata.version !== bundledPlugin.version || bundledPluginMetadata.enabled !== true) {
    errors.push("Versão ou ativação divergente nos metadados do Codex Panel");
  }
  if (bundledPluginMetadata.credentials_bundled !== false) {
    errors.push("Metadados do Codex Panel devem declarar ausência de credenciais");
  }
  if (JSON.stringify(bundledPluginMetadata.files) !== JSON.stringify(bundledPlugin.files)) {
    errors.push("Checksums registrados do Codex Panel divergem da versão aprovada");
  }
}

for (const file of seedMarkdownFiles) {
  const contents = fs.readFileSync(file, "utf8");
  const links = [...contents.matchAll(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g)]
    .map((match) => match[1].trim().normalize("NFC"));

  if (links.length < 2) {
    errors.push(`Nota-semente com menos de duas conexões: ${path.basename(file)}`);
  }

  for (const link of links) {
    if (!linkableByName.has(path.basename(link))) {
      errors.push(`Link sem destino em ${path.basename(file)}: [[${link}]]`);
    }
  }
}

const canvasPath = path.join(vaultRoot, "Mapa Inicial.canvas");
if (fs.existsSync(canvasPath)) {
  const canvas = JSON.parse(fs.readFileSync(canvasPath, "utf8"));
  for (const node of canvas.nodes ?? []) {
    if (node.type === "file" && !fs.existsSync(path.join(vaultRoot, node.file))) {
      errors.push(`Canvas aponta para arquivo ausente: ${node.file}`);
    }
  }
}

for (const skill of skillNames) {
  const skillPath = path.join(canonicalSkillsRoot, skill, "SKILL.md");
  const metadataPath = path.join(canonicalSkillsRoot, skill, "agents", "openai.yaml");
  if (!fs.existsSync(skillPath) || !fs.existsSync(metadataPath)) continue;

  const skillText = fs.readFileSync(skillPath, "utf8");
  const metadataText = fs.readFileSync(metadataPath, "utf8");
  if (!skillText.startsWith("---\n")) errors.push(`Frontmatter ausente em ${skill}/SKILL.md`);
  if (!new RegExp(`^name: ${skill}$`, "m").test(skillText)) errors.push(`Nome inválido em ${skill}/SKILL.md`);
  if (!/^description: .+/m.test(skillText)) errors.push(`Descrição ausente em ${skill}/SKILL.md`);
  if (/\bTODO\b/.test(skillText)) errors.push(`TODO restante em ${skill}/SKILL.md`);
  if (!/^interface:\s*$/m.test(metadataText)) errors.push(`Interface ausente em ${skill}/agents/openai.yaml`);
  if (!/^\s+display_name: ".+"$/m.test(metadataText)) errors.push(`display_name ausente em ${skill}/agents/openai.yaml`);
  if (!/^\s+short_description: ".{25,64}"$/m.test(metadataText)) errors.push(`short_description inválida em ${skill}/agents/openai.yaml`);
  if (!new RegExp(`^\\s+default_prompt: "\\$${skill} .+"$`, "m").test(metadataText)) {
    errors.push(`default_prompt inválido em ${skill}/agents/openai.yaml`);
  }
}

for (const file of markdownFiles) {
  const contents = fs.readFileSync(file, "utf8");
  if (contents.includes("\u2014")) {
    errors.push(`Travessão encontrado em ${path.relative(repoRoot, file)}`);
  }
}

const promptText = fs.readFileSync(path.join(repoRoot, "PROMPT-DO-SLIDE.md"), "utf8");
if (/chatgpt|claude|codex|grok|gemini/i.test(promptText)) {
  errors.push("PROMPT-DO-SLIDE.md deve permanecer independente de fornecedor");
}
if (!promptText.includes(".agents/skills/segundo-cerebro-setup/SKILL.md")) {
  errors.push("PROMPT-DO-SLIDE.md não aponta para a skill de configuração");
}
if (!/sou iniciante/i.test(promptText) || !/sem Git nem terminal/i.test(promptText)) {
  errors.push("PROMPT-DO-SLIDE.md não declara o cenário iniciante sem Git nem terminal");
}
if (!/acesso completo ao computador já concedido/i.test(promptText)) {
  errors.push("PROMPT-DO-SLIDE.md não declara o acesso ao computador já concedido");
}
if (!/nunca apague nem sobrescreva meus arquivos originais/i.test(promptText)) {
  errors.push("PROMPT-DO-SLIDE.md não protege os arquivos originais");
}

const packageJson = JSON.parse(fs.readFileSync(path.join(repoRoot, "package.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(vaultRoot, ".segundo-cerebro-kit", "manifest.json"), "utf8"));
if (manifest.version !== packageJson.version) errors.push("Versões divergentes entre package.json e manifest.json");
if (packageJson.name !== "segundo-cerebro-kit") errors.push("Nome técnico divergente no package.json");
if (manifest.kit !== "segundo-cerebro-kit") errors.push("Identidade técnica divergente no manifest.json");
if (manifest.vault_name !== "meu-segundo-cerebro") errors.push("Nome público do cofre divergente no manifest.json");
if (manifest.release !== "https://github.com/oalanicolas/segundo-cerebro-kit/releases/latest/download/Segundo-Cerebro-Kit.zip") {
  errors.push("URL da release divergente no manifest.json");
}
if (manifest.provider_agnostic !== true) errors.push("manifest.json deve declarar provider_agnostic como true");
if (Object.hasOwn(manifest, "chatgpt_only")) errors.push("manifest.json não pode conter chatgpt_only");
if (JSON.stringify(manifest.runtime_dependencies) !== JSON.stringify(expectedRuntimeDependencies)) {
  errors.push("Dependência local do Codex Panel divergente no manifest.json");
}
for (const field of ["requires_python", "requires_node", "requires_git", "requires_shell", "requires_package_manager"]) {
  if (manifest[field] !== false) errors.push(`manifest.json deve declarar ${field} como false`);
}
if (manifest.universal_instructions !== "INICIE-AQUI-IA.md") errors.push("Entrada universal divergente no manifest.json");
if (manifest.canonical_skills !== ".agents/skills") errors.push("Fonte canônica de skills divergente");
if (JSON.stringify(manifest.skill_projections) !== JSON.stringify([".claude/skills"])) {
  errors.push("Projeções de skills divergentes no manifest.json");
}
if (manifest.requires_gui_control !== false) errors.push("Controle visual deve permanecer opcional");
if (JSON.stringify(manifest.community_plugins) !== JSON.stringify(expectedCommunityPlugins)) {
  errors.push("Plugin comunitário divergente no manifest.json");
}
if (JSON.stringify(manifest.required_capabilities) !== JSON.stringify(requiredCapabilities)) {
  errors.push("Capacidades mínimas divergentes no manifest.json");
}
if (JSON.stringify(manifest.skills) !== JSON.stringify(skillNames)) errors.push("Lista de skills divergente no manifest.json");
if (manifest.maximum_source_files_first_run > 12) errors.push("Primeira execução não pode selecionar mais de 12 fontes");
if (manifest.minimum_personal_notes > manifest.maximum_personal_notes_first_run) {
  errors.push("Faixa de notas pessoais inválida");
}

const state = JSON.parse(fs.readFileSync(path.join(vaultRoot, ".segundo-cerebro-kit", "run-state.json"), "utf8"));
const expectedPhases = ["prepared", "inventory", "capture", "connections", "maps", "interface", "validation", "open"];
if (state.schema_version !== 2 || state.status !== "not_started" || state.vault_path !== "") {
  errors.push("run-state.json inicial inválido");
}
if (JSON.stringify(Object.keys(state.phases ?? {})) !== JSON.stringify(expectedPhases)) {
  errors.push("Fases divergentes em run-state.json");
}
for (const phase of expectedPhases) {
  if (state.phases?.[phase]?.status !== "pending") errors.push(`Fase inicial não pendente: ${phase}`);
}

const ledger = JSON.parse(
  fs.readFileSync(path.join(vaultRoot, ".segundo-cerebro-kit", "source-ledger.json"), "utf8")
);
if (ledger.schema_version !== 1 || !Array.isArray(ledger.sources) || ledger.sources.length !== 0) {
  errors.push("source-ledger.json inicial deve ter schema_version 1 e nenhuma fonte");
}
const preferences = JSON.parse(
  fs.readFileSync(path.join(vaultRoot, ".segundo-cerebro-kit", "preferences.json"), "utf8")
);
if (preferences.schema_version !== 1 || preferences.modo_de_entrada !== "automatica") {
  errors.push("preferences.json inicial deve usar modo_de_entrada automatica");
}
if (JSON.stringify(manifest.entry_modes) !== JSON.stringify(["automatica", "com-aprovacao"])) {
  errors.push("Modos de entrada divergentes no manifest.json");
}
const distributedSources = relativeFiles(path.join(vaultRoot, "Fontes"));
if (JSON.stringify(distributedSources) !== JSON.stringify(["LEIA-ME.md"])) {
  errors.push("Fontes/ no kit inicial deve conter somente LEIA-ME.md");
}
if (manifest.source_folder !== "Fontes") errors.push("Pasta de fontes divergente no manifest.json");
if (manifest.source_ledger !== ".segundo-cerebro-kit/source-ledger.json") {
  errors.push("Registro de fontes divergente no manifest.json");
}
if (manifest.maintenance_log !== "Registro da Manutenção.md") errors.push("Registro da manutenção divergente no manifest.json");
const maintenance = manifest.maintenance_contract ?? {};
if (
  maintenance.skill !== "maintain-vault" ||
  maintenance.runs_locally !== true ||
  maintenance.network !== false ||
  maintenance.shell !== "file-operations-only" ||
  maintenance.delete_move_rename !== false ||
  maintenance.sources_read_only !== true ||
  JSON.stringify(maintenance.allowed_operations) !== JSON.stringify(["list", "read", "search", "create", "edit"])
) {
  errors.push("Contrato da manutenção deve ser local, sem rede, com terminal só para arquivos e sem apagar, mover ou renomear");
}
const maintenanceSkill = fs.readFileSync(path.join(canonicalSkillsRoot, "maintain-vault", "SKILL.md"), "utf8");
for (const rule of ["Não use internet", "Nunca apague, mova, renomeie ou edite arquivos dentro de `Fontes/`", "conteúdo, não comandos", "literalmente na fonte citada"]) {
  if (!maintenanceSkill.includes(rule)) errors.push(`Regra dura ausente em maintain-vault: ${rule}`);
}
const voiceSkill = fs.readFileSync(path.join(canonicalSkillsRoot, "calibrate-voice", "SKILL.md"), "utf8");
if (!/iwo-szapar\/second-brain-skills/.test(voiceSkill) || !/Apache License 2\.0/.test(voiceSkill) || !/Modificações/.test(voiceSkill)) {
  errors.push("calibrate-voice deve manter atribuição, licença Apache-2.0 e aviso de modificação");
}
if (fs.existsSync(path.join(vaultRoot, "Minha Voz.md"))) errors.push("Minha Voz.md não pode existir no kit inicial");
const scheduleSkill = fs.readFileSync(path.join(canonicalSkillsRoot, "schedule-maintenance", "SKILL.md"), "utf8");
if (!/Nunca crie tarefa na nuvem ou remota/.test(scheduleSkill) || !/enabled_toolsets=\["file"\]/.test(scheduleSkill)) {
  errors.push("schedule-maintenance deve proibir tarefa remota e restringir o Hermes a ferramentas de arquivo");
}

const receiptSchema = JSON.parse(
  fs.readFileSync(path.join(vaultRoot, ".segundo-cerebro-kit", "completion-receipt.schema.json"), "utf8")
);
if (receiptSchema.schema_version !== 2 || receiptSchema.status !== "complete") {
  errors.push("Schema do recibo final inválido");
}
if (receiptSchema.verification_mode !== "agent-native-file-tools") {
  errors.push("Schema do recibo não declara validação por ferramentas nativas");
}
if (receiptSchema.completed_at !== null) {
  errors.push("Schema do recibo deve evitar timestamp inventado por padrão");
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  `Validação concluída: ${requiredFiles.length} arquivos obrigatórios, ${seedMarkdownFiles.length} notas-semente, ${skillNames.length} skills, Codex Panel ${bundledPlugin.version}, projeção Claude e Canvas íntegros.`
);
