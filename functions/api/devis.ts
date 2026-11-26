// Réception du formulaire de devis (Cloudflare Pages Functions).
// Vérifie la demande, puis la transmet au script Google (tableau + alerte e-mail).
interface Env { DEVIS_CLE?: string; APPS_SCRIPT_URL?: string }

const APPS_SCRIPT_URL_DEFAUT = 'https://script.google.com/macros/s/AKfycbw1HPBZhZT6aO-KsvUjuVQRkio124Xgm2OWpgjKco9Bwi63o_sZgAQUDrQH1GiGBX-T/exec';
const CHAMPS = ['ouvrage', 'ouvrage_detail', 'metier', 'prenom', 'nom', 'telephone', 'email', 'code_postal', 'ville', 'departement', 'commune', 'message', 'page'] as const;

const reponse = (ok: boolean, status = 200) =>
  new Response(JSON.stringify({ ok }), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let f: FormData;
  try { f = await request.formData(); } catch { return reponse(false, 400); }
  if (String(f.get('site_web') ?? '')) return reponse(true); // champ piège rempli : robot, on ignore sans le dire
  const d: Record<string, string> = {};
  for (const k of CHAMPS) d[k] = String(f.get(k) ?? '').trim().slice(0, 2000);
  const tel = d.telephone.replace(/[^\d+]/g, '');
  if (!d.prenom || !d.nom || tel.length < 9 || !/^\S+@\S+\.\S+$/.test(d.email) || !/^\d{4,5}$/.test(d.code_postal)) return reponse(false, 422);
  const ref = request.headers.get('Referer') ?? '';
  d.pays = /\/be\//.test(d.page || ref) ? 'Belgique' : 'France';
  const url = env.APPS_SCRIPT_URL || APPS_SCRIPT_URL_DEFAUT;
  const cle = env.DEVIS_CLE ?? '';
  try {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ cle, data: d }), redirect: 'follow' });
    const j = (await r.json().catch(() => ({}))) as { ok?: boolean };
    return reponse(!!j.ok, j.ok ? 200 : 502);
  } catch {
    return reponse(false, 502);
  }
};
