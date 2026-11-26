# MaVillePro

Site de demandes de devis en métallerie, menuiserie et vitrerie (région orléanaise, Charleroi, Mons, La Louvière, Waterloo).

- Générateur : [Astro](https://astro.build), pages statiques.
- Données : `src/data/metiers.ts` (métiers, prestations), `src/data/zone-fr.json` (352 communes à 50 km d'Orléans, geo.api.gouv.fr) et `src/data/zone-be.json` (858 localités wallonnes à 70 km de Charleroi). `src/data/communes.ts` calcule voisines, distances, secteur et vague de publication.
- Textes des pages commune : `src/lib/textes.ts`.
- Vagues : `VAGUE=1` (défaut) publie les communes FR de plus de 1 000 habitants et 67 communes et sections belges ; `VAGUE=2` et `VAGUE=3` ajoutent le reste.
- Photos : `src/assets/prestations/<métier>/<prestation>.jpg`.

## Commandes

```bash
npm install
npm run dev                   # site local
PREVIEW=1 npm run build       # version aperçu (GitHub Pages, non indexable)
npm run build                 # version de production (mavillepro.com)
npm run check:site            # contrôles : téléphone, H1, title et description uniques
```

## Aperçu

Chaque push sur `main` publie l'aperçu sur GitHub Pages : https://electis-wallonie.github.io/mavillepro/
L'aperçu est bloqué pour les moteurs de recherche (balise noindex et robots.txt). Le formulaire n'y envoie rien.
