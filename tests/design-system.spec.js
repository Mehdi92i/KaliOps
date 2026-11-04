import { test, expect } from '@playwright/test';

// Palette de la charte KaliOps (voir CLAUDE.md et src/app/globals.css)
const BRAND_PALETTE = {
    '--kali-petrole': '#174449',
    '--kali-ocre': '#dd9222',
    '--kali-vert': '#405643',
    '--kali-cuivre': '#ba751c',
    '--kali-creme': '#f2ebe7',
    '--kali-noir': '#060906',
    '--kali-blanc': '#ffffff',
};

const OCHRE = 'rgb(221, 146, 34)';
const COPPER = 'rgb(186, 117, 28)';

test.describe('Design system – tokens de la charte', () => {
    test('les couleurs --kali-* ont les valeurs de la charte', async ({ page }) => {
        await page.goto('/');
        // On compare les couleurs calculées (rgb) : le CSS compilé peut abréger #ffffff en #fff
        const colors = await page.evaluate((palette) => {
            const probe = document.createElement('div');
            document.body.appendChild(probe);
            const result = {};
            for (const [token, expected] of Object.entries(palette)) {
                probe.style.color = `var(${token})`;
                const actual = getComputedStyle(probe).color;
                probe.style.color = expected;
                result[token] = { actual, expected: getComputedStyle(probe).color };
            }
            probe.remove();
            return result;
        }, BRAND_PALETTE);

        for (const [token, { actual, expected }] of Object.entries(colors)) {
            expect(actual, token).toBe(expected);
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
        const link = page.locator('header a[href="/"]').first();
        const logo = link.locator('img[src*="kaliops-logo-horizontal.svg"]');

        await expect(logo).toBeVisible();
        // Image réellement chargée (pas d'icône cassée)
        expect(await logo.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
        // Le logo est décoratif : le lien reste nommé « KaliOps » pour les lecteurs d'écran
        await expect(logo).toHaveAttribute('alt', '');
        await expect(page.getByRole('link', { name: 'KaliOps' })).toBeVisible();
    });

    test('le SVG du logo utilise uniquement les couleurs de la charte', async ({ request }) => {
        const svg = await (await request.get('/images/kaliops-logo-horizontal.svg')).text();
        const colors = [...new Set(svg.match(/#[0-9a-fA-F]{6}\b/g).map((c) => c.toLowerCase()))];
        for (const color of colors) {
            expect(Object.values(BRAND_PALETTE), color).toContain(color);
        }
    });

    const ACCENT_COLORS = [
        { path: '/', mots: ['qualité', 'delivery'] },
        { path: '/services', mots: ['services'] },
        { path: '/contact', mots: ['collaborer'] },
        { path: '/cv', mots: ['Vitae'] },
    ];

    for (const { path, mots } of ACCENT_COLORS) {
        test(`le titre de ${path} met en valeur ${mots.join(' / ')} en cuivre`, async ({ page }) => {
            await page.goto(path);
            const h1 = page.getByRole('heading', { level: 1 });
            for (const word of mots) {
                const color = await h1.locator('span', { hasText: word }).evaluate((el) => getComputedStyle(el).color);
                expect(color, word).toBe(COPPER);
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
            const offenders = await page.evaluate(({ ochre, copper }) => {
                const result = [];
                for (const el of document.querySelectorAll('body *')) {
                    const text = [...el.childNodes]
                        .filter((n) => n.nodeType === Node.TEXT_NODE)
                        .map((n) => n.textContent.trim())
                        .join('');
                    if (!text) continue;
                    const style = getComputedStyle(el);
                    if (style.color !== ochre && style.color !== copper) continue;
                    const size = parseFloat(style.fontSize);
                    const isBold = parseInt(style.fontWeight, 10) >= 700;
                    const isLargeText = size >= 24 || (isBold && size >= 18.66);
                    if (!isLargeText) result.push(`« ${text.slice(0, 30)} » (${size}px)`);
                }
                return result;
            }, { ochre: OCHRE, copper: COPPER });

            expect(offenders, offenders.join(', ')).toEqual([]);
        });

        test(`aucun texte blanc sur fond ocre ou cuivre sur ${path}`, async ({ page }) => {
            await page.goto(path);
            // Blanc sur ocre : 2,6:1. La charte impose du texte noir sur l'ocre (7,82:1).
            const offenders = await page.evaluate(({ ochre, copper }) => {
                const white = 'rgb(255, 255, 255)';
                return [...document.querySelectorAll('body *')]
                    .filter((el) => {
                        const style = getComputedStyle(el);
                        return [ochre, copper].includes(style.backgroundColor)
                            && style.color === white
                            && el.textContent.trim() !== '';
                    })
                    .map((el) => `« ${el.textContent.trim().slice(0, 30)} »`);
            }, { ochre: OCHRE, copper: COPPER });

            expect(offenders, offenders.join(', ')).toEqual([]);
        });
    }
});

test.describe('Design system – forme des boutons', () => {
    // Tous les boutons sont en arrondi complet (pilule), pas en carré arrondi
    for (const path of ['/', '/services', '/cv', '/contact']) {
        test(`les boutons de ${path} sont entièrement arrondis`, async ({ page }) => {
            await page.goto(path);
            const offenders = await page.evaluate(() => {
                const isButton = (el) => {
                    const style = getComputedStyle(el);
                    const rect = el.getBoundingClientRect();
                    const visibleBackground = style.backgroundColor !== 'rgba(0, 0, 0, 0)';
                    // Les cartes cliquables (services de l'accueil) sont plus hautes qu'un bouton
                    return rect.width > 0 && rect.height > 0 && rect.height < 70
                        && (el.tagName === 'BUTTON' || visibleBackground);
                };
                return [...document.querySelectorAll('button, a')]
                    .filter(isButton)
                    .filter((el) => {
                        const radius = parseFloat(getComputedStyle(el).borderTopLeftRadius);
                        return radius < el.getBoundingClientRect().height / 2 - 1;
                    })
                    .map((el) => `« ${el.textContent.trim().slice(0, 30) || el.getAttribute('title') || el.tagName} »`);
            });

            expect(offenders, offenders.join(', ')).toEqual([]);
        });
    }
});

test.describe('Design system – pas de couleur en dur dans le code', () => {
    // Toutes les couleurs passent par les tokens de src/app/globals.css (règle CLAUDE.md)
    const TAILWIND_PALETTE = /\b(?:text|bg|border|from|via|to|ring|fill|stroke|outline|divide|decoration|placeholder|shadow)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b|\b(?:text|bg|border)-black\b/g;
    // (?<!&) : ignore les entités HTML comme &#039;
    const HEX = /(?<!&)#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;

    test('les composants n\'utilisent ni couleur Tailwind par défaut ni code hexadécimal', async () => {
        const fs = await import('node:fs');
        const path = await import('node:path');

        const files = [];
        const walk = (dir) => {
            for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
                const filePath = path.join(dir, entry.name);
                if (entry.isDirectory()) walk(filePath);
                else if (/\.(jsx?|tsx?)$/.test(entry.name)) files.push(filePath);
            }
        };
        walk(path.join(process.cwd(), 'src'));

        const violations = [];
        for (const file of files) {
            fs.readFileSync(file, 'utf8').split('\n').forEach((ligne, i) => {
                for (const pattern of [TAILWIND_PALETTE, HEX]) {
                    for (const found of ligne.match(pattern) ?? []) {
                        violations.push(`${path.relative(process.cwd(), file)}:${i + 1} ${found}`);
                    }
                }
            });
        }

        expect(violations, violations.join('\n')).toEqual([]);
    });
});
