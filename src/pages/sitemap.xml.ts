import type { APIRoute } from 'astro';
import { LISTE_METIERS } from '../data/metiers';
import { PUBLIEES, REGIONS } from '../data/communes';
import { u } from '../lib/site';
export const GET: APIRoute = ({ site }) => {
  const paths = ['/', '/devis/', '/fonctionnement/', ...LISTE_METIERS.flatMap((m) => [
    `/${m.slug}/`, ...REGIONS.map((r) => `/${m.slug}/${r.slug}/`), ...PUBLIEES.map((c) => `/${m.slug}/${c.slug}/`),
  ])];
  const body = paths.map((p) => `<url><loc>${new URL(u(p), site).href}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
};
