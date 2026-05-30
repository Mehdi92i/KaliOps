import { test, expect } from '@playwright/test';

test.describe('Page Contact', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/contact');
    });

    test('le titre de la page est affiché', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1 })).toContainText('collaborer');
    });

    test('tous les champs du formulaire sont présents', async ({ page }) => {
        await expect(page.getByLabel(/Nom/i)).toBeVisible();
        await expect(page.getByLabel(/Email/i)).toBeVisible();
        await expect(page.getByLabel(/Type de demande/i)).toBeVisible();
        await expect(page.getByLabel(/Message/i)).toBeVisible();
    });

    test('le bouton d\'envoi est présent', async ({ page }) => {
        await expect(page.getByRole('button', { name: /Envoyer/i })).toBeVisible();
    });

    test('les champs sont requis — soumission vide échoue', async ({ page }) => {
        await page.getByRole('button', { name: /Envoyer/i }).click();
        // Le formulaire ne doit pas avoir été soumis (HTML5 validation)
        await expect(page).toHaveURL('/contact');
    });

    test('les options du select de type de demande sont présentes', async ({ page }) => {
        const select = page.getByLabel(/Type de demande/i);
        await expect(select.getByRole('option', { name: /Conseil stratégique/i })).toBeAttached();
        await expect(select.getByRole('option', { name: /Audit qualité/i })).toBeAttached();
        await expect(select.getByRole('option', { name: /Automatisation/i })).toBeAttached();
        await expect(select.getByRole('option', { name: /Coaching/i })).toBeAttached();
        await expect(select.getByRole('option', { name: /Formation/i })).toBeAttached();
        await expect(select.getByRole('option', { name: /Autre/i })).toBeAttached();
    });

    test('le formulaire accepte la saisie dans tous les champs', async ({ page }) => {
        await page.getByLabel(/Nom/i).fill('Jean Dupont');
        await page.getByLabel(/Email/i).fill('jean@example.com');
        await page.getByLabel(/Type de demande/i).selectOption('audit');
        await page.getByLabel(/Message/i).fill('Bonjour, je souhaite un audit QA.');

        await expect(page.getByLabel(/Nom/i)).toHaveValue('Jean Dupont');
        await expect(page.getByLabel(/Email/i)).toHaveValue('jean@example.com');
        await expect(page.getByLabel(/Type de demande/i)).toHaveValue('audit');
        await expect(page.getByLabel(/Message/i)).toHaveValue('Bonjour, je souhaite un audit QA.');
    });

    test('le format email est validé', async ({ page }) => {
        await page.getByLabel(/Nom/i).fill('Jean Dupont');
        await page.getByLabel(/Email/i).fill('email-invalide');
        await page.getByLabel(/Type de demande/i).selectOption('audit');
        await page.getByLabel(/Message/i).fill('Message test');
        await page.getByRole('button', { name: /Envoyer/i }).click();
        // Le formulaire ne doit pas partir avec un email invalide
        await expect(page).toHaveURL('/contact');
    });

    test('le fond dégradé est appliqué', async ({ page }) => {
        await expect(page.locator('.page-gradient')).toBeVisible();
    });
});
