import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import { calculerEmpreinte, FICHIER_EMPREINTE } from '../scripts/cv-pdf-empreinte.mjs';

test.describe('CV PDF', () => {
    test('le PDF est à jour avec le contenu du CV', () => {
        const enregistree = readFileSync(FICHIER_EMPREINTE, 'utf8').trim();
        expect(
            calculerEmpreinte(process.cwd()),
            'Le contenu du CV a changé sans régénérer le PDF : lance « npm run cv:pdf » puis commite le PDF.'
        ).toBe(enregistree);
    });

    test('le bouton de téléchargement pointe vers le CV Head of QA', async ({ page }) => {
        await page.goto('/cv');
        const lien = page.getByRole('link', { name: /Télécharger mon CV/i });
        await expect(lien).toHaveAttribute('href', '/documents/CV_Mehdi_Tassi_Head_of_QA.pdf');
    });

    test('le PDF est servi et non vide', async ({ request }) => {
        const reponse = await request.get('/documents/CV_Mehdi_Tassi_Head_of_QA.pdf');
        expect(reponse.status()).toBe(200);
        expect(reponse.headers()['content-type']).toContain('application/pdf');

        const contenu = await reponse.body();
        expect(contenu.subarray(0, 5).toString()).toBe('%PDF-');
        expect(contenu.length).toBeGreaterThan(20_000);
    });
});
