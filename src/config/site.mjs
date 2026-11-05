// Adresse officielle du site : URL canoniques, sitemap, robots.txt et aperçus de partage (LinkedIn, etc.)
export const SITE_URL = 'https://www.kaliops-consulting.fr';
export const SITE_NAME = 'KaliOps';
export const DEFAULT_TITLE = 'KaliOps · Mehdi Tassi — Head of QA & conseil qualité logicielle';
export const DEFAULT_DESCRIPTION =
    'Mehdi Tassi, Head of QA : direction QA à temps partagé, stratégie et KPI qualité, formation des équipes, automatisation et QAOps, IA appliquée aux tests.';

// Image d'aperçu 1200 × 630, générée par `npm run og:image`
export const OG_IMAGE = {
    url: '/images/og-kaliops.png',
    width: 1200,
    height: 630,
    alt: 'KaliOps — Mehdi Tassi, Head of QA : structurer la qualité, accélérer le delivery',
};

// Pages listées dans le sitemap (chemin, priorité)
export const PAGES = [
    { path: '/', priority: 1 },
    { path: '/services', priority: 0.9 },
    { path: '/cv', priority: 0.8 },
    { path: '/contact', priority: 0.7 },
];

// Métadonnées d'une page : titre, description, URL canonique et aperçu de partage cohérents.
// Next.js remplace `openGraph` en entier quand une page le définit : on le recompose donc ici, image comprise.
export function pageMetadata({ title, description, path, absoluteTitle = false }) {
    const fullTitle = absoluteTitle ? title : `${title} · ${SITE_NAME}`;
    return {
        title: absoluteTitle ? { absolute: title } : title,
        description,
        alternates: { canonical: path },
        openGraph: {
            type: 'website',
            locale: 'fr_FR',
            siteName: SITE_NAME,
            title: fullTitle,
            description,
            url: path,
            images: [OG_IMAGE],
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: [OG_IMAGE.url],
        },
    };
}
