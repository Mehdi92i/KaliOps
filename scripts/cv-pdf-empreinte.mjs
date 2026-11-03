// Empreinte des sources du CV PDF : si elle change, le PDF doit être régénéré (npm run cv:pdf).
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';

export const SOURCES_CV_PDF = [
    'src/data/cv.mjs',
    'scripts/generate-cv-pdf.mjs',
    'public/images/kaliops-logo-horizontal.svg',
];

export const FICHIER_EMPREINTE = 'scripts/cv-pdf.empreinte';

export function calculerEmpreinte(racine) {
    const hash = createHash('sha256');
    for (const source of SOURCES_CV_PDF) {
        // Fins de ligne normalisées : même empreinte sous Windows (CRLF) et en CI (LF)
        hash.update(readFileSync(path.join(racine, source), 'utf8').replace(/\r\n/g, '\n'));
    }
    return hash.digest('hex');
}
