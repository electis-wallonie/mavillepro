export const BRAND = 'MaVillePro';
export const SLOGAN = 'Trouvez votre artisan près de chez vous';
export const CTA = 'Être rappelé sur ma demande de devis';
export const CTA_COURT = 'Être rappelé';
export const DELAI = 'Réponse sous 24 h';
export const PREVIEW = import.meta.env.PREVIEW === '1' || process.env.PREVIEW === '1';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
/** Construit une URL interne en tenant compte du sous-dossier de l'aperçu. */
export const u = (path: string) => base + (path.startsWith('/') ? path : '/' + path);
