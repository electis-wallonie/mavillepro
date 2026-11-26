// Textes des pages commune, construits à partir des données de chaque commune.
import type { Commune, Terroir } from '../data/communes';
import type { Metier } from '../data/metiers';

type MS = 'metallerie' | 'menuiserie' | 'vitrerie';
const nf = (n: number) => n.toLocaleString('fr-FR');
export const a = (nom: string) => (/^(Le|Les) /.test(nom) ? nom.replace(/^Le /, 'au ').replace(/^Les /, 'aux ') : `à ${nom}`);
export const de = (nom: string) => (/^Le /.test(nom) ? nom.replace(/^Le /, 'du ') : /^Les /.test(nom) ? nom.replace(/^Les /, 'des ') : /^[AEIOUYÉÈÊÀÂÎÔŒH]/i.test(nom) ? `d'${nom}` : `de ${nom}`);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// ---------- Habitat par secteur ----------
const HABITAT: Record<Terroir, string> = {
  metropole: "Dans la métropole orléanaise, on trouve à la fois des maisons de ville anciennes, des pavillons des années 1960 à 1990 et des lotissements récents, sans oublier les immeubles des centres-villes.",
  beauce: "En Beauce, l'habitat se partage entre corps de ferme, longères et pavillons construits autour des bourgs. Les terrains sont souvent grands et très exposés au vent de la plaine.",
  sologne: "En Sologne, les maisons en brique, à colombages ou en pierre côtoient les pavillons récents. Les terrains sont souvent boisés et l'humidité met les matériaux à rude épreuve.",
  val: "Dans le Val de Loire, le bâti ancien en tuffeau et pierre de taille domine les centres, entouré de pavillons plus récents. Une partie du secteur est inscrite au patrimoine mondial de l'UNESCO et certaines zones sont soumises au plan de prévention du risque d'inondation.",
  foret: "En lisière de la forêt d'Orléans, les maisons individuelles sur terrains arborés sont majoritaires, entre bourgs anciens et lotissements récents.",
  gatinais: "Dans le Pithiverais et le Gâtinais, les maisons en pierre calcaire et les anciennes fermes côtoient les pavillons des années 1970 à 2000.",
  dunois: "Dans le Dunois et la vallée du Loir, les maisons en pierre et les anciennes fermes cohabitent avec les quartiers pavillonnaires de Châteaudun et des bourgs voisins.",
  perche: "Aux portes du Perche vendômois, les longères en pierre et les fermes isolées dominent, avec quelques pavillons autour des bourgs.",
  charleroi: "Dans le pays de Charleroi, les maisons ouvrières mitoyennes en brique de l'ancien bassin industriel côtoient les maisons trois et quatre façades des quartiers plus récents.",
  centre: "Dans la région du Centre, autour de La Louvière et de Binche, les maisons mitoyennes en brique des anciennes cités ouvrières voisinent avec des villas plus récentes.",
  borinage: "Dans la région de Mons et du Borinage, l'habitat mêle maisons de rangée en brique, anciennes maisons de corons et constructions quatre façades en périphérie.",
  brabant: "En Brabant wallon, les villas quatre façades et les maisons récentes avec de grandes baies vitrées dominent, à côté des fermes et maisons anciennes des villages.",
  namur: "En province de Namur, on trouve beaucoup de maisons en pierre, de fermettes et de maisons quatre façades dans les villages, et des maisons de ville dans les centres.",
  sambre: "En Basse-Sambre, les maisons mitoyennes en brique des anciens villages industriels côtoient des quartiers plus récents de maisons trois et quatre façades.",
  esm: "Dans l'Entre-Sambre-et-Meuse, les maisons en pierre et les fermettes des villages dominent, avec des terrains souvent spacieux.",
  thudinie: "En Thudinie, les maisons anciennes en pierre et en brique des bords de Sambre côtoient des villas plus récentes sur les hauteurs.",
};
const FR_T: Terroir[] = ['metropole', 'beauce', 'sologne', 'val', 'foret', 'gatinais', 'dunois', 'perche'];
const groupe = (t: Terroir) =>
  t === 'metropole' ? 'urbain'
  : ['val', 'gatinais', 'dunois', 'perche', 'namur', 'esm', 'thudinie'].includes(t) ? 'ancien'
  : ['beauce', 'sologne', 'foret'].includes(t) ? 'rural'
  : t === 'brabant' ? 'villas' : 'mitoyen';

