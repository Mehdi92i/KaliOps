// Ordre volontaire : management d'abord, puis gouvernance, puis expertise technique
const GROUPES = [
    {
        titre: 'Leadership & management',
        items: [
            '🏗️ Création d’équipes QA',
            '👥 Recrutement & onboarding',
            '🎯 Coaching & montée en compétences',
            '🧭 Objectifs individuels & entretiens annuels',
            '🤝 Pilotage de prestataires',
            '💬 Communication inter-équipes',
        ],
    },
    {
        titre: 'Stratégie & gouvernance qualité',
        items: [
            '🗺️ Roadmap & budget QA',
            '📊 KPI qualité data-driven',
            '💰 ROI de l’automatisation',
            '🏛️ Comités stratégiques',
            '📅 Agilité (Scrum, Kanban) / Cycle en V',
            '🧠 Amélioration continue',
        ],
    },
    {
        titre: 'Expertise technique',
        items: [
            '🔁 Automatisation E2E & API',
            '⚡ Tests de performance & de charge',
            '🔄 CI/CD & QAOps',
            '🔒 Tests de sécurité',
            '🤖 IA appliquée à la QA',
            '📝 Stratégie de tests manuels',
        ],
    },
];

export default function CvSkills() {
    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-5 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/30">
            <h2 className="text-2xl font-bold text-cv-section mb-6 text-center">Compétences</h2>
            <div className="space-y-6 text-left">
                {GROUPES.map((groupe) => (
                    <div key={groupe.titre}>
                        <h3 className="text-lg font-semibold text-texte mb-2">{groupe.titre}</h3>
                        <ul className="list-none space-y-1 text-texte text-sm">
                            {groupe.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
                <p className="text-sm font-semibold text-brand-tertiary">🎓 Certification ISTQB Foundation</p>
            </div>
        </div>
    );
}
