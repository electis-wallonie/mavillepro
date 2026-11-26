// Métiers, prestations et textes types. « {ville} » est remplacé par « à Orléans », « à Chécy »…

export type Prestation = { slug: string; label: string };
export type Groupe = { key: string; titre: string; items: string[]; texte: string; cta: string };
export type Metier = {
  slug: 'metallerie' | 'menuiserie' | 'vitrerie';
  nom: string;
  artisan: string;
  artisans: string;
  icone: string;
  accroche: string;
  h1: string;
  intro: string;
  tuiles: string[];
  prestations: Prestation[];
  groupes: Groupe[];
  faq: [string, string][];
};

const P = (slug: string, label: string): Prestation => ({ slug, label });

export const METIERS: Record<string, Metier> = {
  metallerie: {
    slug: 'metallerie',
    nom: 'Métallerie',
    artisan: 'métallier',
    artisans: 'métalliers',
    icone: 'metal',
    accroche: 'Portails, portes de garage, pergolas, clôtures, carports et garde-corps sur mesure.',
    h1: 'Métallier : portails, portes de garage et pergolas sur mesure',
    intro:
      "Portail, porte de garage, pergola, clôture ou carport : décrivez votre projet, un artisan métallier de votre secteur vous rappelle sous 24 h pour la prise de mesures et un devis gratuit.",
    tuiles: ['portail-battant', 'porte-garage-sectionnelle', 'pergola', 'cloture', 'carport', 'garde-corps', 'portillon', 'autre'],
    prestations: [
      P('portail-battant', 'Portail battant'),
      P('portail-coulissant', 'Portail coulissant'),
      P('portillon', 'Portillon'),
      P('motorisation-portail', 'Motorisation de portail'),
      P('porte-garage-sectionnelle', 'Porte de garage'),
      P('cloture', 'Clôture'),
      P('grillage-rigide', 'Grillage rigide'),
      P('garde-corps', 'Garde-corps'),
      P('rampe-main-courante', 'Rampe et main courante'),
      P('escalier-droit', 'Escalier droit'),
      P('escalier-helicoidal', 'Escalier hélicoïdal'),
      P('escalier-exterieur', 'Escalier extérieur'),
      P('mezzanine', 'Mezzanine'),
      P('passerelle', 'Passerelle'),
      P('verriere-atelier', "Verrière d'atelier"),
      P('cloison-metallique', 'Cloison métallique'),
      P('pergola', 'Pergola'),
      P('marquise-auvent', 'Marquise et auvent'),
      P('carport', 'Carport'),
      P('abri-velos', 'Abri vélos'),
      P('abri-poubelles', 'Abri poubelles'),
      P('grille-de-defense', 'Grille de défense'),
      P('porte-blindee', 'Porte blindée'),
      P('rideau-metallique', 'Rideau métallique'),
      P('grille-extensible', 'Grille extensible'),
      P('etageres-metal', 'Étagères en métal'),
      P('charpente-metallique', 'Charpente métallique'),
      P('ferronnerie-art', "Ferronnerie d'art"),
      P('soudure-reparation', 'Soudure et réparation'),
    ],
    groupes: [
      { key: 'portail', titre: 'Portail et portillon sur mesure {ville}', items: ['portail-battant', 'portail-coulissant', 'portillon', 'grillage-rigide'], cta: 'Devis portail gratuit',
        texte: "Portail battant ou coulissant, plein ou ajouré, en acier ou en aluminium : votre métallier fabrique un portail aux dimensions exactes de votre entrée, assorti au portillon. La motorisation peut être prévue dès la fabrication ou ajoutée ensuite." },
      { key: 'pergola', titre: 'Pergola et carport {ville}', items: ['pergola', 'carport', 'marquise-auvent', 'abri-velos'], cta: 'Devis pergola gratuit',
        texte: "Pergola pour profiter de la terrasse, carport pour abriter la voiture, marquise au-dessus de la porte d'entrée ou abri vélos : des structures métalliques durables, fabriquées aux bonnes dimensions." },
      { key: 'garage', titre: 'Porte de garage {ville}', items: ['porte-garage-sectionnelle', 'motorisation-portail'], cta: 'Devis porte de garage gratuit',
        texte: "Porte de garage sectionnelle, basculante ou enroulable, motorisée ou non : l'artisan remplace votre ancienne porte ou équipe un nouveau garage, et peut motoriser le portail en même temps." },
      { key: 'cloture', titre: 'Clôture et grillage rigide {ville}', items: ['cloture', 'grillage-rigide'], cta: 'Devis clôture gratuit',
        texte: "Clôture à lames pour préserver votre intimité ou grillage rigide pour délimiter votre terrain : l'artisan pose des panneaux robustes, adaptés à la longueur et au dénivelé de votre jardin." },
      { key: 'garde-corps', titre: 'Garde-corps et rampes {ville}', items: ['garde-corps', 'rampe-main-courante'], cta: 'Devis garde-corps gratuit',
        texte: "Terrasse, balcon, mezzanine ou escalier : un garde-corps sur mesure en barreaudage, en verre ou en câbles, et des mains courantes intérieures ou extérieures, posés selon les normes en vigueur." },
      { key: 'escalier', titre: 'Escalier métallique {ville}', items: ['escalier-droit', 'escalier-helicoidal', 'escalier-exterieur', 'mezzanine'], cta: 'Devis escalier gratuit',
        texte: "Escalier droit, quart tournant ou hélicoïdal, intérieur ou extérieur : l'artisan conçoit un escalier métallique adapté à la place disponible, avec ses garde-corps." },
      { key: 'verriere', titre: "Verrière d'atelier {ville}", items: ['verriere-atelier', 'cloison-metallique'], cta: 'Devis verrière gratuit',
        texte: "Une verrière style atelier pour séparer cuisine et séjour sans perdre la lumière : cadre métallique fin, vitrage de sécurité et porte vitrée en option." },
      { key: 'securite', titre: 'Grilles de défense, portes blindées et rideaux métalliques {ville}', items: ['grille-de-defense', 'porte-blindee', 'rideau-metallique', 'grille-extensible'], cta: 'Devis sécurité gratuit',
        texte: "Sécurisez votre maison ou votre commerce : grilles de défense pour fenêtres et soupiraux, portes blindées, rideaux métalliques et grilles extensibles pour les vitrines." },
    ],
    faq: [
      ['Acier, inox ou aluminium : quel matériau choisir ?', "L'acier est robuste et économique, l'inox résiste à l'humidité, l'aluminium est léger et ne demande presque pas d'entretien. L'artisan vous conseille selon l'usage et l'exposition."],
      ['Le métallier se déplace-t-il pour prendre les mesures ?', "Oui. Après votre demande, l'artisan vous rappelle et convient avec vous d'un rendez-vous pour mesurer et voir le support avant d'établir le devis."],
      ['Puis-je demander une réparation ou une petite soudure ?', 'Oui. Choisissez « Autre projet » dans le formulaire et décrivez la réparation dans le message.'],
    ],
  },

  menuiserie: {
    slug: 'menuiserie',
    nom: 'Menuiserie',
    artisan: 'menuisier',
    artisans: 'menuisiers',
    icone: 'fenetre',
    accroche: "Fenêtres et châssis, volets roulants, portes de garage, portes d'entrée, baies vitrées et vérandas.",
    h1: 'Menuisier : fenêtres, volets roulants et portes de garage',
    intro:
      "Fenêtres ou châssis, volets roulants, porte de garage, porte d'entrée ou baie vitrée : décrivez votre projet, un artisan menuisier de votre secteur vous rappelle sous 24 h pour un devis gratuit.",
    tuiles: ['fenetre', 'volet-roulant', 'porte-garage-sectionnelle', 'porte-entree', 'baie-vitree', 'veranda', 'porte-fenetre', 'autre'],
    prestations: [
      P('fenetre', 'Fenêtre'),
      P('porte-fenetre', 'Porte-fenêtre'),
      P('baie-vitree', 'Baie vitrée'),
      P('porte-entree', "Porte d'entrée"),
      P('porte-interieure', 'Porte intérieure'),
      P('porte-garage-sectionnelle', 'Porte de garage'),
      P('volet-roulant', 'Volet roulant'),
      P('volets-battants', 'Volets battants'),
      P('fenetre-de-toit', 'Fenêtre de toit'),
      P('veranda', 'Véranda'),
      P('placard-dressing', 'Placard et dressing'),
      P('escalier-bois', 'Escalier en bois'),
    ],
    groupes: [
      { key: 'fenetres', titre: 'Fenêtres, châssis et portes-fenêtres {ville}', items: ['fenetre', 'porte-fenetre', 'fenetre-de-toit'], cta: 'Devis fenêtres gratuit',
        texte: "PVC, aluminium ou bois, double ou triple vitrage : le menuisier remplace vos fenêtres en rénovation ou en dépose totale, aux dimensions exactes de vos ouvertures." },
      { key: 'volets', titre: 'Volets roulants et battants {ville}', items: ['volet-roulant', 'volets-battants'], cta: 'Devis volets gratuit',
        texte: "Volets roulants électriques ou solaires, volets battants en bois, en aluminium ou en PVC : l'artisan remplace ou motorise vos volets existants." },
      { key: 'garage', titre: 'Porte de garage {ville}', items: ['porte-garage-sectionnelle', 'porte-entree'], cta: 'Devis porte de garage gratuit',
        texte: "Porte de garage sectionnelle, basculante ou latérale, motorisée ou non, et porte d'entrée isolante et sécurisée assortie : une pose soignée par un menuisier de votre secteur." },
      { key: 'baie', titre: 'Baie vitrée et véranda {ville}', items: ['baie-vitree', 'veranda', 'porte-interieure', 'placard-dressing'], cta: 'Devis baie vitrée gratuit',
        texte: "Baie coulissante ou à galandage, véranda pour gagner une pièce à vivre : plus de lumière, une bonne isolation et une pose soignée." },
    ],
    faq: [
      ['PVC, aluminium ou bois : quel matériau choisir ?', "Le PVC est le plus économique et isole bien, l'aluminium permet des profils fins et de grandes surfaces vitrées, le bois offre le meilleur cachet. L'artisan vous conseille selon votre maison."],
      ['Peut-on remplacer des fenêtres sans gros travaux ?', 'Oui, la pose en rénovation conserve le dormant existant quand il est sain. Le menuisier vérifie ce point lors de la visite.'],
      ['Existe-t-il des aides pour changer ses fenêtres ?', "Des aides peuvent exister selon votre situation et votre pays. L'artisan vous indique ce qui s'applique à votre projet."],
    ],
  },

  vitrerie: {
    slug: 'vitrerie',
    nom: 'Vitrerie',
    artisan: 'vitrier',
    artisans: 'vitriers',
    icone: 'vitre',
    accroche: 'Double vitrage, vitre cassée, parois de douche, vitrines, miroirs et crédences.',
    h1: 'Vitrier : double vitrage, vitre cassée et parois de douche',
    intro:
      "Vitre cassée, passage au double vitrage, vitrine, miroir ou paroi de douche : décrivez votre besoin, un artisan vitrier de votre secteur vous rappelle sous 24 h.",
    tuiles: ['double-vitrage', 'vitre-cassee', 'paroi-douche', 'vitrine', 'miroir', 'credence-verre', 'garde-corps-verre', 'autre'],
    prestations: [
      P('vitre-cassee', 'Vitre cassée'),
      P('double-vitrage', 'Double vitrage'),
      P('triple-vitrage', 'Triple vitrage'),
      P('vitrine', 'Vitrine de magasin'),
      P('miroir', 'Miroir sur mesure'),
      P('paroi-douche', 'Paroi de douche'),
      P('credence-verre', 'Crédence en verre'),
      P('garde-corps-verre', 'Garde-corps en verre'),
      P('porte-vitree', 'Porte vitrée'),
      P('cloison-vitree', 'Cloison vitrée'),
      P('vitrage-securite', 'Vitrage de sécurité'),
      P('film-vitrage', 'Film pour vitrage'),
    ],
    groupes: [
      { key: 'vitres', titre: 'Vitre cassée et double vitrage {ville}', items: ['vitre-cassee', 'double-vitrage', 'triple-vitrage', 'vitrage-securite'], cta: 'Devis vitrage gratuit',
        texte: "Vitre fêlée ou brisée, simple vitrage à remplacer par du double vitrage, verre feuilleté anti-effraction : le vitrier mesure, commande et pose le vitrage adapté." },
      { key: 'commerce', titre: 'Vitrines et portes vitrées {ville}', items: ['vitrine', 'porte-vitree', 'cloison-vitree'], cta: 'Devis vitrine gratuit',
        texte: "Vitrine de magasin, porte d'entrée vitrée, cloison de bureau : des vitrages de sécurité posés par un artisan habitué aux commerces." },
      { key: 'deco', titre: 'Miroirs, parois de douche et crédences {ville}', items: ['miroir', 'paroi-douche', 'credence-verre', 'garde-corps-verre'], cta: 'Devis sur mesure gratuit',
        texte: "Miroir découpé sur mesure, paroi de douche en verre trempé, crédence de cuisine ou garde-corps en verre : du verre fabriqué aux bonnes dimensions." },
    ],
    faq: [
      ['Que faire en attendant le remplacement d’une vitre cassée ?', "Retirez les morceaux dangereux avec des gants épais et protégez l'ouverture avec un panneau ou un film plastique. Précisez l'urgence dans votre message."],
      ['Peut-on remplacer seulement le vitrage sans changer la fenêtre ?', "Oui, si le châssis est en bon état. Le vitrier pose un nouveau vitrage isolant dans le cadre existant."],
      ['Quel verre pour une paroi de douche ?', 'Du verre trempé de sécurité, en général de 6 à 8 mm. L’artisan vous conseille selon la configuration de la salle de bain.'],
    ],
  },
};

