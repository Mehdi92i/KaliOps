import { documents } from '@/config/assets';
import { INTRO } from '@/data/cv.mjs';

export default function CvIntro() {
    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-5 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/30">
            <h1 className="text-4xl md:text-6xl font-extrabold text-texte tracking-tight text-center">
                Curriculum <span className="text-kali-cuivre">Vitae</span>
            </h1>
            <p className="mt-3 font-heading text-3xl md:text-5xl font-bold text-brand-primary text-center">
                {INTRO.titre}
            </p>
            <p className="mt-4 text-lg md:text-xl text-texte-secondaire max-w-3xl mx-auto text-center">
                {INTRO.accroche}
            </p>

            <div className="mt-8 text-center">
                <a
                    href={documents.cv}
                    download
                    className="inline-flex items-center gap-2 bg-brand-secondary text-kali-noir font-semibold px-6 py-2 rounded-full hover:bg-brand-secondary-hover transition-colors duration-300"
                >
                    <span>📄</span>
                    <span>Télécharger mon CV (PDF)</span>
                </a>
            </div>
        </div>
    );
}
