import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = path.resolve(import.meta.dirname, "..");
const vaultRoot = path.join(repoRoot, "vault");
const skillNames = [
  "mente-lendaria-setup",
  "capture-source",
  "connect-notes",
  "build-moc",
  "review-vault"
];

const requiredFiles = [
  ".mente-lendaria/INSTRUCOES-DA-IA.md",
  ".mente-lendaria/manifest.json",
  ".obsidian/app.json",
  ".obsidian/appearance.json",
  ".obsidian/core-plugins.json",
  ".obsidian/graph.json",
  ".obsidian/snippets/mente-lendaria.css",
  ...skillNames.flatMap((skill) => [
    `.agents/skills/${skill}/SKILL.md`,
    `.agents/skills/${skill}/agents/openai.yaml`
  ]),
  ".agents/skills/review-vault/scripts/vault_health.py",
  "00 - Comece Aqui.md",
  "Ideias que me Perseguem.md",
  "Mapa Inicial.canvas",
  "Meu Norte.md",
  "Perguntas que me Movem.md",
  "Pessoas e Conversas.md",
  "Projetos em Movimento.md"
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

function isHiddenVaultPath(file) {
  return path.relative(vaultRoot, file).split(path.sep).some((part) => part.startsWith("."));
}

const files = walk(vaultRoot);
const markdownFiles = files.filter((file) => file.endsWith(".md"));
const visibleMarkdownFiles = markdownFiles.filter((file) => !isHiddenVaultPath(file));
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

for (const file of visibleMarkdownFiles) {
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
  const skillPath = path.join(vaultRoot, ".agents", "skills", skill, "SKILL.md");
  const metadataPath = path.join(vaultRoot, ".agents", "skills", skill, "agents", "openai.yaml");
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

for (const relativePath of ["README.md", "PROMPT-DO-SLIDE.md"]) {
  const contents = fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
  if (/claude|cowork|grok|gemini/i.test(contents)) {
    errors.push(`Referência a outro produto encontrada em ${relativePath}`);
  }
}

const packageJson = JSON.parse(fs.readFileSync(path.join(repoRoot, "package.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(vaultRoot, ".mente-lendaria", "manifest.json"), "utf8"));
if (manifest.version !== packageJson.version) errors.push("Versões divergentes entre package.json e manifest.json");
if (manifest.chatgpt_only !== true) errors.push("manifest.json deve declarar chatgpt_only como true");
if (manifest.authorization_mode !== "single_full_access") errors.push("Modo de autorização divergente no manifest.json");
if (JSON.stringify(manifest.skills) !== JSON.stringify(skillNames)) errors.push("Lista de skills divergente no manifest.json");

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  `Validação concluída: ${requiredFiles.length} arquivos obrigatórios, ${visibleMarkdownFiles.length} notas visíveis, ${skillNames.length} skills e Canvas íntegro.`
);