// ---------- Demandes les plus fréquentes, par métier et type d'habitat ----------
const DEMANDES: Record<MS, Record<string, { texte: string; top: string[] }>> = {
  metallerie: {
    urbain: { texte: "Les demandes portent surtout sur les portails et portes de garage de pavillon, les pergolas de terrasse et les garde-corps de balcon.", top: ['portail-battant', 'porte-garage-sectionnelle', 'pergola', 'cloture', 'portail-coulissant', 'garde-corps', 'carport', 'portillon'] },
    rural: { texte: "Les demandes portent surtout sur les portails de grande largeur, souvent coulissants et motorisés, les clôtures de terrain, les portes de garage et les carports.", top: ['portail-coulissant', 'portail-battant', 'cloture', 'porte-garage-sectionnelle', 'carport', 'pergola', 'grillage-rigide', 'motorisation-portail'] },
    ancien: { texte: "Les demandes portent souvent sur des portails et portillons assortis au bâti ancien, des clôtures, des portes de garage et des pergolas pour les cours et jardins.", top: ['portail-battant', 'portillon', 'cloture', 'porte-garage-sectionnelle', 'pergola', 'garde-corps', 'carport', 'ferronnerie-art'] },
    villas: { texte: "Les demandes portent surtout sur les portails coulissants motorisés, les portes de garage, les pergolas et les carports.", top: ['portail-coulissant', 'porte-garage-sectionnelle', 'pergola', 'carport', 'cloture', 'garde-corps', 'motorisation-portail', 'portillon'] },
    mitoyen: { texte: "Les demandes portent surtout sur les portes de garage, les pergolas et carports pour la cour ou le jardin, les clôtures et les portails d'allée.", top: ['porte-garage-sectionnelle', 'pergola', 'portail-battant', 'carport', 'cloture', 'garde-corps', 'portillon', 'grille-de-defense'] },
  },
  menuiserie: {
    urbain: { texte: "Les demandes portent surtout sur le remplacement des fenêtres, les volets roulants, les portes d'entrée et les baies vitrées.", top: ['fenetre', 'volet-roulant', 'porte-entree', 'baie-vitree', 'porte-garage-sectionnelle', 'porte-fenetre', 'veranda', 'fenetre-de-toit'] },
    rural: { texte: "Les demandes portent surtout sur des fenêtres et volets roulants bien isolés face au vent et au froid, et sur les portes de garage.", top: ['fenetre', 'volet-roulant', 'porte-garage-sectionnelle', 'porte-entree', 'baie-vitree', 'veranda', 'volets-battants', 'fenetre-de-toit'] },
    ancien: { texte: "Les demandes portent souvent sur des fenêtres en bois ou d'aspect bois, des volets assortis au cachet de la maison et des portes de garage.", top: ['fenetre', 'volet-roulant', 'volets-battants', 'porte-entree', 'porte-garage-sectionnelle', 'porte-fenetre', 'fenetre-de-toit', 'baie-vitree'] },
    villas: { texte: "Les demandes portent surtout sur de grandes baies vitrées, des châssis en aluminium, des volets roulants et des portes de garage sectionnelles.", top: ['baie-vitree', 'fenetre', 'porte-garage-sectionnelle', 'volet-roulant', 'veranda', 'porte-entree', 'porte-fenetre', 'fenetre-de-toit'] },
    mitoyen: { texte: "Les demandes portent surtout sur le remplacement des châssis en façade, les volets, les portes d'entrée et les portes de garage.", top: ['fenetre', 'volet-roulant', 'porte-entree', 'porte-garage-sectionnelle', 'baie-vitree', 'porte-fenetre', 'veranda', 'fenetre-de-toit'] },
  },
  vitrerie: {
    urbain: { texte: "Les demandes portent surtout sur le passage au double vitrage, les vitres cassées, les parois de douche et les vitrines de commerce.", top: ['double-vitrage', 'vitre-cassee', 'paroi-douche', 'vitrine', 'miroir', 'credence-verre', 'garde-corps-verre', 'porte-vitree'] },
    rural: { texte: "Les demandes portent surtout sur le remplacement du simple vitrage par du double vitrage, les vitres cassées et les parois de douche.", top: ['double-vitrage', 'vitre-cassee', 'paroi-douche', 'triple-vitrage', 'vitrage-securite', 'miroir', 'credence-verre', 'garde-corps-verre'] },
    ancien: { texte: "Les demandes portent souvent sur du double vitrage adapté aux menuiseries anciennes, en conservant les cadres d'origine quand ils sont sains.", top: ['double-vitrage', 'vitre-cassee', 'paroi-douche', 'vitrage-securite', 'miroir', 'porte-vitree', 'credence-verre', 'film-vitrage'] },
    villas: { texte: "Les demandes portent surtout sur les grandes surfaces vitrées, les parois de douche et les garde-corps en verre.", top: ['double-vitrage', 'paroi-douche', 'garde-corps-verre', 'vitre-cassee', 'triple-vitrage', 'credence-verre', 'miroir', 'cloison-vitree'] },
    mitoyen: { texte: "Les demandes portent surtout sur le remplacement du simple vitrage, les vitres cassées et le vitrage de sécurité.", top: ['double-vitrage', 'vitre-cassee', 'paroi-douche', 'vitrage-securite', 'vitrine', 'porte-vitree', 'miroir', 'film-vitrage'] },
  },
};

