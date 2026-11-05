// Génère l'image d'aperçu de partage (Open Graph, 1200 × 630) affichée par LinkedIn, Slack, etc.
// Usage : npm run og:image   →   public/images/og-kaliops.png
// Même mise en page que l'accueil du site : carte claire sur le dégradé de la charte, pictogramme en filigrane.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { SITE_URL } from '../src/config/site.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT_PATH = path.join(ROOT, 'public/images/og-kaliops.png');
const svg = (file) =>
    readFileSync(path.join(ROOT, 'public/images', file), 'utf8').replace(/<\?xml[^>]*>\s*/, '');

// Couleurs de la charte (src/app/globals.css)
const C = {
    petrol: '#174449',
    petrolDark: '#0f3034',
    green: '#405643',
    copper: '#ba751c',
    ochre: '#dd9222',
    black: '#060906',
};

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&family=Signika+Negative:wght@600;700&display=swap" rel="stylesheet">
<style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { width: 1200px; height: 630px; overflow: hidden; font-family: 'Jost', sans-serif;
           background: linear-gradient(to bottom right, ${C.green}, ${C.petrol}, ${C.petrolDark});
           display: flex; align-items: center; justify-content: center; position: relative; }
    .picto { position: absolute; right: -90px; top: 50%; transform: translateY(-50%); height: 560px; opacity: 0.08; }
    .picto svg { height: 100%; width: auto; }
    .card { position: relative; width: 1000px; background: rgba(255, 255, 255, 0.93); border-radius: 28px;
            padding: 48px 64px; text-align: center; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25); }
    .logo svg { height: 78px; width: auto; }
    h1 { font-family: 'Signika Negative', sans-serif; font-weight: 700; font-size: 62px; line-height: 1.12;
         color: ${C.petrol}; letter-spacing: -1px; margin-top: 28px; }
    h1 span { color: ${C.copper}; }
    .bar { width: 72px; height: 6px; border-radius: 99px; background: ${C.ochre}; margin: 26px auto; }
    .who { font-size: 30px; font-weight: 500; color: ${C.black}; }
    .url { font-size: 24px; font-weight: 600; color: ${C.green}; margin-top: 10px; }
</style>
</head>
<body>
    <div class="picto">${svg('kaliops-picto-filigrane.svg')}</div>
    <div class="card">
        <div class="logo">${svg('kaliops-logo-horizontal.svg')}</div>
        <h1>Structurer la <span>qualité</span>.<br>Accélérer le <span>delivery</span>.</h1>
        <div class="bar"></div>
        <p class="who">Mehdi Tassi · Head of QA & conseil qualité logicielle</p>
        <p class="url">${new URL(SITE_URL).hostname}</p>
    </div>
</body>
</html>`;

const browser = await chromium.launch();
try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: OUTPUT_PATH, type: 'png' });
    console.log(`Image Open Graph générée : ${path.relative(ROOT, OUTPUT_PATH)}`);
} finally {
    await browser.close();
}
