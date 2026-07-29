// Copia o site já buildado (out/) para a raiz do repositório.
//
// O serviço do Render publica a RAIZ do repo, então o site que os convidados
// veem são os arquivos gerados que ficam aqui na raiz (index.html, _next/, fotos).
// O código-fonte continua em app/, components/ e lib/.
//
// Uso: npm run publicar   (roda o build e copia)

import { cp, readdir, rm, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(raiz, "out");

try {
  await stat(out);
} catch {
  console.error(
    "Pasta out/ não encontrada. Rode `npm run build` antes (ou use `npm run publicar`)."
  );
  process.exit(1);
}

// Remove o _next antigo da raiz para não acumular chunks de builds anteriores.
await rm(join(raiz, "_next"), { recursive: true, force: true });

const itens = await readdir(out);
for (const item of itens) {
  await cp(join(out, item), join(raiz, item), { recursive: true, force: true });
}

console.log(
  `✓ ${itens.length} itens copiados de out/ para a raiz. Agora: git add -A && git commit && git push origin main`
);
