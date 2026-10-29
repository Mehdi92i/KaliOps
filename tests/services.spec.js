import { test, expect } from '@playwright/test';

const SERVICES = [
    { id: 'strategie', title: 'Stratégie QA' },
    { id: 'tests', title: 'Tests automatisés' },
    { id: 'qaops', title: 'CI/CD & QAOps' },
    { id: 'accompagnement', title: 'Accompagnement' },
];

test.describe('Page Services', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/services');
    });

    test('le titre de la page est affiché', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
        await expect(page.getByRole('heading', { level: 1 })).toContainText('services');
    });

    test('le carousel affiche le premier service par défaut', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /Stratégie QA/i })).toBeVisible();
    });

    test('la flèche droite avance au service suivant', async ({ page }) => {
        const nextBtn = page.getByRole('button').filter({ has: page.locator('svg') }).last();
        await nextBtn.click();
        await expect(page.getByRole('heading', { name: /Tests automatisés/i })).toBeVisible();
    });

    test('la flèche gauche revient au service précédent', async ({ page }) => {
        const nextBtn = page.getByRole('button').filter({ has: page.locator('svg') }).last();
        const prevBtn = page.getByRole('button').filter({ has: page.locator('svg') }).first();

        await nextBtn.click();
        await expect(page.getByRole('heading', { name: /Tests automatisés/i })).toBeVisible();

        await prevBtn.click();
        await expect(page.getByRole('heading', { name: /Stratégie QA/i })).toBeVisible();
    });

    test('la flèche gauche sur le premier service va au dernier (boucle)', async ({ page }) => {
        const prevBtn = page.getByRole('button').filter({ has: page.locator('svg') }).first();
        await prevBtn.click();
        await expect(page.getByRole('heading', { name: /Accompagnement/i })).toBeVisible();
    });

    test('la flèche droite sur le dernier service revient au premier (boucle)', async ({ page }) => {
        const nextBtn = page.getByRole('button').filter({ has: page.locator('svg') }).last();
        for (let i = 0; i < SERVICES.length; i++) {
            await nextBtn.click();
        }
        await expect(page.getByRole('heading', { name: /Stratégie QA/i })).toBeVisible();
    });

    test('l\'ancre URL positionne sur le bon service', async ({ page }) => {
        // Naviguer via le lien de la home (client-side) garantit que le hash
        // est traité par Next.js avant le montage du composant
        await page.goto('/');
        await page.locator('a[href="/services#qaops"]').first().click();
        await expect(page.getByRole('heading', { name: /CI\/CD & QAOps/i })).toBeVisible({ timeout: 10000 });
    });

    test('le bouton "Me contacter" est présent et fonctionnel', async ({ page }) => {
        const ctaBtn = page.getByRole('link', { name: /Me contacter/i });
        await expect(ctaBtn).toBeVisible();
        await ctaBtn.click();
        await expect(page).toHaveURL('/contact');
    });

    test('le fond dégradé est appliqué', async ({ page }) => {
        await expect(page.locator('.page-gradient')).toBeVisible();
    });
});
