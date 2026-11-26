import type { ImageMetadata } from 'astro';

const all = import.meta.glob<{ default: ImageMetadata }>('../assets/prestations/*/*.jpg', { eager: true });

/** Photo d'une prestation, ou undefined si elle n'existe pas encore. */
export function photo(metier: string, slug: string): ImageMetadata | undefined {
  return all[`../assets/prestations/${metier}/${slug}.jpg`]?.default ?? Object.entries(all).find(([k]) => k.endsWith(`/${slug}.jpg`))?.[1].default;
}
