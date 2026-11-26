// Les deux sites pays : /fr/ et /be/
import type { Lieu } from '../data/metiers';
export type P = 'fr' | 'be';
export const PAYS: Record<P, {
  code: 'FR' | 'BE'; lieu: Lieu; nom: string; locale: string; zone: string; zoneCourte: string; topbar: string;
  heroIntro: string; faqZone: string; tel: string;
}> = {
  fr: {
    code: 'FR', lieu: 'FR', nom: 'France', locale: 'fr-FR',
    zone: "Région orléanaise : Orléans et 50 km autour (Loiret, Loir-et-Cher, Eure-et-Loir)",
    zoneCourte: 'Région orléanaise', topbar: 'Orléans et 50 km autour',
    heroIntro: 'Portail, porte de garage, pergola, fenêtres ou volets roulants : décrivez votre projet en une minute. Un artisan de la région orléanaise vous rappelle sous 24 h pour un devis gratuit.',
    faqZone: "Dans la région orléanaise, jusqu'à environ 50 km autour d'Orléans : Loiret, ouest du Loir-et-Cher et sud de l'Eure-et-Loir.",
    tel: 'Téléphone',
  },
  be: {
    code: 'BE', lieu: 'BE', nom: 'Belgique', locale: 'fr-BE',
    zone: "Wallonie : Charleroi, La Louvière, Mons, Nivelles, Waterloo, Namur et environ 70 km autour de Charleroi",
    zoneCourte: 'Wallonie', topbar: 'Charleroi, Mons, La Louvière, Waterloo, Namur',
    heroIntro: 'Portail, porte de garage, pergola, châssis ou volets : décrivez votre projet en une minute. Un artisan de votre région vous rappelle sous 24 h pour un devis gratuit.',
    faqZone: "En Wallonie, dans un rayon d'environ 70 km autour de Charleroi : Hainaut, Brabant wallon et province de Namur, de Mons à Waterloo et Namur.",
    tel: 'GSM ou téléphone',
  },
};
export const LISTE_P: P[] = ['fr', 'be'];
export const pDe = (code: 'FR' | 'BE'): P => (code === 'FR' ? 'fr' : 'be');

// Vocabulaire : « fenêtres » en France, « châssis » en Belgique
export const vocab = (t: string, p: P) =>
  p === 'be'
    ? t.replace(/Fenêtres (et|ou) châssis/g, 'Châssis').replace(/fenêtres (et|ou) châssis/g, 'châssis').replace(/Fenêtres, châssis/g, 'Châssis')
    : t.replace(/Fenêtres (et|ou) châssis/g, 'Fenêtres').replace(/fenêtres (et|ou) châssis/g, 'fenêtres').replace(/Fenêtres, châssis/g, 'Fenêtres').replace(/Fenêtre \/ châssis/g, 'Fenêtre');
