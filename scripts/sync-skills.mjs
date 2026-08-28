import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = path.resolve(import.meta.dirname, "..");
const canonicalRoot = path.join(repoRoot, "vault", ".agents", "skills");
const projectionRoot = path.join(repoRoot, "vault", ".claude", "skills");
const checkOnly = process.argv.includes("--check");

function filesUnder(root) {
  if (!fs.existsSync(root)) return [];
  return fs
    .readdirSync(root, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => path.relative(root, path.join(entry.parentPath, entry.name)))
    .filter((relative) => !relative.split(path.sep).some((part) => part === "__pycache__" || part === ".DS_Store"))
    .sort();
}

function differences() {
  const canonicalFiles = filesUnder(canonicalRoot);
  const projectionFiles = filesUnder(projectionRoot);
  const errors = [];
  if (JSON.stringify(canonicalFiles) !== JSON.stringify(projectionFiles)) {
    errors.push("listas de arquivos divergentes")
  }
  for (const relative of canonicalFiles) {
    const projected = path.join(projectionRoot, relative);
    if (!fs.existsSync(projected)) continue;
    if (!fs.readFileSync(path.join(canonicalRoot, relative)).equals(fs.readFileSync(projected))) {
      errors.push(`conteúdo divergente: ${relative}`);
    }
  }
  return errors;
}

if (checkOnly) {
  const errors = differences();
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exit(1);
  }
  console.log("Projeção Claude sincronizada com a fonte canônica.");
} else {
  fs.rmSync(projectionRoot, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(projectionRoot), { recursive: true });
  fs.cpSync(canonicalRoot, projectionRoot, { recursive: true });
  console.log("Projeção Claude atualizada.");
}
