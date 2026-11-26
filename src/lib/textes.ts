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
    urbain: { texte: "Les demandes portent surtout sur les portails et portillons de pavillon, les garde-corps de balcon et de terrasse, et les verrières d'intérieur.", top: ['portail-battant', 'garde-corps', 'verriere-atelier', 'portail-coulissant', 'grille-de-defense', 'escalier-helicoidal', 'cloture', 'pergola'] },
    rural: { texte: "Les demandes portent surtout sur les portails de grande largeur, souvent motorisés, les clôtures de terrain, les carports et les abris en métal.", top: ['portail-coulissant', 'portail-battant', 'cloture', 'grillage-rigide', 'carport', 'motorisation-portail', 'pergola', 'garde-corps'] },
    ancien: { texte: "Les demandes portent souvent sur des portails et grilles assortis au bâti ancien, des rampes et garde-corps en ferronnerie, et des escaliers sur mesure.", top: ['portail-battant', 'ferronnerie-art', 'garde-corps', 'rampe-main-courante', 'escalier-droit', 'grille-de-defense', 'portillon', 'marquise-auvent'] },
    villas: { texte: "Les demandes portent surtout sur les portails coulissants motorisés, les garde-corps de terrasse et les pergolas.", top: ['portail-coulissant', 'motorisation-portail', 'garde-corps', 'pergola', 'cloture', 'escalier-exterieur', 'carport', 'verriere-atelier'] },
    mitoyen: { texte: "Les demandes portent surtout sur les grilles de défense et portes sécurisées, les garde-corps, et les portails de cour ou d'allée.", top: ['grille-de-defense', 'porte-blindee', 'garde-corps', 'portail-battant', 'rampe-main-courante', 'escalier-helicoidal', 'verriere-atelier', 'rideau-metallique'] },
  },
  menuiserie: {
    urbain: { texte: "Les demandes portent surtout sur le remplacement des fenêtres, les baies vitrées et les portes d'entrée isolantes.", top: ['fenetre', 'baie-vitree', 'porte-entree', 'volet-roulant', 'porte-fenetre', 'porte-interieure', 'porte-garage-sectionnelle', 'placard-dressing'] },
    rural: { texte: "Les demandes portent surtout sur des fenêtres et volets roulants bien isolés face au vent et au froid, et sur les portes de garage.", top: ['fenetre', 'volet-roulant', 'porte-garage-sectionnelle', 'porte-entree', 'baie-vitree', 'volets-battants', 'fenetre-de-toit', 'veranda'] },
    ancien: { texte: "Les demandes portent souvent sur des fenêtres en bois ou d'aspect bois et des volets battants assortis au cachet de la maison.", top: ['fenetre', 'volets-battants', 'porte-entree', 'porte-fenetre', 'fenetre-de-toit', 'escalier-bois', 'porte-interieure', 'volet-roulant'] },
    villas: { texte: "Les demandes portent surtout sur de grandes baies vitrées, des châssis en aluminium et des portes de garage sectionnelles.", top: ['baie-vitree', 'fenetre', 'porte-garage-sectionnelle', 'porte-entree', 'veranda', 'volet-roulant', 'porte-fenetre', 'placard-dressing'] },
    mitoyen: { texte: "Les demandes portent surtout sur le remplacement de châssis en façade, les portes d'entrée et les volets roulants.", top: ['fenetre', 'porte-entree', 'volet-roulant', 'porte-fenetre', 'porte-interieure', 'baie-vitree', 'porte-garage-sectionnelle', 'fenetre-de-toit'] },
  },
  vitrerie: {
    urbain: { texte: "Les demandes portent surtout sur les vitres cassées, le passage au double vitrage, les vitrines de commerce et les parois de douche.", top: ['vitre-cassee', 'double-vitrage', 'vitrine', 'paroi-douche', 'miroir', 'credence-verre', 'porte-vitree', 'film-vitrage'] },
    rural: { texte: "Les demandes portent surtout sur le remplacement de simple vitrage par du double vitrage et sur les vitres cassées.", top: ['double-vitrage', 'vitre-cassee', 'triple-vitrage', 'vitrage-securite', 'miroir', 'paroi-douche', 'garde-corps-verre', 'credence-verre'] },
    ancien: { texte: "Les demandes portent souvent sur des vitrages adaptés aux menuiseries anciennes, en conservant les cadres d'origine quand ils sont sains.", top: ['double-vitrage', 'vitre-cassee', 'vitrage-securite', 'miroir', 'porte-vitree', 'paroi-douche', 'credence-verre', 'film-vitrage'] },
    villas: { texte: "Les demandes portent surtout sur les grandes surfaces vitrées, les garde-corps en verre et les parois de douche.", top: ['double-vitrage', 'garde-corps-verre', 'paroi-douche', 'vitre-cassee', 'triple-vitrage', 'credence-verre', 'miroir', 'cloison-vitree'] },
    mitoyen: { texte: "Les demandes portent surtout sur les vitres cassées, le vitrage de sécurité et le remplacement du simple vitrage.", top: ['vitre-cassee', 'double-vitrage', 'vitrage-securite', 'vitrine', 'porte-vitree', 'paroi-douche', 'miroir', 'film-vitrage'] },
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
export const FOCUS: Record<MS, { fr: string; be: string; titre: string; titreBe: string }> = {
  metallerie: { fr: 'portails, garde-corps et escaliers sur mesure', be: 'portails, garde-corps et escaliers sur mesure', titre: 'portail, garde-corps, escalier', titreBe: 'portail, garde-corps, escalier' },
  menuiserie: { fr: 'fenêtres, portes et volets sur mesure', be: 'châssis, portes et volets sur mesure', titre: 'fenêtres, portes, volets', titreBe: 'châssis, portes, volets' },
  vitrerie: { fr: 'vitre cassée, double vitrage et miroirs', be: 'vitre cassée, double vitrage et miroirs', titre: 'vitre cassée, double vitrage', titreBe: 'vitre cassée, double vitrage' },
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

  const title = `${art} ${a(c.nom)} (${c.cp}) : ${be ? f.titreBe : f.titre} – Devis gratuit`;
  const description = `${art} ${a(c.nom)} et alentour (${v3.slice(0, 2).join(', ')}) : ${be ? f.be : f.fr}. Un artisan vous rappelle sous 24 h, devis gratuit et sans engagement.`;
  const h1 = `${art} ${a(c.nom)} (${c.cp}) : ${be ? f.be : f.fr}`;
  const intro = `Décrivez votre projet ${a(c.nom)} : un artisan ${m.artisan} qui intervient ${c.proche ? `dans le secteur ${de(c.proche.nom)}` : c.km <= 15 && !surPole && c.nom !== 'Orléans' ? `dans le secteur ${de(c.pole)}` : `${a(c.nom)} et alentour`} vous rappelle sous 24 h pour fixer un rendez-vous et vous remettre un devis gratuit.`;

  let situation: string;
  if (be) {
    situation = surPole
      ? `${c.nom} (${c.cp}) est le centre de notre zone d'intervention dans ${PROV_ART[c.region]}.`
      : `${c.nom} (${c.cp}) se trouve dans ${PROV_ART[c.region]}, à ${c.km} km ${c.dir} de ${c.pole}.`;
  } else {
    const hab = c.pop ? ` de ${nf(c.pop)} habitants` : '';
    const ep = c.epci ? ` Elle fait partie de ${c.epci.startsWith('CC') ? 'la communauté de communes ' + c.epci.slice(3) : c.epci.startsWith('CA') ? "la communauté d'agglomération " + c.epci.slice(3) : c.epci}.` : '';
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
