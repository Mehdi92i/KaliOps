import { SITE_URL } from '@/config/site.mjs';

// Servi sur /robots.txt : tout le site est indexable sauf l'API du formulaire de contact
export default function robots() {
    return {
        rules: { userAgent: '*', allow: '/', disallow: '/api/' },
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
