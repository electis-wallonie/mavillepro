import type { APIRoute } from 'astro';
import { PREVIEW, u } from '../lib/site';
export const GET: APIRoute = ({ site }) =>
  new Response(
    PREVIEW
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nDisallow: /merci/\n\nSitemap: ${new URL(u('/sitemap.xml'), site).href}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
