import { SITE_URL, PAGES } from '@/config/site.mjs';

// Servi sur /sitemap.xml : liste des pages à indexer par les moteurs de recherche
export default function sitemap() {
    const lastModified = new Date();
    return PAGES.map(({ path, priority }) => ({
        url: `${SITE_URL}${path === '/' ? '' : path}`,
        lastModified,
        changeFrequency: 'monthly',
        priority,
    }));
}
