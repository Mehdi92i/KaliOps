import { OUTILS } from '@/data/cv.mjs';

export default function CvTools() {
    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-5 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/30">
            <h2 className="text-2xl font-bold text-cv-section mb-6 text-center">Outils techniques</h2>
            <div className="space-y-5 text-left">
                {OUTILS.map((groupe) => (
                    <div key={groupe.titre}>
                        <h3 className="text-lg font-semibold text-texte mb-2">{groupe.titre}</h3>
                        <div className="flex flex-wrap gap-2">
                            {groupe.outils.map((outil) => (
                                <span key={outil} className="flex items-center gap-1 text-texte border border-bordure px-3 py-1 rounded-full text-sm font-medium">
                                    {outil}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
