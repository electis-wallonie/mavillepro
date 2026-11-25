export const faqLd = (items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

export const crumbLd = (site: URL, items: [string, string][], base: (p: string) => string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: new URL(base(path), site).href })),
});

export const serviceLd = (o: { nom: string; description: string; zone: string[]; url: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: o.nom,
  description: o.description,
  areaServed: o.zone.map((n) => ({ '@type': 'City', name: n })),
  provider: { '@type': 'Organization', name: 'MaVillePro' },
  url: o.url,
});
