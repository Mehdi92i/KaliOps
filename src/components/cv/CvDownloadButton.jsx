'use client';

import { pageview } from '@vercel/analytics';
import { documents } from '@/config/assets';

// Les événements personnalisés de Vercel Analytics sont réservés au plan Pro.
// Chaque téléchargement est donc compté comme une page vue virtuelle « /cv/download »,
// visible dans le panneau « Pages » du tableau de bord (plan Hobby gratuit).
export const CV_DOWNLOAD_ROUTE = '/cv/download';

export default function CvDownloadButton() {
    return (
        <a
            href={documents.cv}
            download
            onClick={() => pageview({ route: CV_DOWNLOAD_ROUTE, path: CV_DOWNLOAD_ROUTE })}
            className="inline-flex items-center gap-2 bg-brand-secondary text-kali-noir font-semibold px-6 py-2 rounded-full hover:bg-brand-secondary-hover transition-colors duration-300"
        >
            <span>📄</span>
            <span>Télécharger mon CV (PDF)</span>
        </a>
    );
}
