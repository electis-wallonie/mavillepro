// Audit complet du site construit (dist/)
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const base = process.env.BASE ?? '/mavillepro';
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); });
walk('dist');
const pb = {}; const add = (k, v) => (pb[k] ??= []).push(v);
const resout = (href) => {
  let p = href.split('#')[0].split('?')[0]; if (!p) return true;
  if (!p.startsWith(base)) return false; p = p.slice(base.length) || '/';
  const f = join('dist', p, p.endsWith('/') ? 'index.html' : '');
  return existsSync(f) || existsSync(join('dist', p));
};
let liens = 0;
for (const f of files) {
  const h = readFileSync(f, 'utf8'); const page = f.replace('dist', '');
  const t = h.match(/<title>(.*?)<\/title>/)?.[1] ?? ''; const d = h.match(/name="description" content="(.*?)"/)?.[1] ?? '';
  const tl = t.replace(/&#39;|&amp;|&quot;/g, 'x').length, dl = d.replace(/&#39;|&amp;|&quot;/g, 'x').length;
  if (!page.includes('404') && !page.includes('merci')) {
    if (tl > 65) add('title > 65 caractères', `${tl} ${page}`);
    if (tl < 25) add('title < 25 caractères', page);
    if (dl > 160) add('description > 160 caractères', `${dl} ${page}`);
    if (dl < 70) add('description < 70 caractères', page);
  }
  if (!/<link rel="canonical" href="[^"]+"/.test(h)) add('pas de canonical', page);
  for (const m of h.matchAll(/<img\b[^>]*>/g)) { if (!/\balt(=|\s|>)/.test(m[0])) add('image sans alt', page); if (!/\bwidth=/.test(m[0])) add('image sans width', page); }
  for (const m of h.matchAll(/href="([^"]+)"/g)) {
    const u = m[1]; if (/^(https?:|mailto:|#)/.test(u) || u.endsWith('.svg') || u.endsWith('.xml')) continue;
    liens++; if (!resout(u)) add('lien cassé', `${page} -> ${u}`);
  }
  for (const s of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(s[1]); } catch { add('JSON-LD invalide', page); } }
  const txt = h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/&#39;/g, "'");
  for (const re of [/\bà Le /, /\bà Les /, /\bde Le /, /\bde Les /, /\bde [AEIOUÉÈÂ][a-zé]/, /\bundefined\b/, /\bNaN\b/, /\[object/, /\.\./, /  +\./]) {
    const m = txt.match(re); if (m) add(`texte suspect ${re}`, `${page} : «${txt.slice(Math.max(0, m.index - 30), m.index + 40).replace(/\s+/g, ' ')}»`);
  }
  if (/\(0 km\)|· 0 km/.test(txt)) add('distance 0 km', page);
}
console.log(`${files.length} pages, ${liens} liens internes vérifiés`);
for (const [k, v] of Object.entries(pb)) { console.log(`\n## ${k} : ${v.length}`); v.slice(0, 8).forEach((x) => console.log('  ' + x)); }
