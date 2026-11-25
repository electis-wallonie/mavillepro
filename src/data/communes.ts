// Fiches communes. Chaque page commune n'est publiée que si sa fiche existe ici.

export type TexteMetier = {
  h1: string;
  intro: string;
  title: string;
  description: string;
  local: string; // paragraphe propre à la commune
  groupes?: Record<string, string>; // complément local par groupe de prestations
  faq?: [string, string][];
};

export type Commune = {
  slug: string;
  nom: string;
  cp: string;
  pays: 'FR' | 'BE';
  region: string; // département ou province
  prep?: string; // « à », « au »…
  quartiers: string[];
  voisines: string[];
  metiers: Partial<Record<'metallerie' | 'menuiserie' | 'vitrerie', TexteMetier>>;
};

export const COMMUNES: Commune[] = [
  {
    slug: 'orleans',
    nom: 'Orléans',
    cp: '45000',
    pays: 'FR',
    region: 'Loiret',
    quartiers: ['Centre-ville', 'Bourgogne', 'Carmes', 'Dunois', 'Madeleine', 'Saint-Marceau', 'La Source', 'Argonne', 'Blossières', 'Gare'],
    voisines: ['Olivet', 'Saint-Jean-de-Braye', 'Fleury-les-Aubrais', 'Saran', 'Saint-Jean-de-la-Ruelle', 'Ingré', 'La Chapelle-Saint-Mesmin', 'Chécy'],
    metiers: {
      metallerie: {
        title: 'Métallier à Orléans (45000) – Devis gratuit, réponse sous 24 h',
        description:
          'Portail, garde-corps, escalier, verrière ou pergola sur mesure à Orléans : un artisan métallier du Loiret vous rappelle sous 24 h. Devis gratuit et sans engagement.',
        h1: 'Métallier à Orléans : portails, garde-corps et escaliers sur mesure',
        intro:
          "Besoin d'un portail, d'un garde-corps, d'un escalier ou d'une verrière à Orléans ? Décrivez votre projet : un artisan métallier du Loiret vous rappelle sous 24 h pour la prise de mesures et un devis gratuit.",
        local:
          "Orléans mêle maisons de ville du centre ancien, pavillons de Saint-Marceau et de la Source, et immeubles des quartiers Gare et Argonne. Les besoins changent d'un quartier à l'autre : garde-corps de balcon et grilles de défense dans le centre, portails et clôtures dans les quartiers pavillonnaires. Dans le secteur protégé du centre historique, un portail, une clôture ou une grille visibles depuis la rue peuvent demander une déclaration préalable et l'avis de l'Architecte des Bâtiments de France : l'artisan en tient compte dans son devis.",
        groupes: {
          portail: 'Très demandé pour les maisons de Saint-Marceau, de la Source et des communes voisines comme Olivet ou Saint-Jean-de-Braye.',
          'garde-corps': "Dans les immeubles du centre et des quartiers Gare et Dunois, les garde-corps de balcon sont souvent remplacés à l'identique, dans le respect de la façade.",
        },
        faq: [
          ['Faut-il une autorisation pour installer un portail ou une clôture à Orléans ?', "Une déclaration préalable de travaux peut être nécessaire selon le secteur, notamment dans le centre historique et près des monuments protégés. Renseignez-vous auprès du service urbanisme de la mairie ; l'artisan vous aide à préparer les éléments du dossier."],
          ['Intervenez-vous dans les communes autour d’Orléans ?', 'Oui : Olivet, Saint-Jean-de-Braye, Fleury-les-Aubrais, Saran, Ingré, Chécy, Saint-Denis-en-Val et toutes les communes de la métropole.'],
        ],
      },
    },
  },
];

export const ZONES = {
  FR: {
    nom: 'Région orléanaise',
    sous: 'Orléans et 50 km autour',
    villes: ['Orléans', 'Olivet', 'Saint-Jean-de-Braye', 'Fleury-les-Aubrais', 'Saran', 'Chécy', 'Meung-sur-Loire', 'Beaugency', 'Jargeau'],
  },
  BE: {
    nom: 'Hainaut et Brabant wallon',
    sous: 'Charleroi, Mons, La Louvière, jusqu’à Waterloo',
    villes: ['Charleroi', 'La Louvière', 'Mons', 'Waterloo', 'Nivelles', 'Courcelles', 'Fleurus', 'Binche', "Braine-l'Alleud"],
  },
};

export function pageCommune(metier: string, nom: string) {
  const c = COMMUNES.find((x) => x.nom === nom);
  return c && (c.metiers as Record<string, unknown>)[metier] ? `/${metier}/${c.slug}/` : null;
}
