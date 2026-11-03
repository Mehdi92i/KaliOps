// Génère le CV PDF (A4) à partir du même contenu que la page /cv.
// Usage : npm run cv:pdf   →   public/documents/CV_Mehdi_Tassi_Head_of_QA.pdf
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { calculerEmpreinte, FICHIER_EMPREINTE } from './cv-pdf-empreinte.mjs';
import {
    CONTACT,
    INTRO,
    POSTES_MANAGEMENT,
    PARCOURS_TECHNIQUE,
    COMPETENCES,
    CERTIFICATION,
    OUTILS,
    LOISIRS,
    CENTRES_INTERET,
    VOYAGES,
} from '../src/data/cv.mjs';

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SORTIE = path.join(RACINE, 'public/documents/CV_Mehdi_Tassi_Head_of_QA.pdf');
const LOGO = readFileSync(path.join(RACINE, 'public/images/kaliops-logo-horizontal.svg'), 'utf8')
    .replace(/<\?xml[^>]*>\s*/, '');

// Couleurs de la charte (src/app/globals.css)
const C = {
    petrole: '#174449',
    ocre: '#dd9222',
    vert: '#405643',
    cuivre: '#ba751c',
    creme: '#f2ebe7',
    noir: '#060906',
};

const echapper = (texte) =>
    String(texte).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// « 🎭 Playwright » → « Playwright » : pas d'emoji sur le CV imprimé
const sansEmoji = (texte) => texte.replace(/^[^\p{L}\p{N}]+\s*/u, '');

const poste = (p) => `
    <article class="poste">
        <header>
            <h3>${echapper(p.titre)}</h3>
            <p class="periode">${echapper(p.periode)}</p>
        </header>
        <p class="equipe">${echapper(p.equipe)}</p>
        ${p.blocs.map((b) => `<p class="bloc"><strong>${echapper(b.titre)} :</strong> ${echapper(b.texte)}</p>`).join('')}
        <p class="stack"><strong>Stack :</strong> ${p.outils.map(echapper).join(' · ')}</p>
    </article>`;

