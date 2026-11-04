import { POSTES_MANAGEMENT, PARCOURS_TECHNIQUE, PREMIERES_EXPERIENCES } from '@/data/cv.mjs';

function Stack({ outils }) {
    if (outils.length === 0) return null;
    return (
        <p className="text-sm text-texte-secondaire mt-1">
            <span className="font-semibold">Stack :</span> {outils.join(' · ')}
        </p>
    );
}

export default function CvExperiences() {
    return (
        <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-lg p-5 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/30 space-y-8">
            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-cv-section mb-6">Expériences professionnelles</h2>
            </div>

            {POSTES_MANAGEMENT.map((poste, index) => (
                <div key={poste.titre}>
                    {index > 0 && (
                        <hr className="border-t-4 border-brand-secondary w-full max-w-64 mx-auto rounded-full my-12" />
                    )}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-texte">{poste.titre}</h3>
                            <p className="text-sm text-texte-secondaire">{poste.periode}</p>
                            <p className="text-sm font-semibold text-brand-tertiary mt-1">{poste.equipe}</p>
                            <Stack outils={poste.outils} />
                        </div>
                        <div className="space-y-6">
                            {poste.blocs.map((bloc) => (
                                <div key={bloc.titre} className="flex items-start space-x-4">
                                    <div className="p-2 rounded">
                                        <span className="text-2xl" aria-hidden="true">{bloc.icone}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-texte-secondaire">{bloc.titre}</h4>
                                        <p className="text-texte-secondaire">{bloc.texte}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            <hr className="border-t-4 border-brand-secondary w-full max-w-64 mx-auto rounded-full my-12" />

            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-texte">{PREMIERES_EXPERIENCES.titre}</h3>
                    <p className="text-sm text-texte-secondaire">
                        {PREMIERES_EXPERIENCES.note}
                    </p>
                </div>
                {PARCOURS_TECHNIQUE.map((poste) => (
                    <div key={poste.titre} className="flex items-start space-x-4">
                        <div className="p-2 rounded">
                            <span className="text-2xl" aria-hidden="true">🧪</span>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-texte-secondaire">{poste.titre}</h4>
                            <p className="text-sm text-texte-secondaire">{poste.periode}</p>
                            <p className="text-texte-secondaire">{poste.texte}</p>
                            <Stack outils={poste.outils} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
