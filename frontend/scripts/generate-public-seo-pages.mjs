import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const builtIndex = resolve(root, 'dist/index.html');
const routeIndex = resolve(root, 'dist/soluciones-digitales/index.html');
const canonical = 'https://www.agromanagerar.com/soluciones-digitales';
const title = 'Desarrollo web para el agro | AgroManager Digital';
const description = 'Páginas web y soluciones digitales para productores, empresas y profesionales del campo argentino.';

let html = await readFile(builtIndex, 'utf8');
html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
html = html.replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${description}" />`);
html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${title}" />`);
html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${description}" />`);
html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`);
html = html.replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${title}" />`);
html = html.replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${description}" />`);

if (!html.includes('rel="canonical"')) {
  html = html.replace('</head>', `    <link rel="canonical" href="${canonical}" />\n  </head>`);
}

await mkdir(dirname(routeIndex), { recursive: true });
await writeFile(routeIndex, html, 'utf8');