const parcours = (p) => `
    <article class="poste court">
        <header>
            <h3>${echapper(p.titre)}</h3>
            <p class="periode">${echapper(p.periode)}</p>
        </header>
        <p class="bloc">${echapper(p.texte)}</p>
        <p class="stack"><strong>Stack :</strong> ${p.outils.map(echapper).join(' · ')}</p>
    </article>`;

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&family=Signika+Negative:wght@600;700&display=swap" rel="stylesheet">
<style>
    @page { size: A4; margin: 0; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Jost', sans-serif; font-size: 8.3pt; line-height: 1.3; color: ${C.noir}; }
    h1, h2, h3 { font-family: 'Signika Negative', sans-serif; color: ${C.petrole}; }

    .entete { display: flex; align-items: center; justify-content: space-between; padding: 8mm 12mm 3mm; border-bottom: 3px solid ${C.ocre}; }
    .entete svg { height: 12mm; width: auto; }
    .identite { text-align: right; }
    .identite h1 { font-size: 20pt; line-height: 1.1; }
    .identite .titre { font-family: 'Signika Negative', sans-serif; font-weight: 700; font-size: 13pt; color: ${C.cuivre}; }
    .identite .contact { font-size: 8.2pt; color: ${C.vert}; margin-top: 0.4mm; }
    .accroche { padding: 3mm 12mm 0; font-size: 9pt; color: ${C.petrole}; }

    .corps { display: grid; grid-template-columns: 1fr 52mm; gap: 6mm; padding: 3.5mm 12mm 4mm; }
    h2 { font-size: 10.5pt; text-transform: uppercase; letter-spacing: 0.6px; border-bottom: 1.5px solid ${C.ocre}; padding-bottom: 1mm; margin-bottom: 2.5mm; }
    .section + .section { margin-top: 3mm; }

    .poste { break-inside: avoid; margin-bottom: 2.2mm; }
    .poste header { display: flex; justify-content: space-between; align-items: baseline; gap: 3mm; }
    .poste h3 { font-size: 10pt; }
    .periode { font-size: 8pt; color: ${C.vert}; white-space: nowrap; }
    .equipe { font-weight: 600; color: ${C.vert}; font-size: 8.5pt; margin-bottom: 1mm; }
    .bloc { margin-bottom: 0.8mm; }
    .bloc strong { color: ${C.petrole}; }
    .stack { font-size: 8pt; color: #3d3f3d; }
    .court .bloc { margin-bottom: 0.5mm; }
    .note { font-size: 8.5pt; font-style: italic; color: ${C.vert}; margin-bottom: 2mm; }

    .colonne { background: ${C.creme}; border-radius: 3mm; padding: 3.5mm; align-self: start; }
    .colonne h3 { font-size: 9pt; margin: 2mm 0 0.8mm; }
    .colonne ul { list-style: none; }
    .colonne li { padding-left: 3mm; position: relative; margin-bottom: 0.4mm; }
    .colonne li::before { content: ''; position: absolute; left: 0; top: 0.55em; width: 1.3mm; height: 1.3mm; border-radius: 50%; background: ${C.ocre}; }
    .pastilles { display: flex; flex-wrap: wrap; gap: 1mm; }
    .pastille { border: 1px solid ${C.petrole}33; background: #fff; border-radius: 99px; padding: 0.3mm 2mm; font-size: 8pt; }
    .interets strong { color: ${C.petrole}; }
    .certif { margin-top: 2.5mm; font-weight: 600; color: ${C.vert}; }
</style>
</head>
<body>
    <div class="entete">
        ${LOGO}
        <div class="identite">
            <h1>${CONTACT.nom}</h1>
            <p class="titre">${echapper(INTRO.titre)}</p>
            <p class="contact">${CONTACT.email} · ${CONTACT.telephone}</p>
            <p class="contact">${CONTACT.site} · ${CONTACT.linkedin}</p>
        </div>
    </div>
    <p class="accroche">${echapper(INTRO.accroche)}</p>

    <div class="corps">
        <main>
            <section class="section">
                <h2>Expériences professionnelles</h2>
                ${POSTES_MANAGEMENT.map(poste).join('')}
            </section>
            <section class="section">
                <h2>Parcours technique · 2015 – 2018</h2>
                <p class="note">L'expertise en automatisation qui fonde mon approche du management de la qualité.</p>
                ${PARCOURS_TECHNIQUE.map(parcours).join('')}
            </section>
            <section class="section interets">
                <h2>Centres d'intérêt</h2>
                <p><strong>Intérêts :</strong> ${echapper(CENTRES_INTERET)}</p>
                <p><strong>Loisirs :</strong> ${echapper(LOISIRS)}</p>
                <p><strong>Voyages :</strong> ${echapper(VOYAGES)}</p>
            </section>
        </main>

        <aside class="colonne">
            <h2>Compétences</h2>
            ${COMPETENCES.map((g) => `
                <h3>${echapper(g.titre)}</h3>
                <ul>${g.items.map((i) => `<li>${echapper(sansEmoji(i))}</li>`).join('')}</ul>`).join('')}
            <p class="certif">${echapper(sansEmoji(CERTIFICATION))}</p>

            <h2 style="margin-top:4mm">Outils</h2>
            ${OUTILS.map((g) => `
                <h3>${echapper(g.titre)}</h3>
                <div class="pastilles">${g.outils.map((o) => `<span class="pastille">${echapper(sansEmoji(o))}</span>`).join('')}</div>`).join('')}

        </aside>
    </div>
</body>
</html>`;

const navigateur = await chromium.launch();
try {
    const page = await navigateur.newPage();
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: SORTIE, format: 'A4', printBackground: true });
    // Vérifiée par tests/cv-pdf.spec.js : un CV modifié sans régénération du PDF fait échouer la CI
    writeFileSync(path.join(RACINE, FICHIER_EMPREINTE), `${calculerEmpreinte(RACINE)}\n`);
    console.log(`CV généré : ${path.relative(RACINE, SORTIE)}`);

    // Aperçu facultatif pour relire le rendu : CV_APERCU=chemin/vers/apercu.png npm run cv:pdf
    if (process.env.CV_APERCU) {
        await page.setViewportSize({ width: 794, height: 1123 }); // A4 à 96 dpi
        await page.emulateMedia({ media: 'print' });
        await page.screenshot({ path: process.env.CV_APERCU, fullPage: true });
        console.log(`Aperçu : ${process.env.CV_APERCU}`);
    }
} finally {
    await navigateur.close();
}
