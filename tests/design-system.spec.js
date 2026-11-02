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
    test('le header affiche le logo horizontal de la charte', async ({ page }) => {
        await page.goto('/');
        const lien = page.locator('header a[href="/"]').first();
        const logo = lien.locator('img[src*="kaliops-logo-horizontal.svg"]');

        await expect(logo).toBeVisible();
        // Image réellement chargée (pas d'icône cassée)
        expect(await logo.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
        // Le logo est décoratif : le lien reste nommé « KaliOps » pour les lecteurs d'écran
        await expect(logo).toHaveAttribute('alt', '');
        await expect(page.getByRole('link', { name: 'KaliOps' })).toBeVisible();
    });

    test('le SVG du logo utilise uniquement les couleurs de la charte', async ({ request }) => {
        const svg = await (await request.get('/images/kaliops-logo-horizontal.svg')).text();
        const couleurs = [...new Set(svg.match(/#[0-9a-fA-F]{6}\b/g).map((c) => c.toLowerCase()))];
        for (const couleur of couleurs) {
            expect(Object.values(CHARTE), couleur).toContain(couleur);
        }
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

        test(`aucun texte blanc sur fond ocre ou cuivre sur ${path}`, async ({ page }) => {
            await page.goto(path);
            // Blanc sur ocre : 2,6:1. La charte impose du texte noir sur l'ocre (7,82:1).
            const fautifs = await page.evaluate(({ ocre, cuivre }) => {
                const blanc = 'rgb(255, 255, 255)';
                return [...document.querySelectorAll('body *')]
                    .filter((el) => {
                        const style = getComputedStyle(el);
                        return [ocre, cuivre].includes(style.backgroundColor)
                            && style.color === blanc
                            && el.textContent.trim() !== '';
                    })
                    .map((el) => `« ${el.textContent.trim().slice(0, 30)} »`);
            }, { ocre: OCRE, cuivre: CUIVRE });

            expect(fautifs, fautifs.join(', ')).toEqual([]);
        });
    }
});

test.describe('Design system – forme des boutons', () => {
    // Tous les boutons sont en arrondi complet (pilule), pas en carré arrondi
    for (const path of ['/', '/services', '/cv', '/contact']) {
        test(`les boutons de ${path} sont entièrement arrondis`, async ({ page }) => {
            await page.goto(path);
            const fautifs = await page.evaluate(() => {
                const estBouton = (el) => {
                    const style = getComputedStyle(el);
                    const rect = el.getBoundingClientRect();
                    const fondVisible = style.backgroundColor !== 'rgba(0, 0, 0, 0)';
                    // Les cartes cliquables (services de l'accueil) sont plus hautes qu'un bouton
                    return rect.width > 0 && rect.height > 0 && rect.height < 70
                        && (el.tagName === 'BUTTON' || fondVisible);
                };
                return [...document.querySelectorAll('button, a')]
                    .filter(estBouton)
                    .filter((el) => {
                        const rayon = parseFloat(getComputedStyle(el).borderTopLeftRadius);
                        return rayon < el.getBoundingClientRect().height / 2 - 1;
                    })
                    .map((el) => `« ${el.textContent.trim().slice(0, 30) || el.getAttribute('title') || el.tagName} »`);
            });

            expect(fautifs, fautifs.join(', ')).toEqual([]);
        });
    }
});

test.describe('Design system – pas de couleur en dur dans le code', () => {
    // Toutes les couleurs passent par les tokens de src/app/globals.css (règle CLAUDE.md)
    const PALETTE_TAILWIND = /\b(?:text|bg|border|from|via|to|ring|fill|stroke|outline|divide|decoration|placeholder|shadow)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b|\b(?:text|bg|border)-black\b/g;
    // (?<!&) : ignore les entités HTML comme &#039;
    const HEXA = /(?<!&)#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;

    test('les composants n\'utilisent ni couleur Tailwind par défaut ni code hexadécimal', async () => {
        const fs = await import('node:fs');
        const path = await import('node:path');

        const fichiers = [];
        const parcourir = (dossier) => {
            for (const entree of fs.readdirSync(dossier, { withFileTypes: true })) {
                const chemin = path.join(dossier, entree.name);
                if (entree.isDirectory()) parcourir(chemin);
                else if (/\.(jsx?|tsx?)$/.test(entree.name)) fichiers.push(chemin);
            }
        };
        parcourir(path.join(process.cwd(), 'src'));

        const fautes = [];
        for (const fichier of fichiers) {
            fs.readFileSync(fichier, 'utf8').split('\n').forEach((ligne, i) => {
                for (const motif of [PALETTE_TAILWIND, HEXA]) {
                    for (const trouve of ligne.match(motif) ?? []) {
                        fautes.push(`${path.relative(process.cwd(), fichier)}:${i + 1} ${trouve}`);
                    }
                }
            });
        }

        expect(fautes, fautes.join('\n')).toEqual([]);
    });
});
