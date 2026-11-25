// Contrôles avant mise en ligne : aucun numéro de téléphone, un seul H1, title et description uniques.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); });
walk('dist');
const errs = [], titles = new Map(), descs = new Map();
const tel = /(tel:|(?:\+33|\+32|\b0)[1-9](?:[\s.-]?\d{2}){4}\b)/;
for (const f of files) {
  const h = readFileSync(f, 'utf8');
  const txt = h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
  if (tel.test(txt)) errs.push(`${f} : numéro de téléphone détecté`);
  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) errs.push(`${f} : ${h1} balises H1`);
  const t = h.match(/<title>(.*?)<\/title>/)?.[1], d = h.match(/name="description" content="(.*?)"/)?.[1];
  if (t) (titles.get(t) ? errs.push(`${f} : title déjà utilisé par ${titles.get(t)}`) : titles.set(t, f));
  if (d) (descs.get(d) ? errs.push(`${f} : description déjà utilisée par ${descs.get(d)}`) : descs.set(d, f));
}
console.log(`${files.length} pages contrôlées`);
if (errs.length) { console.error(errs.join('\n')); process.exit(1); }
console.log('Aucune erreur.');
