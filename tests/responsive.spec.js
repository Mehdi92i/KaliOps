import { test, expect } from '@playwright/test';

const PAGES = ['/', '/services', '/cv', '/contact'];
const VIEWPORTS = [
    { name: 'petit mobile', width: 320, height: 640 },
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablette', width: 768, height: 1024 },
];

test.describe('Responsive – pas de défilement horizontal', () => {
    for (const viewport of VIEWPORTS) {
        for (const path of PAGES) {
            test(`${path} tient dans la largeur ${viewport.name} (${viewport.width}px)`, async ({ page }) => {
                await page.setViewportSize({ width: viewport.width, height: viewport.height });
                await page.goto(path);

                const { scrollWidth, clientWidth } = await page.evaluate(() => ({
                    scrollWidth: document.documentElement.scrollWidth,
                    clientWidth: document.documentElement.clientWidth,
                }));

                expect(scrollWidth, `la page ${path} déborde de ${scrollWidth - clientWidth}px`).toBeLessThanOrEqual(clientWidth);
            });
        }
    }
});

test.describe('Responsive – header mobile', () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test('le logo, le jeu, LinkedIn et les liens restent accessibles', async ({ page }) => {
        await page.goto('/');
        const header = page.locator('header');

        await expect(header.locator('a[href="/"]').first()).toBeVisible();
        await expect(page.getByRole('button', { name: /chasser un bug/i })).toBeVisible();
        await expect(header.locator('a[href*="linkedin.com"]')).toBeVisible();
        for (const href of ['/services', '/cv', '/contact']) {
            await expect(header.locator(`a[href="${href}"]`)).toBeVisible();
        }
    });

    test('le header reste compact', async ({ page }) => {
        await page.goto('/');
        const { height } = await page.locator('header').boundingBox();
        expect(height).toBeLessThanOrEqual(120);
    });

    test('les zones tactiles du header font au moins 44px', async ({ page }) => {
        await page.goto('/');
        const header = page.locator('header');
        const cibles = [
            page.getByRole('button', { name: /chasser un bug/i }),
            header.locator('a[href*="linkedin.com"]'),
            header.locator('a[href="/services"]'),
            header.locator('a[href="/cv"]'),
            header.locator('a[href="/contact"]'),
        ];
        for (const cible of cibles) {
            const { height } = await cible.boundingBox();
            expect(height).toBeGreaterThanOrEqual(44);
        }
    });
});

test.describe('Responsive – desktop', () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test('le header tient sur une seule ligne', async ({ page }) => {
        await page.goto('/');
        const { height } = await page.locator('header').boundingBox();
        expect(height).toBeLessThanOrEqual(80);
    });

    test('Contact affiche le titre et le formulaire côte à côte', async ({ page }) => {
        await page.goto('/contact');
        const titre = await page.getByRole('heading', { level: 1 }).boundingBox();
        const formulaire = await page.locator('form').boundingBox();
        expect(formulaire.x).toBeGreaterThan(titre.x + titre.width);
    });
});

test.describe('Responsive – mise en page', () => {
    test('Contact empile le titre et le formulaire en mobile', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto('/contact');
        const titre = await page.getByRole('heading', { level: 1 }).boundingBox();
        const formulaire = await page.locator('form').boundingBox();
        expect(formulaire.y).toBeGreaterThan(titre.y + titre.height);
    });

    test('Services est centrée verticalement sur grand écran', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto('/services');
        const header = await page.locator('header').boundingBox();
        const footer = await page.locator('footer').boundingBox();
        const titre = await page.getByRole('heading', { level: 1 }).boundingBox();
        const cta = await page.getByRole('link', { name: /me contacter/i }).last().boundingBox();

        const espaceHaut = titre.y - (header.y + header.height);
        const espaceBas = footer.y - (cta.y + cta.height);
        // Tolérance : marges internes du bloc titre et marge au-dessus du footer
        expect(Math.abs(espaceHaut - espaceBas)).toBeLessThanOrEqual(120);
    });
});
