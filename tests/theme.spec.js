import { test, expect } from '@playwright/test';

test.describe('Système de thème – CSS Variables', () => {
    test('les variables CSS de marque sont définies', async ({ page }) => {
        await page.goto('/');
        const primary = await page.evaluate(() =>
            getComputedStyle(document.documentElement).getPropertyValue('--brand-primary').trim()
        );
        const secondary = await page.evaluate(() =>
            getComputedStyle(document.documentElement).getPropertyValue('--brand-secondary').trim()
        );
        const tertiary = await page.evaluate(() =>
            getComputedStyle(document.documentElement).getPropertyValue('--brand-tertiary').trim()
        );

        expect(primary).not.toBe('');
        expect(secondary).not.toBe('');
        expect(tertiary).not.toBe('');
    });

    test('le logo image KaliOps est présent dans le header', async ({ page }) => {
        await page.goto('/');
        const logo = page.locator('header a[href="/"] img[alt="KaliOps"]');
        await expect(logo).toBeVisible();
        const src = await logo.getAttribute('src');
        expect(src).not.toBe('');
        expect(src).not.toBeNull();
    });

    test('la variable --gradient-from est définie', async ({ page }) => {
        await page.goto('/');
        const gradientFrom = await page.evaluate(() =>
            getComputedStyle(document.documentElement).getPropertyValue('--gradient-from').trim()
        );
        expect(gradientFrom).not.toBe('');
    });

    test('la classe .page-gradient est présente sur les pages principales', async ({ page }) => {
        const pages = ['/', '/services', '/cv', '/contact'];
        for (const path of pages) {
            await page.goto(path);
            const gradient = page.locator('.page-gradient');
            await expect(gradient).toBeAttached();
        }
    });

    test('la variable --cv-section est définie', async ({ page }) => {
        await page.goto('/cv');
        const cvSection = await page.evaluate(() =>
            getComputedStyle(document.documentElement).getPropertyValue('--cv-section').trim()
        );
        expect(cvSection).not.toBe('');
    });
});
