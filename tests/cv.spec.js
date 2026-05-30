import { test, expect } from '@playwright/test';

test.describe('Page CV', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/cv');
    });

    test('le titre Curriculum Vitae est affiché', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1 })).toContainText('Curriculum');
        await expect(page.getByRole('heading', { level: 1 })).toContainText('Vitae');
    });

    test('le bouton de téléchargement du CV est présent', async ({ page }) => {
        const downloadBtn = page.getByRole('link', { name: /Télécharger mon CV/i });
        await expect(downloadBtn).toBeVisible();
        await expect(downloadBtn).toHaveAttribute('download');
        await expect(downloadBtn).toHaveAttribute('href', /\.pdf$/);
    });

    test('la section Expériences professionnelles est visible', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /Expériences professionnelles/i })).toBeVisible();
    });

    test('les postes du CV sont affichés', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /Chapter Lead QA/i })).toBeVisible();
        await expect(page.getByRole('heading', { name: /Lead QA – Skilleos/i })).toBeVisible();
        await expect(page.getByRole('heading', { name: /Lead QA – FlexyBeauty/i })).toBeVisible();
        await expect(page.getByRole('heading', { name: /QA Test Automation Engineer/i })).toBeVisible();
        await expect(page.getByRole('heading', { name: /Chef de projet Test Junior/i })).toBeVisible();
    });

    test('la section Compétences est visible', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /Compétences/i })).toBeVisible();
    });

    test('la section Outils techniques est visible', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /Outils techniques/i })).toBeVisible();
    });

    test('Cypress est mentionné dans les outils', async ({ page }) => {
        await expect(page.getByText(/Cypress/)).toBeVisible();
    });

    test('la section Loisirs est visible', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /Loisirs/i })).toBeVisible();
    });

    test('la section Voyages est visible', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /Voyages/i })).toBeVisible();
    });

    test('le fond dégradé est appliqué', async ({ page }) => {
        await expect(page.locator('.page-gradient')).toBeVisible();
    });
});
