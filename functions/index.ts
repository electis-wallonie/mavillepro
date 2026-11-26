// Racine : envoie chaque visiteur vers le site de son pays (Belgique -> /be/, sinon /fr/)
export const onRequestGet: PagesFunction = async ({ request }) => {
  const pays = (request as Request & { cf?: { country?: string } }).cf?.country;
  const cible = pays === 'BE' ? '/be/' : '/fr/';
  return new Response(null, { status: 302, headers: { Location: new URL(cible + new URL(request.url).search, request.url).href, 'Cache-Control': 'no-store', Vary: 'CF-IPCountry' } });
};
