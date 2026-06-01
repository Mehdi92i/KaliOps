import { test, expect } from '@playwright/test';

test.describe('Navigation & Header', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('le logo KaliOps est visible et redirige vers /accueil', async ({ page }) => {
        const logo = page.locator('header a[href="/"] img[alt="KaliOps"]');
        await expect(logo).toBeVisible();
        await logo.click();
        await expect(page).toHaveURL('/');
    });

    test('le header est présent sur toutes les pages', async ({ page }) => {
        const pages = ['/', '/services', '/cv', '/contact'];
        for (const path of pages) {
            await page.goto(path);
            await expect(page.locator('header')).toBeVisible();
        }
    });

    test('le footer est présent sur toutes les pages', async ({ page }) => {
        const pages = ['/', '/services', '/cv', '/contact'];
        for (const path of pages) {
            await page.goto(path);
            await expect(page.locator('footer')).toBeVisible();
            await expect(page.locator('footer')).toContainText('KaliOps');
        }
    });

    test('les liens de navigation fonctionnent', async ({ page }) => {
        // Depuis l'accueil, naviguer vers Services
        await page.click('header a[href="/services"]');
        await expect(page).toHaveURL('/services');

        // Vers CV
        await page.click('header a[href="/cv"]');
        await expect(page).toHaveURL('/cv');

        // Vers Contact
        await page.click('header a[href="/contact"]');
        await expect(page).toHaveURL('/contact');

        // Retour accueil via logo
        await page.click('header a[href="/"]');
        await expect(page).toHaveURL('/');
    });

    test('le lien actif est masqué dans le menu', async ({ page }) => {
        await page.goto('/services');
        // Le lien /services ne doit pas apparaître dans le nav quand on est dessus
        const servicesLinks = page.locator('header nav a[href="/services"]');
        await expect(servicesLinks).toHaveCount(0);
    });

    test('le bouton LinkedIn est présent et pointe vers LinkedIn', async ({ page }) => {
        const linkedinBtn = page.locator('header a[href*="linkedin.com"]');
        await expect(linkedinBtn).toBeVisible();
        await expect(linkedinBtn).toHaveAttribute('target', '_blank');
        await expect(linkedinBtn).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('le bouton BugHunt est visible dans le header', async ({ page }) => {
        await expect(page.getByRole('button', { name: /chasser un bug/i })).toBeVisible();
    });
});
