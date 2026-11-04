// Génère le CV PDF (A4) à partir du même contenu que la page /cv.
// Usage : npm run cv:pdf   →   public/documents/CV_Mehdi_Tassi_Head_of_QA.pdf
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { computeFingerprint, FINGERPRINT_FILE } from './cv-pdf-fingerprint.mjs';
import {
    CONTACT,
    INTRO,
    MANAGEMENT_ROLES,
    TECHNICAL_ROLES,
    EARLY_CAREER,
    SKILLS,
    CERTIFICATION,
    TOOLS,
    HOBBIES,
    INTERESTS,
    TRAVELS,
} from '../src/data/cv.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT_PATH = path.join(ROOT, 'public/documents/CV_Mehdi_Tassi_Head_of_QA.pdf');
const LOGO = readFileSync(path.join(ROOT, 'public/images/kaliops-logo-horizontal.svg'), 'utf8')
    .replace(/<\?xml[^>]*>\s*/, '');

// Couleurs de la charte (src/app/globals.css)
const C = {
    petrol: '#174449',
    ochre: '#dd9222',
    green: '#405643',
    copper: '#ba751c',
    cream: '#f2ebe7',
    black: '#060906',
};

const escapeText = (text) =>
    String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// « 🎭 Playwright » → « Playwright » : pas d'emoji sur le CV imprimé
const stripEmoji = (text) => text.replace(/^[^\p{L}\p{N}]+\s*/u, '');

// Pas de ligne Stack pour une expérience sans outils (ex. activité de formation)
const renderStack = (tools) =>
    tools.length ? `<p class="stack"><strong>Stack :</strong> ${tools.map(escapeText).join(' · ')}</p>` : '';

// Secteur d'activité de l'entreprise, sur la ligne du titre pour ne pas allonger la page
const renderSector = (sector) => (sector ? `<span class="sector"> · ${escapeText(sector)}</span>` : '');

const renderBlocks = (blocks) =>
    blocks.map((b) => `<p class="block"><strong>${escapeText(b.title)} :</strong> ${escapeText(b.text)}</p>`).join('');

// `groups` (facultatif) : parties titrées d'un même poste, par exemple pour KaliOps
const renderGroups = (p) =>
    p.groups
        ? p.groups.map((g) => `<p class="group">${escapeText(g.title)}</p>${renderBlocks(g.blocks)}`).join('')
        : renderBlocks(p.blocks);

const renderRole = (p) => `
    <article class="role">
        <header>
            <h3>${escapeText(p.title)}${renderSector(p.sector)}</h3>
            <p class="period">${escapeText(p.period)}</p>
        </header>
        <p class="team">${escapeText(p.team)}</p>
        ${renderGroups(p)}
        ${renderStack(p.tools)}
    </article>`;

