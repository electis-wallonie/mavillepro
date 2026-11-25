# MaVillePro

Site de demandes de devis en métallerie, menuiserie et vitrerie (région orléanaise, Charleroi, Mons, La Louvière, Waterloo).

- Générateur : [Astro](https://astro.build), pages statiques.
- Données : `src/data/metiers.ts` (métiers, prestations) et `src/data/communes.ts` (une fiche par commune ; une page n'existe que si sa fiche existe).
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
