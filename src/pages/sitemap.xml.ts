import type { APIRoute } from 'astro';
import { LISTE_METIERS } from '../data/metiers';
import { PUBLIEES, REGIONS } from '../data/communes';
import { pDe } from '../lib/pays';
import { u } from '../lib/site';
export const GET: APIRoute = ({ site }) => {
  const paths = ['/', ...['fr', 'be'].flatMap((p) => [`/${p}/`, `/${p}/devis/`, `/${p}/fonctionnement/`, ...LISTE_METIERS.map((m) => `/${p}/${m.slug}/`)]),
    ...LISTE_METIERS.flatMap((m) => [...REGIONS.map((r) => `/${pDe(r.pays)}/${m.slug}/${r.slug}/`), ...PUBLIEES.map((c) => `/${pDe(c.pays)}/${m.slug}/${c.slug}/`)])];
  const body = paths.map((p) => `<url><loc>${new URL(u(p), site).href}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
};
