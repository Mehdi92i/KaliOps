import { MANAGEMENT_ROLES, TECHNICAL_ROLES, EARLY_CAREER } from '@/data/cv.mjs';

function Stack({ tools }) {
    if (tools.length === 0) return null;
    return (
        <p className="text-sm text-texte-secondaire mt-1">
            <span className="font-semibold">Stack :</span> {tools.join(' · ')}
        </p>
    );
}

export default function CvExperiences() {
    return (
        <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-lg p-5 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/30 space-y-8">
            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-cv-section mb-6">Expériences professionnelles</h2>
            </div>

            {MANAGEMENT_ROLES.map((role, index) => (
                <div key={role.title}>
                    {index > 0 && (
                        <hr className="border-t-4 border-brand-secondary w-full max-w-64 mx-auto rounded-full my-12" />
                    )}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-texte">{role.title}</h3>
                            <p className="text-sm text-texte-secondaire">{role.period}</p>
                            <p className="text-sm font-semibold text-brand-tertiary mt-1">{role.team}</p>
                            <Stack tools={role.tools} />
                        </div>
                        <div className="space-y-6">
                            {role.blocks.map((block) => (
                                <div key={block.title} className="flex items-start space-x-4">
                                    <div className="p-2 rounded">
                                        <span className="text-2xl" aria-hidden="true">{block.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-texte-secondaire">{block.title}</h4>
                                        <p className="text-texte-secondaire">{block.text}</p>
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
                    <h3 className="text-xl font-semibold text-texte">{EARLY_CAREER.title}</h3>
                    <p className="text-sm text-texte-secondaire">
                        {EARLY_CAREER.note}
                    </p>
                </div>
                {TECHNICAL_ROLES.map((role) => (
                    <div key={role.title} className="flex items-start space-x-4">
                        <div className="p-2 rounded">
                            <span className="text-2xl" aria-hidden="true">🧪</span>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-texte-secondaire">{role.title}</h4>
                            <p className="text-sm text-texte-secondaire">{role.period}</p>
                            <p className="text-texte-secondaire">{role.text}</p>
                            <Stack tools={role.tools} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
