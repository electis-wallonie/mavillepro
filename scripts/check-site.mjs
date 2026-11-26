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

// Taux de texte commun entre pages commune voisines (hors formulaire)
const contenu = (f) => {
  let m = readFileSync(f, 'utf8').match(/<main[^>]*>([\s\S]*)<\/main>/)?.[1] ?? '';
  m = m.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<form[\s\S]*?<\/form>|<ol class="steps"[\s\S]*?<\/ol>/g, '').replace(/<[^>]+>/g, ' ');
  const w = m.replace(/&[a-z#0-9]+;/g, ' ').split(/\s+/).filter(Boolean).map((x) => x.toLowerCase());
  const s = new Set(); for (let i = 0; i < w.length - 5; i++) s.add(w.slice(i, i + 6).join(' '));
  return s;
};
const communes = files.filter((f) => /\/(metallerie|menuiserie|vitrerie)\/[^/]+-\d{4,5}\/index\.html$/.test(f)).sort();
let total = 0, n = 0, max = 0;
for (let i = 0; i + 1 < communes.length; i += 7) {
  const A = contenu(communes[i]), B = contenu(communes[i + 1]);
  let c = 0; A.forEach((x) => B.has(x) && c++);
  const r = c / Math.min(A.size, B.size); total += r; n++; max = Math.max(max, r);
}
if (n) console.log(`Texte commun entre pages commune proches : moyenne ${Math.round((total / n) * 100)} %, maximum ${Math.round(max * 100)} %`);
if (max > 0.75) { console.error('Taux de texte commun trop élevé (> 75 %)'); process.exit(1); }
