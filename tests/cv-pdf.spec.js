import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import { computeFingerprint, FINGERPRINT_FILE } from '../scripts/cv-pdf-fingerprint.mjs';

test.describe('CV PDF', () => {
    test('le PDF est à jour avec le contenu du CV', () => {
        const stored = readFileSync(FINGERPRINT_FILE, 'utf8').trim();
        expect(
            computeFingerprint(process.cwd()),
            'Le contenu du CV a changé sans régénérer le PDF : lance « npm run cv:pdf » puis commite le PDF.'
        ).toBe(stored);
    });

    test('le bouton de téléchargement pointe vers le CV Head of QA', async ({ page }) => {
        await page.goto('/cv');
        const link = page.getByRole('link', { name: /Télécharger mon CV/i });
        await expect(link).toHaveAttribute('href', '/documents/CV_Mehdi_Tassi_Head_of_QA.pdf');
    });

    test('le PDF est servi et non vide', async ({ request }) => {
        const response = await request.get('/documents/CV_Mehdi_Tassi_Head_of_QA.pdf');
        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('application/pdf');

        const content = await response.body();
        expect(content.subarray(0, 5).toString()).toBe('%PDF-');
        expect(content.length).toBeGreaterThan(20_000);
    });
});
