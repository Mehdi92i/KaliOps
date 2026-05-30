import { test, expect } from '@playwright/test';

test.describe('Jeu BugHunt', () => {
    test.beforeEach(async ({ page }) => {
        // Neutralise l'audio pour éviter les erreurs en CI
        await page.addInitScript(() => {
            window.Audio = class {
                play() { return Promise.resolve(); }
            };
        });
        await page.goto('/');
    });

    test('le bouton "Chasser un bug" est visible au démarrage', async ({ page }) => {
        await expect(page.getByRole('button', { name: /Chasser un bug/i })).toBeVisible();
    });

    test('cliquer sur "Chasser un bug" démarre le jeu', async ({ page }) => {
        await page.getByRole('button', { name: /Chasser un bug/i }).click();

        // L'overlay de jeu doit être visible
        await expect(page.locator('.fixed.inset-0.z-50')).toBeVisible();

        // Le score doit apparaître
        await expect(page.getByText(/Score :/i)).toBeVisible();
    });

    test('le bouton "Arrêter la chasse" est visible pendant le jeu', async ({ page }) => {
        await page.getByRole('button', { name: /Chasser un bug/i }).click();
        await expect(page.getByRole('button', { name: /Arrêter la chasse/i })).toBeVisible();
    });

    test('cliquer sur "Arrêter la chasse" stoppe le jeu', async ({ page }) => {
        await page.getByRole('button', { name: /Chasser un bug/i }).click();
        await expect(page.locator('.fixed.inset-0.z-50')).toBeVisible();

        await page.getByRole('button', { name: /Arrêter la chasse/i }).click();

        // L'overlay doit disparaître
        await expect(page.locator('.fixed.inset-0.z-50')).not.toBeVisible();

        // Le message de fin doit apparaître
        await expect(page.getByText(/Partie terminée/i)).toBeVisible();
    });

    test('le score final s\'affiche après la fin du jeu', async ({ page }) => {
        await page.getByRole('button', { name: /Chasser un bug/i }).click();
        await page.getByRole('button', { name: /Arrêter la chasse/i }).click();

        await expect(page.getByText(/Tu as attrapé/i)).toBeVisible();
    });

    test('le bouton "Chasser un bug" réapparaît après l\'arrêt', async ({ page }) => {
        await page.getByRole('button', { name: /Chasser un bug/i }).click();
        await page.getByRole('button', { name: /Arrêter la chasse/i }).click();

        await expect(page.getByRole('button', { name: /Chasser un bug/i })).toBeVisible();
    });
});