// ---------- Règles ----------
function regles(c: Commune, m: MS): string {
  if (c.pays === 'BE') {
    if (m === 'metallerie') return `En Wallonie, un portail, une clôture ou un garde-corps visibles depuis la rue peuvent relever du Code du développement territorial (CoDT). Avant les travaux, renseignez-vous auprès du service urbanisme de votre commune.`;
    if (m === 'menuiserie') return `En Wallonie, remplacer des châssis à l'identique ne demande en général pas de permis, mais un changement de matériau, de teinte ou de découpe en façade peut en demander un. Le service urbanisme de votre commune vous le confirme.`;
    return `Le remplacement d'un vitrage dans un châssis existant ne demande pas d'autorisation. Pour un garde-corps en verre ou une nouvelle ouverture, renseignez-vous auprès du service urbanisme de votre commune.`;
  }
  const mairie = `la mairie ${de(c.nom)}`;
  const abf = c.terroir === 'val' || c.taille === 'grande' || c.taille === 'ville' ? " Près d'un monument historique ou dans un secteur protégé, l'avis de l'Architecte des Bâtiments de France peut aussi être demandé." : '';
  if (m === 'metallerie') return `Un nouveau portail ou une clôture peuvent demander une déclaration préalable selon le plan local d'urbanisme. Renseignez-vous auprès de ${mairie} avant les travaux.${abf}`;
  if (m === 'menuiserie') return `Changer des fenêtres à l'identique ne demande pas d'autorisation, mais un changement de matériau, de couleur ou de forme visible depuis la rue demande en général une déclaration préalable auprès de ${mairie}.${abf}`;
  return `Le remplacement d'un vitrage dans une fenêtre existante ne demande pas d'autorisation. Pour une véranda, un garde-corps en verre ou une nouvelle ouverture, renseignez-vous auprès de ${mairie}.`;
}

// ---------- Assemblage ----------
const PROV_ART: Record<string, string> = { Hainaut: 'le Hainaut', Namur: 'la province de Namur', 'Brabant wallon': 'le Brabant wallon' };
const DEP_DE: Record<string, string> = { Loiret: 'du Loiret', 'Loir-et-Cher': 'de Loir-et-Cher', 'Eure-et-Loir': "d'Eure-et-Loir", Cher: 'du Cher', Essonne: "de l'Essonne" };
export const FOCUS: Record<MS, { fr: string; be: string; titre: string; titreBe: string; court: string; courtBe: string }> = {
  metallerie: { fr: 'portails, portes de garage et pergolas sur mesure', be: 'portails, portes de garage et pergolas sur mesure', titre: 'portail, porte de garage, pergola', titreBe: 'portail, porte de garage, pergola', court: 'portail, pergola', courtBe: 'portail, pergola' },
  menuiserie: { fr: 'fenêtres, volets roulants et portes de garage', be: 'châssis, volets et portes de garage', titre: 'fenêtres, volets, porte de garage', titreBe: 'châssis, volets, porte de garage', court: 'fenêtres, volets', courtBe: 'châssis, volets' },
  vitrerie: { fr: 'double vitrage, vitre cassée et parois de douche', be: 'double vitrage, vitre cassée et parois de douche', titre: 'double vitrage, vitre cassée', titreBe: 'double vitrage, vitre cassée', court: 'double vitrage', courtBe: 'double vitrage' },
};

export type PageCommune = {
  title: string; description: string; h1: string; intro: string;
  situation: string; voisinage: string; habitat: string; demandes: string; regles: string; main?: string;
  top: string[]; faits: [string, string][]; faq: [string, string][];
};

