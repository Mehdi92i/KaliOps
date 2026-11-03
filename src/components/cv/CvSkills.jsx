import { COMPETENCES, CERTIFICATION } from '@/data/cv.mjs';

export default function CvSkills() {
    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-5 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/30">
            <h2 className="text-2xl font-bold text-cv-section mb-6 text-center">Compétences</h2>
            <div className="space-y-6 text-left">
                {COMPETENCES.map((groupe) => (
                    <div key={groupe.titre}>
                        <h3 className="text-lg font-semibold text-texte mb-2">{groupe.titre}</h3>
                        <ul className="list-none space-y-1 text-texte text-sm">
                            {groupe.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
                <p className="text-sm font-semibold text-brand-tertiary">{CERTIFICATION}</p>
            </div>
        </div>
    );
}
