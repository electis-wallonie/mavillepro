// Base des communes des deux zones, calculée à partir des données officielles
// (France : geo.api.gouv.fr ; Belgique : localités et codes postaux bpost géocodés).
import fr from './zone-fr.json';
import be from './zone-be.json';

export type Pays = 'FR' | 'BE';
export type Voisine = { nom: string; slug: string; km: number; dir: string };
export type Commune = {
  slug: string;
  nom: string;
  cp: string;
  pays: Pays;
  region: string; // département ou province
  regionSlug: string;
  pop?: number;
  surface?: number; // km²
  epci?: string;
  lat: number;
  lon: number;
  pole: string; // grande ville de référence
  km: number; // distance au pôle
  dir: string; // direction depuis le pôle
  proche?: { nom: string; km: number }; // ville de plus de 5 000 habitants la plus proche (FR)
  terroir: Terroir;
  taille: 'village' | 'bourg' | 'ville' | 'grande';
  voisines: Voisine[];
  vague: number;
  main?: Partial<Record<'metallerie' | 'menuiserie' | 'vitrerie', TexteMain>>;
  quartiers?: string[];
};
export type TexteMain = { local: string; faq?: [string, string][] };
export type Terroir =
  | 'metropole' | 'beauce' | 'sologne' | 'val' | 'foret' | 'gatinais' | 'dunois' | 'perche'
  | 'charleroi' | 'centre' | 'borinage' | 'brabant' | 'namur' | 'sambre' | 'esm' | 'thudinie';