export function pageCommune(c: Commune, m: Metier): PageCommune {
  const ms = m.slug as MS;
  const be = c.pays === 'BE';
  const art = cap(m.artisan);
  const f = FOCUS[ms];
  const g = groupe(c.terroir);
  const d = DEMANDES[ms][g];
  const v3 = c.voisines.slice(0, 3).map((v) => v.nom);
  const surPole = c.km <= 1 && c.nom === c.pole;

  // Title : la variante la plus complète qui tient en 62 caractères (au-delà, Google coupe)
  const debut = `${art} ${a(c.nom)} (${c.cp})`;
  const title = [`${debut} : ${be ? f.titreBe : f.titre} – Devis gratuit`, `${debut} : ${be ? f.courtBe : f.court} – Devis gratuit`, `${debut} – Devis gratuit sous 24 h`, `${debut} – Devis gratuit`, debut]
    .find((t) => t.length <= 62) ?? debut;
  const description = [
    `${art} ${a(c.nom)} et alentour (${v3.slice(0, 2).join(', ')}) : ${be ? f.be : f.fr}. Rappel sous 24 h, devis gratuit et sans engagement.`,
    `${art} ${a(c.nom)} (${c.cp}) : ${be ? f.be : f.fr}. Rappel sous 24 h, devis gratuit et sans engagement.`,
    `${art} ${a(c.nom)} (${c.cp}) : ${be ? f.be : f.fr}. Rappel sous 24 h, devis gratuit.`,
  ].find((d) => d.length <= 158) ?? `${art} ${a(c.nom)} (${c.cp}). Rappel sous 24 h, devis gratuit.`;
  const h1 = `${art} ${a(c.nom)} (${c.cp}) : ${be ? f.be : f.fr}`;
  const intro = `Décrivez votre projet ${a(c.nom)} : un artisan ${m.artisan} qui intervient ${c.proche ? `dans le secteur ${de(c.proche.nom)}` : c.km <= 15 && !surPole && c.nom !== 'Orléans' ? `dans le secteur ${de(c.pole)}` : `${a(c.nom)} et alentour`} vous rappelle sous 24 h pour fixer un rendez-vous et vous remettre un devis gratuit.`;

  let situation: string;
  if (be) {
    situation = surPole
      ? `${c.nom} (${c.cp}) est le centre de notre zone d'intervention dans ${PROV_ART[c.region]}.`
      : `${c.nom} (${c.cp}) se trouve dans ${PROV_ART[c.region]}, à ${c.km} km ${c.dir} de ${c.pole}.`;
  } else {
    const hab = c.pop ? ` de ${nf(c.pop)} habitants` : '';
    const ep = c.epci ? ` Elle fait partie ${c.epci.startsWith('CC') ? 'de la communauté de communes ' + c.epci.slice(3) : c.epci.startsWith('CA') ? "de la communauté d'agglomération " + c.epci.slice(3) : de(c.epci)}.` : '';
    situation = c.nom === 'Orléans'
      ? `Orléans, préfecture du Loiret, compte ${nf(c.pop!)} habitants.${ep}`
      : `${c.nom} (${c.cp}) est une commune ${DEP_DE[c.region] ?? 'du ' + c.region}${hab}, située à ${c.km} km ${c.dir} d'Orléans${c.proche ? ` et à ${c.proche.km} km ${de(c.proche.nom)}` : ''}.${ep}`;
  }

  const faits: [string, string][] = [['Code postal', c.cp], [be ? 'Province' : 'Département', c.region]];
  if (c.pop) faits.push(['Population', `${nf(c.pop)} habitants`]);
  if (c.surface) faits.push(['Superficie', `${nf(c.surface)} km²`]);
  if (c.epci) faits.push(['Intercommunalité', c.epci]);
  if (!surPole && c.nom !== 'Orléans') faits.push([`Distance ${de(c.pole)}`, `${c.km} km`]);
  faits.push(['Communes voisines', c.voisines.slice(0, 3).map((v) => v.nom).join(', ')]);

  const voisTxt = c.voisines.slice(0, 5).map((v) => `${v.nom} (${String(v.km).replace('.', ',')} km)`).join(', ');
  const faq: [string, string][] = [
    [`Intervenez-vous ${a(c.nom)} et dans les communes voisines ?`, `Oui. Nos artisans ${m.artisans} interviennent ${a(c.nom)} et autour : ${voisTxt}.`],
    [be ? `Faut-il un permis pour ces travaux ${a(c.nom)} ?` : `Faut-il une autorisation pour ces travaux ${a(c.nom)} ?`, regles(c, ms)],
    [`Combien coûte un ${m.artisan} ${a(c.nom)} ?`, `Le prix dépend de l'ouvrage, des dimensions, des matériaux et de la pose. L'artisan se déplace ${a(c.nom)} pour mesurer, puis vous remet un devis écrit et gratuit.`],
  ];

  const vz = c.voisines.filter((v) => v.km >= 0.5).slice(0, 4);
  const voisinage = vz.length
    ? `Autour ${de(c.nom)}, les communes les plus proches sont ${vz.map((v, i) => `${i === vz.length - 1 && i > 0 ? 'et ' : ''}${v.nom} (${String(v.km).replace('.', ',')} km ${v.dir})`).join(', ').replace(/, et /, ' et ')}. Le même artisan peut intervenir sur l'ensemble de ce secteur.`
    : '';
  return {
    title, description, h1, intro, situation, voisinage,
    habitat: HABITAT[c.terroir],
    demandes: d.texte,
    regles: regles(c, ms),
    main: c.main?.[ms]?.local,
    top: d.top.filter((s) => m.prestations.some((p) => p.slug === s)),
    faits,
    faq: [...(c.main?.[ms]?.faq ?? []), ...faq],
  };
}

export const estFR = (t: Terroir) => FR_T.includes(t);
