// Empreinte (fingerprint) des sources du CV PDF : si elle change, le PDF doit être régénéré (npm run cv:pdf).
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';

export const CV_PDF_SOURCES = [
    'src/data/cv.mjs',
    'scripts/generate-cv-pdf.mjs',
];

export const FINGERPRINT_FILE = 'scripts/cv-pdf.fingerprint';

export function computeFingerprint(root) {
    const hash = createHash('sha256');
    for (const source of CV_PDF_SOURCES) {
        // Fins de ligne normalisées : même empreinte sous Windows (CRLF) et en CI (LF)
        hash.update(readFileSync(path.join(root, source), 'utf8').replace(/\r\n/g, '\n'));
    }
    return hash.digest('hex');
}