export const slugify = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/['’]/g, '-').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const R = (d: number) => (d * Math.PI) / 180;
export const km = (a: [number, number], b: [number, number]) => {
  const h = Math.sin(R(b[0] - a[0]) / 2) ** 2 + Math.cos(R(a[0])) * Math.cos(R(b[0])) * Math.sin(R(b[1] - a[1]) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
};
const direction = (from: [number, number], to: [number, number]) => {
  const y = Math.sin(R(to[1] - from[1])) * Math.cos(R(to[0]));
  const x = Math.cos(R(from[0])) * Math.sin(R(to[0])) - Math.sin(R(from[0])) * Math.cos(R(to[0])) * Math.cos(R(to[1] - from[1]));
  const b = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  return ['au nord', 'au nord-est', "à l'est", 'au sud-est', 'au sud', 'au sud-ouest', "à l'ouest", 'au nord-ouest'][Math.round(b / 45) % 8];
};

export const DEPS: Record<string, { nom: string; slug: string; art: string }> = {
  '45': { nom: 'Loiret', slug: 'loiret', art: 'le Loiret' },
  '41': { nom: 'Loir-et-Cher', slug: 'loir-et-cher', art: 'le Loir-et-Cher' },
  '28': { nom: 'Eure-et-Loir', slug: 'eure-et-loir', art: "l'Eure-et-Loir" },
  '18': { nom: 'Cher', slug: 'cher', art: 'le Cher' },
  '91': { nom: 'Essonne', slug: 'essonne', art: "l'Essonne" },
};
export const PROVS: Record<string, { nom: string; slug: string; art: string }> = {
  HA: { nom: 'Hainaut', slug: 'hainaut', art: 'le Hainaut' },
  NA: { nom: 'Namur', slug: 'province-de-namur', art: 'la province de Namur' },
  BW: { nom: 'Brabant wallon', slug: 'brabant-wallon', art: 'le Brabant wallon' },
};

// Le cours de la Loire, pour repérer les communes du Val de Loire
const LOIRE: [number, number][] = [[47.62, 1.33], [47.65, 1.42], [47.70, 1.50], [47.76, 1.62], [47.84, 1.69], [47.88, 1.82], [47.90, 1.91], [47.88, 2.00], [47.85, 2.10], [47.86, 2.20], [47.86, 2.27], [47.81, 2.31], [47.76, 2.36], [47.75, 2.45], [47.72, 2.55]];
const presLoire = (p: [number, number]) => Math.min(...LOIRE.map((l) => km(p, l))) < 4.5;

function terroirFR(dep: string, epci: string, p: [number, number]): Terroir {
  const [lat, lon] = p;
  if (epci === '244500468') return 'metropole';
  if (presLoire(p)) return 'val';
  if (dep === '18') return 'sologne';
  if (dep === '91') return 'beauce';
  if (dep === '28') return lon < 1.5 ? 'dunois' : 'beauce';
  if (dep === '41') return lat < 47.68 && lon > 1.55 ? 'sologne' : lon < 1.33 && lat > 47.85 ? 'perche' : 'beauce';
  if (lat < 47.82) return 'sologne';
  if (lon > 2.33 && lat > 47.88) return 'gatinais';
  if (lat > 48.06 && lon > 2.13) return 'gatinais';
  if (lon > 1.95 && lon <= 2.45 && lat > 47.9 && lat <= 48.06) return 'foret';
  return 'beauce';
}

// Pôles belges : la ville de référence la plus proche donne le secteur
const POLES_BE: { nom: string; p: [number, number]; t: Terroir }[] = [
  { nom: 'Charleroi', p: [50.4108, 4.4446], t: 'charleroi' },
  { nom: 'La Louvière', p: [50.4797, 4.1873], t: 'centre' },
  { nom: 'Binche', p: [50.4103, 4.1655], t: 'centre' },
  { nom: 'Mons', p: [50.4542, 3.9523], t: 'borinage' },
  { nom: 'Soignies', p: [50.579, 4.0712], t: 'centre' },
  { nom: 'Nivelles', p: [50.598, 4.3285], t: 'brabant' },
  { nom: 'Waterloo', p: [50.7146, 4.3991], t: 'brabant' },
  { nom: 'Wavre', p: [50.7171, 4.6014], t: 'brabant' },
  { nom: 'Gembloux', p: [50.5614, 4.6989], t: 'namur' },
  { nom: 'Namur', p: [50.4669, 4.8675], t: 'namur' },
  { nom: 'Sambreville', p: [50.4373, 4.6224], t: 'sambre' },
  { nom: 'Philippeville', p: [50.1957, 4.5432], t: 'esm' },
  { nom: 'Thuin', p: [50.3397, 4.2865], t: 'thudinie' },
];

// Vague 1 en Belgique : communes et sections principales
const VAGUE1_BE: Record<string, string> = Object.fromEntries(
  ("Charleroi|Marcinelle|Gosselies|Jumet|Gilly|Montignies-sur-Sambre|Couillet|Marchienne-au-Pont|Mont-sur-Marchienne|Monceau-sur-Sambre|Ransart|Roux|Lodelinsart|Dampremy|La Louvière|Mons|Jemappes|Cuesmes|Waterloo|Nivelles|Courcelles|Fleurus|Châtelet|Châtelineau|Binche|Braine-l'Alleud|Braine-le-Comte|Soignies|Manage|Seneffe|Fontaine-l'Évêque|Montigny-le-Tilleul|Morlanwelz|Genappe|Frameries|Saint-Ghislain|Namur|Jambes|Gembloux|Auvelais|Farciennes|Aiseau|Gerpinnes|Walcourt|Thuin|Anderlues|Chapelle-lez-Herlaimont|Ottignies|Wavre|Tubize|Quaregnon|Boussu|Ham-sur-Heure|Pont-à-Celles|Sombreffe|Écaussinnes-d'Enghien|Le Rœulx|Haine-Saint-Pierre|Houdeng-Goegnies|Trazegnies|Fontaine-Valmont|Jemeppe-sur-Sambre|Floreffe|Rixensart|Court-Saint-Étienne|Lobbes|Beaumont")
    .split('|')
    .map((n) => [slugify(n.replace('œ', 'oe')), n]),
);

// Mise en forme des noms belges de la source (« Ecaussinnes-D'enghien » → « Ecaussinnes-d'Enghien »)
const joli = (s: string) =>
  s.replace(/\b(D|L)'(\w)/g, (_, a, b) => `${a.toLowerCase()}'${b.toUpperCase()}`)
    .replace(/-(Sur|Lez|Les|La|Le|Au|Aux|De|Du|Des|En|Sous|Lès)-/g, (m) => m.toLowerCase())
    .replace(/-(Sur|Lez|Les|La|Le|Au|Aux|De|Du|Des|En|Sous|Lès)-/g, (m) => m.toLowerCase());

const VAGUE_MAX = Number(process.env.VAGUE ?? 1);

function construire(): Commune[] {
  const ORL: [number, number] = [47.9025, 1.909];
  const ep = fr.ep as Record<string, string>;
  const frc = (fr.c as [string, string, string, string, number, number, number, number, string][]).map(([, nom, cp, dep, pop, lat, lon, surface, e]) => {
    const p: [number, number] = [lat, lon];
    const d = km(ORL, p);
    const taille = pop >= 20000 ? 'grande' : pop >= 5000 ? 'ville' : pop >= 2000 ? 'bourg' : 'village';
    return {
      slug: `${slugify(nom)}-${cp}`, nom, cp, pays: 'FR' as Pays, region: DEPS[dep].nom, regionSlug: DEPS[dep].slug,
      pop, surface, epci: ep[e], lat, lon, pole: 'Orléans', km: Math.round(d), dir: direction(ORL, p),
      terroir: terroirFR(dep, e, p), taille: taille as Commune['taille'], voisines: [], vague: pop >= 1000 ? 1 : pop >= 500 ? 2 : 3,
    } satisfies Commune;
  });
  for (const c of frc) {
    const villes = frc.filter((x) => x !== c && (x.pop ?? 0) >= 5000).map((x) => ({ nom: x.nom, km: Math.round(km([c.lat, c.lon], [x.lat, x.lon])) })).sort((a, b) => a.km - b.km);
    const big = frc.filter((x) => x !== c && (x.pop ?? 0) >= 5000 && (x.pop ?? 0) > (c.pop ?? 0)).map((x) => ({ nom: x.nom, km: Math.round(km([c.lat, c.lon], [x.lat, x.lon])) })).sort((a, b) => a.km - b.km);
    if (big[0] && big[0].nom !== 'Orléans' && big[0].km < c.km && big[0].km <= 15) (c as Commune).proche = big[0];
  }

  const vus = new Set<string>();
  const bec = (be as [string, string, string, number, number][]).flatMap(([nomBrut, cp, prov, lat, lon]) => {
    const p: [number, number] = [lat, lon];
    const s = slugify(nomBrut);
    const nom = VAGUE1_BE[s] ?? joli(nomBrut);
    const slug = `${s}-${cp}`;
    if (vus.has(slug)) return [];
    vus.add(slug);
    const pole = POLES_BE.map((x) => ({ ...x, d: km(x.p, p) })).sort((a, b) => a.d - b.d)[0];
    const cl = POLES_BE[0];
    const estPole = pole.d < 1.5;
    const w1 = s in VAGUE1_BE;
    const ref = estPole && pole.nom !== 'Charleroi' ? cl : pole;
    const d = km(ref.p, p);
    return [{
      slug, nom, cp, pays: 'BE' as Pays, region: PROVS[prov].nom, regionSlug: PROVS[prov].slug, lat, lon,
      pole: ref.nom, km: Math.round(d), dir: direction(ref.p, p), terroir: pole.t,
      taille: (w1 ? 'ville' : 'village') as Commune['taille'], voisines: [], vague: w1 ? 1 : km(cl.p, p) < 35 ? 2 : 3,
    } satisfies Commune];
  });

  const toutes = [...frc, ...bec] as Commune[];
  for (const c of toutes) {
    c.voisines = toutes
      .filter((x) => x !== c && x.pays === c.pays)
      .map((x) => ({ nom: x.nom, slug: x.slug, km: Math.round(km([c.lat, c.lon], [x.lat, x.lon]) * 10) / 10, dir: direction([c.lat, c.lon], [x.lat, x.lon]) }))
      .sort((a, b) => a.km - b.km)
      .slice(0, 8);
  }
  return toutes;
}

export const TOUTES = construire();

// Textes écrits à la main pour certaines communes
const orleans = TOUTES.find((c) => c.slug === 'orleans-45000')!;
orleans.quartiers = ['Centre-ville', 'Bourgogne', 'Carmes', 'Dunois', 'Madeleine', 'Saint-Marceau', 'La Source', 'Argonne', 'Blossières', 'Gare'];
orleans.main = {
  metallerie: {
    local:
      "Orléans mêle maisons de ville du centre ancien, pavillons de Saint-Marceau et de la Source, et immeubles des quartiers Gare et Argonne. Les besoins changent d'un quartier à l'autre : garde-corps de balcon et grilles de défense dans le centre, portails et clôtures dans les quartiers pavillonnaires. Dans le secteur protégé du centre historique, un portail, une clôture ou une grille visibles depuis la rue peuvent demander une déclaration préalable et l'avis de l'Architecte des Bâtiments de France.",
    faq: [["Faut-il une autorisation pour installer un portail ou une clôture à Orléans ?", "Une déclaration préalable de travaux peut être nécessaire selon le secteur, notamment dans le centre historique et près des monuments protégés. Renseignez-vous auprès du service urbanisme de la mairie ; l'artisan vous aide à préparer les éléments du dossier."]],
  },
};

export const PUBLIEES = TOUTES.filter((c) => c.vague <= VAGUE_MAX);
const publiees = new Set(PUBLIEES.map((c) => c.slug));
export const estPubliee = (slug: string) => publiees.has(slug);

export const REGIONS = [
  ...Object.values(DEPS).map((d) => ({ ...d, pays: 'FR' as Pays })),
  ...Object.values(PROVS).map((p) => ({ ...p, pays: 'BE' as Pays })),
].filter((r) => PUBLIEES.some((c) => c.regionSlug === r.slug));

export const ZONES = {
  FR: { nom: 'Région orléanaise', sous: "Orléans et 50 km autour : Loiret, Loir-et-Cher, Eure-et-Loir", regions: REGIONS.filter((r) => r.pays === 'FR') },
  BE: { nom: 'Wallonie', sous: "Charleroi, Mons, La Louvière, jusqu'à Waterloo et Namur", regions: REGIONS.filter((r) => r.pays === 'BE') },
};

export const VILLES_PHARES = {
  FR: ['orleans-45000', 'olivet-45160', 'saint-jean-de-braye-45800', 'fleury-les-aubrais-45400', 'saran-45770', 'checy-45430', 'meung-sur-loire-45130', 'beaugency-45190', 'pithiviers-45300', 'chateaudun-28200'],
  BE: ['charleroi-6000', 'la-louviere-7100', 'mons-7000', 'waterloo-1410', 'nivelles-1400', 'namur-5000', 'gosselies-6041', 'fleurus-6220', 'binche-7130', 'wavre-1300'],
};
export const parSlug = (s: string) => TOUTES.find((c) => c.slug === s);
