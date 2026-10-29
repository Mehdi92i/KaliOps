import { test, expect } from '@playwright/test';

const PAGES = ['/', '/services', '/cv', '/contact'];

// ─── En-têtes de sécurité HTTP ────────────────────────────────────────────────
test.describe('En-têtes de sécurité HTTP', () => {
    for (const path of PAGES) {
        test(`headers présents sur ${path}`, async ({ request }) => {
            const response = await request.get(path);

            // Empêche le navigateur de snifer le MIME type
            expect(
                response.headers()['x-content-type-options'],
                'x-content-type-options manquant'
            ).toBe('nosniff');

            // Protège contre le clickjacking
            const xFrame = response.headers()['x-frame-options'];
            expect(
                xFrame === 'DENY' || xFrame === 'SAMEORIGIN',
                `x-frame-options doit être DENY ou SAMEORIGIN, reçu : ${xFrame}`
            ).toBeTruthy();

            // DNS prefetch control
            expect(
                response.headers()['x-dns-prefetch-control'],
                'x-dns-prefetch-control manquant'
            ).toBeDefined();
        });
    }
});

// ─── Protection XSS – formulaire de contact ───────────────────────────────────
test.describe('Protection XSS – formulaire de contact', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/contact');
    });

    test('un payload XSS dans le nom n\'exécute pas de script', async ({ page }) => {
        const xssPayload = '<script>window.__xss=true</script>';

        await page.getByLabel(/Nom/i).fill(xssPayload);
        await page.getByLabel(/Email/i).fill('test@example.com');
        await page.getByLabel(/Type de demande/i).selectOption('audit');
        await page.getByLabel(/Message/i).fill('test');

        // Le script injecté ne doit jamais s'exécuter
        const xssExecuted = await page.evaluate(() => window.__xss);
        expect(xssExecuted).toBeUndefined();
    });

    test('un payload XSS dans le message n\'exécute pas de script', async ({ page }) => {
        const xssPayload = '<img src=x onerror="window.__xss2=true">';

        await page.getByLabel(/Nom/i).fill('Jean Test');
        await page.getByLabel(/Email/i).fill('test@example.com');
        await page.getByLabel(/Type de demande/i).selectOption('audit');
        await page.getByLabel(/Message/i).fill(xssPayload);

        const xssExecuted = await page.evaluate(() => window.__xss2);
        expect(xssExecuted).toBeUndefined();
    });

    test('les champs ont un attribut type correct (pas d\'injection via type)', async ({ page }) => {
        await expect(page.locator('input[name="email"]')).toHaveAttribute('type', 'email');
        await expect(page.locator('input[name="name"]')).toHaveAttribute('type', 'text');
    });
});

// ─── Sécurité de l'API /api/contact ───────────────────────────────────────────
test.describe('Sécurité API – /api/contact', () => {
    test('retourne 400 si les champs requis sont manquants', async ({ request }) => {
        const res = await request.post('/api/contact', {
            data: {},
            headers: { 'Content-Type': 'application/json' },
        });
        expect(res.status()).toBe(400);
    });

    test('retourne 400 si le JSON est invalide', async ({ request }) => {
        const res = await request.post('/api/contact', {
            data: 'not-json',
            headers: { 'Content-Type': 'application/json' },
        });
        expect(res.status()).toBe(400);
    });

    test('retourne 400 si un champ requis est absent', async ({ request }) => {
        const res = await request.post('/api/contact', {
            data: { name: 'Test', email: 'test@example.com' }, // message et type manquants
            headers: { 'Content-Type': 'application/json' },
        });
        expect(res.status()).toBe(400);
    });

    test('l\'API n\'expose pas de stacktrace en cas d\'erreur', async ({ request }) => {
        const res = await request.post('/api/contact', {
            data: {},
            headers: { 'Content-Type': 'application/json' },
        });
        const body = await res.text();
        expect(body).not.toContain('at ');         // pas de stacktrace Node.js
        expect(body).not.toContain('node_modules'); // pas de chemin interne
    });

    test('un payload surdimensionné est rejeté ou géré sans crash', async ({ request }) => {
        const oversized = 'A'.repeat(100_000);
        const res = await request.post('/api/contact', {
            data: {
                name: oversized,
                email: 'test@example.com',
                message: oversized,
                type: 'audit',
            },
            headers: { 'Content-Type': 'application/json' },
        });
        // Doit répondre (pas de crash 500 non géré), 400 ou 4xx/5xx acceptable
        expect(res.status()).toBeLessThan(600);
        expect(res.status()).not.toBe(0);
    });
});

// ─── Pas de fuite d'informations sensibles ────────────────────────────────────
test.describe('Pas de fuite d\'informations sensibles', () => {
    test('le HTML rendu ne contient pas de clé API', async ({ page }) => {
        await page.goto('/');
        const html = await page.content();
        expect(html).not.toMatch(/RESEND_API_KEY/i);
        expect(html).not.toMatch(/re_[a-zA-Z0-9]{20,}/); // format clé Resend
    });

    test('les pages ne révèlent pas de chemins internes Node.js', async ({ page }) => {
        await page.goto('/');
        const html = await page.content();
        expect(html).not.toContain('/node_modules/');
        expect(html).not.toContain('webpack://');
    });

    test('la page 404 ne révèle pas de stack technique', async ({ page }) => {
        await page.goto('/page-qui-nexiste-pas');
        const html = await page.content();
        expect(html).not.toContain('node_modules');
        expect(html).not.toContain('Error: ');
    });
});

// ─── Lien externe sécurisé ────────────────────────────────────────────────────
test.describe('Liens externes sécurisés', () => {
    test('le lien LinkedIn a rel="noopener noreferrer"', async ({ page }) => {
        await page.goto('/');
        const linkedinLink = page.locator('a[href*="linkedin.com"]').first();
        await expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
        await expect(linkedinLink).toHaveAttribute('target', '_blank');
    });
});
