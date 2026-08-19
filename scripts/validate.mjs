import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = path.resolve(import.meta.dirname, "..");
const vaultRoot = path.join(repoRoot, "vault");

const requiredFiles = [
  ".mente-lendaria/INSTRUCOES-DA-IA.md",
  ".mente-lendaria/manifest.json",
  ".obsidian/app.json",
  ".obsidian/appearance.json",
  ".obsidian/core-plugins.json",
  ".obsidian/graph.json",
  ".obsidian/snippets/mente-lendaria.css",
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

const files = walk(vaultRoot);
const markdownFiles = files.filter((file) => file.endsWith(".md"));
const linkableFiles = files.filter((file) => file.endsWith(".md") || file.endsWith(".canvas"));
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

for (const file of markdownFiles.filter((candidate) => !candidate.includes(`${path.sep}.mente-lendaria${path.sep}`))) {
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

for (const file of files.filter((candidate) => candidate.endsWith(".md"))) {
  const contents = fs.readFileSync(file, "utf8");
  if (contents.includes("\u2014")) {
    errors.push(`Travessão encontrado em ${path.relative(repoRoot, file)}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validação concluída: ${requiredFiles.length} arquivos obrigatórios, ${markdownFiles.length} notas Markdown e Canvas íntegro.`);
