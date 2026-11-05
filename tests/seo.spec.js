import { test, expect } from '@playwright/test';

// Adresse officielle (src/config/site.mjs) : les URL canoniques et les aperçus pointent toujours vers le domaine
const SITE_URL = 'https://www.kaliops-consulting.fr';
const PAGES = ['/', '/services', '/cv', '/contact'];
const urlOf = (path) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`);
// Next.js peut ajouter ou non une barre finale sur la racine
const sameUrl = (path) => new RegExp(`^${urlOf(path).replace(/[.]/g, '\\.')}/?$`);

test.describe('SEO – titres et descriptions', () => {
    test('chaque page a un titre et une description uniques, à la bonne longueur', async ({ page }) => {
        const titles = new Set();
        const descriptions = new Set();

        for (const path of PAGES) {
            await page.goto(path);
            const title = await page.title();
            const description = await page.locator('meta[name="description"]').getAttribute('content');

            expect(title, `${path} : la marque figure dans le titre`).toContain('KaliOps');
            // Au-delà d'environ 60-70 caractères, Google coupe le titre dans ses résultats
            expect(title.length, `${path} : titre trop long (${title})`).toBeLessThanOrEqual(70);
            expect(description?.length ?? 0, `${path} : description trop courte`).toBeGreaterThanOrEqual(70);
            expect(description.length, `${path} : description trop longue`).toBeLessThanOrEqual(160);

            titles.add(title);
            descriptions.add(description);
        }

        expect(titles.size, 'les titres doivent être différents d’une page à l’autre').toBe(PAGES.length);
        expect(descriptions.size, 'les descriptions doivent être différentes d’une page à l’autre').toBe(PAGES.length);
    });
});

test.describe('SEO – URL canonique et aperçu de partage', () => {
    for (const path of PAGES) {
        test(`${path} : canonical et Open Graph pointent vers le domaine officiel`, async ({ page }) => {
            await page.goto(path);

            await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', sameUrl(path));
            await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', sameUrl(path));
            await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /KaliOps/);
            await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
                'content',
                `${SITE_URL}/images/og-kaliops.png`
            );
            await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
        });
    }

    test("l'image d'aperçu est servie au format PNG", async ({ request }) => {
        const response = await request.get('/images/og-kaliops.png');
        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('image/png');
    });
});

test.describe('SEO – robots.txt, sitemap et données structurées', () => {
    test('robots.txt autorise le site, protège l’API et indique le sitemap', async ({ request }) => {
        const response = await request.get('/robots.txt');
        expect(response.status()).toBe(200);
        const body = await response.text();
        expect(body).toContain('Allow: /');
        expect(body).toContain('Disallow: /api/');
        expect(body).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
    });

    test('sitemap.xml liste les pages du site', async ({ request }) => {
        const response = await request.get('/sitemap.xml');
        expect(response.status()).toBe(200);
        const body = await response.text();
        for (const path of PAGES) {
            expect(body, `${path} absent du sitemap`).toMatch(new RegExp(`<loc>${urlOf(path).replace(/[.]/g, '\\.')}/?</loc>`));
        }
    });

    test("l'accueil décrit KaliOps en données structurées (schema.org)", async ({ page }) => {
        await page.goto('/');
        const json = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
        expect(json['@type']).toBe('ProfessionalService');
        expect(json.name).toBe('KaliOps');
        expect(json.url).toBe(SITE_URL);
        expect(json.founder.name).toBe('Mehdi Tassi');
        expect(json.founder.jobTitle).toBe('Head of QA');
    });
});
