import { test, expect } from '@playwright/test';

test.describe('Page Accueil', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('le titre principal est visible', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1 })).toContainText('Structurer la qualité');
    });

    test('la mention KaliOps est présente dans l\'accroche', async ({ page }) => {
        const accroche = page.locator('p').filter({ hasText: 'KaliOps' }).first();
        await expect(accroche).toBeVisible();
    });

    test('les 4 cartes de services sont affichées', async ({ page }) => {
        await expect(page.getByRole('link', { name: /Stratégie QA/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /Tests automatisés/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /CI\/CD/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /Accompagnement/i })).toBeVisible();
    });

    test('les cartes services redirigent vers /services avec ancre', async ({ page }) => {
        const card = page.getByRole('link', { name: /Stratégie QA/i });
        await expect(card).toHaveAttribute('href', '/services#strategie');
    });

    test('les boutons CTA sont présents', async ({ page }) => {
        await expect(page.getByRole('link', { name: /En savoir plus/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /Voir mon CV/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /Me contacter/i })).toBeVisible();
    });

    test('le bouton "Voir mon CV" redirige vers /cv', async ({ page }) => {
        await page.getByRole('link', { name: /Voir mon CV/i }).click();
        await expect(page).toHaveURL('/cv');
    });

    test('le bouton "Me contacter" redirige vers /contact', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('link', { name: /Me contacter/i }).first().click();
        await expect(page).toHaveURL('/contact');
    });

    test('le carousel de recommandations est visible', async ({ page }) => {
        await expect(page.getByText(/Ce qu'on dit de moi/i)).toBeVisible();
    });

    test('les flèches du carousel de recommandations fonctionnent', async ({ page }) => {
        const carousel = page.locator('div.bg-white\\/90.rounded-xl').first();
        const initialText = await carousel.textContent();

        await page.getByRole('button').filter({ has: page.locator('svg') }).last().click();
        const newText = await carousel.textContent();

        // Le texte doit avoir changé après navigation
        expect(newText).not.toBe(initialText);
    });

    test('le fond dégradé est appliqué', async ({ page }) => {
        const gradient = page.locator('.page-gradient');
        await expect(gradient).toBeVisible();
    });
});