const renderTechnicalRole = (p) => `
    <article class="role compact">
        <header>
            <h3>${escapeText(p.title)}${renderSector(p.sector)}</h3>
            <p class="period">${escapeText(p.period)}</p>
        </header>
        <p class="block">${escapeText(p.text)}</p>
        ${renderStack(p.tools)}
    </article>`;

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&family=Signika+Negative:wght@600;700&display=swap" rel="stylesheet">
<style>
    @page { size: A4; margin: 0; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Jost', sans-serif; font-size: 8pt; line-height: 1.22; color: ${C.black}; }
    h1, h2, h3 { font-family: 'Signika Negative', sans-serif; color: ${C.petrol}; }

    .page-header { display: flex; align-items: center; justify-content: space-between; padding: 6.5mm 12mm 3mm; border-bottom: 3px solid ${C.ochre}; }
    .page-header svg { height: 12mm; width: auto; }
    .identity { text-align: right; }
    .identity h1 { font-size: 20pt; line-height: 1.1; }
    .identity .title { font-family: 'Signika Negative', sans-serif; font-weight: 700; font-size: 13pt; color: ${C.copper}; }
    .identity .contact { font-size: 8.2pt; color: ${C.green}; margin-top: 0.4mm; }
    .identity .contact a { color: inherit; text-decoration: none; }
    .tagline { padding: 3mm 12mm 0; font-size: 9pt; color: ${C.petrol}; }

    .layout { display: grid; grid-template-columns: 1fr 52mm; gap: 6mm; padding: 3.5mm 12mm 4mm; }
    h2 { font-size: 10.5pt; text-transform: uppercase; letter-spacing: 0.6px; border-bottom: 1.5px solid ${C.ochre}; padding-bottom: 1mm; margin-bottom: 2mm; }
    .section + .section { margin-top: 3mm; }

    .role { break-inside: avoid; margin-bottom: 1.5mm; }
    .role header { display: flex; justify-content: space-between; align-items: baseline; gap: 3mm; }
    .role h3 { font-size: 10pt; }
    .period { font-size: 8pt; color: ${C.green}; white-space: nowrap; }
    .team { font-weight: 600; color: ${C.green}; font-size: 8.5pt; margin-bottom: 1mm; }
    .block { margin-bottom: 0.3mm; }
    .sector { font-family: 'Jost', sans-serif; font-size: 8pt; font-weight: 500; color: ${C.green}; }
    .block strong { color: ${C.petrol}; }
    .group { font-size: 7.6pt; font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; color: ${C.green}; margin: 0.6mm 0 0.2mm; }
    .stack { font-size: 8pt; color: #3d3f3d; }
    .compact .block { margin-bottom: 0.5mm; }
    .note { font-size: 8.5pt; font-style: italic; color: ${C.green}; margin-bottom: 2mm; }

    .sidebar { background: ${C.cream}; border-radius: 3mm; padding: 3.5mm; align-self: start; }
    .sidebar h3 { font-size: 9pt; margin: 2mm 0 0.8mm; }
    .sidebar ul { list-style: none; }
    .sidebar li { padding-left: 3mm; position: relative; margin-bottom: 0.4mm; }
    .sidebar li::before { content: ''; position: absolute; left: 0; top: 0.55em; width: 1.3mm; height: 1.3mm; border-radius: 50%; background: ${C.ochre}; }
    .chips { display: flex; flex-wrap: wrap; gap: 1mm; }
    .chip { border: 1px solid ${C.petrol}33; background: #fff; border-radius: 99px; padding: 0.3mm 2mm; font-size: 8pt; }
    .interests strong { color: ${C.petrol}; }
    .certification { margin-top: 2.5mm; font-weight: 600; color: ${C.green}; }
</style>
</head>
<body>
    <div class="page-header">
        ${LOGO}
        <div class="identity">
            <h1>${CONTACT.name}</h1>
            <p class="title">${escapeText(INTRO.title)}</p>
            <p class="contact"><a href="mailto:${CONTACT.email}">${CONTACT.email}</a> · ${CONTACT.phone}</p>
            <p class="contact"><a href="${CONTACT.site}">${CONTACT.site}</a></p>
            <p class="contact"><a href="${CONTACT.linkedin}">${CONTACT.linkedin}</a></p>
        </div>
    </div>
    <p class="tagline">${escapeText(INTRO.tagline)}</p>

    <div class="layout">
        <main>
            <section class="section">
                <h2>Expériences professionnelles</h2>
                ${MANAGEMENT_ROLES.map(renderRole).join('')}
            </section>
            <section class="section">
                <h2>${escapeText(EARLY_CAREER.title)}</h2>
                <p class="note">${escapeText(EARLY_CAREER.note)}</p>
                ${TECHNICAL_ROLES.map(renderTechnicalRole).join('')}
            </section>
            <section class="section interests">
                <h2>Centres d'intérêt</h2>
                <p><strong>Intérêts :</strong> ${escapeText(INTERESTS)}</p>
                <p><strong>Loisirs :</strong> ${escapeText(HOBBIES)}</p>
                <p><strong>Voyages :</strong> ${escapeText(TRAVELS)}</p>
            </section>
        </main>

        <aside class="sidebar">
            <h2>Compétences</h2>
            ${SKILLS.map((g) => `
                <h3>${escapeText(g.title)}</h3>
                <ul>${g.items.map((i) => `<li>${escapeText(stripEmoji(i))}</li>`).join('')}</ul>`).join('')}
            <p class="certification">${escapeText(stripEmoji(CERTIFICATION))}</p>

            <h2 style="margin-top:4mm">Outils</h2>
            ${TOOLS.map((g) => `
                <h3>${escapeText(g.title)}</h3>
                <div class="chips">${g.tools.map((o) => `<span class="chip">${escapeText(stripEmoji(o))}</span>`).join('')}</div>`).join('')}

        </aside>
    </div>
</body>
</html>`;

const browser = await chromium.launch();
try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: OUTPUT_PATH, format: 'A4', printBackground: true });
    // Vérifiée par tests/cv-pdf.spec.js : un CV modifié sans régénération du PDF fait échouer la CI
    writeFileSync(path.join(ROOT, FINGERPRINT_FILE), `${computeFingerprint(ROOT)}\n`);
    console.log(`CV généré : ${path.relative(ROOT, OUTPUT_PATH)}`);

    // Aperçu facultatif pour relire le rendu : CV_PREVIEW=chemin/vers/apercu.png npm run cv:pdf
    if (process.env.CV_PREVIEW) {
        await page.setViewportSize({ width: 794, height: 1123 }); // A4 à 96 dpi
        await page.emulateMedia({ media: 'print' });
        await page.screenshot({ path: process.env.CV_PREVIEW, fullPage: true });
        console.log(`Aperçu : ${process.env.CV_PREVIEW}`);
    }
} finally {
    await browser.close();
}