export const LISTE_METIERS = [METIERS.metallerie, METIERS.menuiserie, METIERS.vitrerie];

export type Lieu = 'FR' | 'BE' | 'TOUS';
// Vocabulaire belge (« châssis ») et libellés neutres pour les pages communes aux deux pays
const BE: Record<string, string> = { fenetre: 'Châssis', 'porte-fenetre': 'Porte-fenêtre', 'volets-battants': 'Volets battants', 'volet-roulant': 'Volet roulant' };
const TOUS: Record<string, string> = { fenetre: 'Fenêtre / châssis' };
const COURT: Record<string, string> = { 'portail-battant': 'Portail', 'garde-corps-verre': 'Garde-corps verre', 'credence-verre': 'Crédence', 'miroir': 'Miroir', 'vitrine': 'Vitrine' };
export function label(m: Metier, slug: string, lieu: Lieu = 'FR', court = false): string {
  if (slug === 'autre') return 'Autre projet';
  if (lieu === 'BE' && BE[slug]) return BE[slug];
  if (lieu === 'TOUS' && TOUS[slug]) return TOUS[slug];
  if (court && COURT[slug]) return COURT[slug];
  return m.prestations.find((p) => p.slug === slug)?.label ?? LIB[slug] ?? slug;
}
const LIB: Record<string, string> = { 'porte-garage-sectionnelle': 'Porte de garage', 'porte-entree': "Porte d'entrée", fenetre: 'Fenêtre', 'volet-roulant': 'Volet roulant' };

export const ville = (txt: string, nom?: string, prep = 'à') => txt.replace('{ville}', nom ? `${prep} ${nom}` : '').replace(/\s+$/, '');
