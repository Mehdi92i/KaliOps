import { test, expect } from '@playwright/test';

// Palette de la charte KaliOps (voir CLAUDE.md et src/app/globals.css)
const CHARTE = {
    '--kali-petrole': '#174449',
    '--kali-ocre': '#dd9222',
    '--kali-vert': '#405643',
    '--kali-cuivre': '#ba751c',
    '--kali-creme': '#f2ebe7',
    '--kali-noir': '#060906',
    '--kali-blanc': '#ffffff',
};

const PETROLE = 'rgb(23, 68, 73)';
const OCRE = 'rgb(221, 146, 34)';
const CUIVRE = 'rgb(186, 117, 28)';

test.describe('Design system – tokens de la charte', () => {
    test('les couleurs --kali-* ont les valeurs de la charte', async ({ page }) => {
        await page.goto('/');
        // On compare les couleurs calculées (rgb) : le CSS compilé peut abréger #ffffff en #fff
        const couleurs = await page.evaluate((charte) => {
            const sonde = document.createElement('div');
            document.body.appendChild(sonde);
            const resultat = {};
            for (const [token, attendue] of Object.entries(charte)) {
                sonde.style.color = `var(${token})`;
                const actuelle = getComputedStyle(sonde).color;
                sonde.style.color = attendue;
                resultat[token] = { actuelle, attendue: getComputedStyle(sonde).color };
            }
            sonde.remove();
            return resultat;
        }, CHARTE);

        for (const [token, { actuelle, attendue }] of Object.entries(couleurs)) {
            expect(actuelle, token).toBe(attendue);
        }
    });

    test('les titres utilisent Signika Negative et le texte Jost', async ({ page }) => {
        await page.goto('/');
        const h1 = await page.getByRole('heading', { level: 1 }).evaluate((el) => getComputedStyle(el).fontFamily);
        const body = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
        expect(h1).toContain('Signika Negative');
        expect(body).toContain('Jost');
    });
});

test.describe('Design system – couleurs de marque', () => {
    test('le logo affiche « Kali » en pétrole et « Ops » en cuivre', async ({ page }) => {
        await page.goto('/');
        const [kali, ops] = await page
            .locator('header a[href="/"] span')
            .evaluateAll((spans) => spans.map((s) => getComputedStyle(s).color));
        expect(kali).toBe(PETROLE);
        expect(ops).toBe(CUIVRE);
    });

    const ACCENTS = [
        { path: '/', mots: ['qualité', 'delivery'] },
        { path: '/services', mots: ['services'] },
        { path: '/contact', mots: ['collaborer'] },
        { path: '/cv', mots: ['Vitae'] },
    ];

    for (const { path, mots } of ACCENTS) {
        test(`le titre de ${path} met en valeur ${mots.join(' / ')} en cuivre`, async ({ page }) => {
            await page.goto(path);
            const h1 = page.getByRole('heading', { level: 1 });
            for (const mot of mots) {
                const couleur = await h1.locator('span', { hasText: mot }).evaluate((el) => getComputedStyle(el).color);
                expect(couleur, mot).toBe(CUIVRE);
            }
        });
    }
});

test.describe('Design system – règle de contraste (CLAUDE.md)', () => {
    // L'ocre et le cuivre n'atteignent pas 4,5:1 sur fond clair :
    // ils ne sont autorisés en texte qu'en gros caractères (24px, ou 18,66px en gras).
    for (const path of ['/', '/services', '/cv', '/contact']) {
        test(`aucun petit texte ocre ou cuivre sur ${path}`, async ({ page }) => {
            await page.goto(path);
            const fautifs = await page.evaluate(({ ocre, cuivre }) => {
                const resultat = [];
                for (const el of document.querySelectorAll('body *')) {
                    const texte = [...el.childNodes]
                        .filter((n) => n.nodeType === Node.TEXT_NODE)
                        .map((n) => n.textContent.trim())
                        .join('');
                    if (!texte) continue;
                    const style = getComputedStyle(el);
                    if (style.color !== ocre && style.color !== cuivre) continue;
                    const taille = parseFloat(style.fontSize);
                    const gras = parseInt(style.fontWeight, 10) >= 700;
                    const grosTexte = taille >= 24 || (gras && taille >= 18.66);
                    if (!grosTexte) resultat.push(`« ${texte.slice(0, 30)} » (${taille}px)`);
                }
                return resultat;
            }, { ocre: OCRE, cuivre: CUIVRE });

            expect(fautifs, fautifs.join(', ')).toEqual([]);
        });
    }
});
