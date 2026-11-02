// Postes de management : Leadership → leviers techniques → résultats
const POSTES_MANAGEMENT = [
    {
        titre: 'Head of QA – MEDIN+',
        periode: 'Depuis novembre 2023',
        equipe: 'Chapter de 6 à 10 QA (internes et prestataires)',
        outils: ['Cypress', 'K6', 'Postman', 'Bitbucket Pipelines', 'GitLab CI', 'Claude (Anthropic)', 'Xray', 'Grafana', 'Excel (KPI)'],
        blocs: [
            {
                icone: '🧭',
                titre: 'Leadership',
                texte: "Création et direction du Chapter QA. Membre des comités stratégiques, porte la roadmap et le budget qualité, pilote les prestataires. Recrutement, objectifs individuels et entretiens annuels.",
            },
            {
                icone: '📊',
                titre: 'Pilotage data-driven',
                texte: "Maturité de pilotage par les KPI, suivis par la direction : taux de fuite des anomalies en production, couverture et part automatisée, délais de recette et de TNR, stabilité de la CI (tests instables). ROI des tests automatisés démontré pour arbitrer les investissements. Tableaux de bord Jira (JQL), Xray et Grafana.",
            },
            {
                icone: '🤖',
                titre: 'Leviers techniques & IA',
                texte: "Stratégie de tests de bout en bout (E2E, API, performance K6) intégrée à la CI Bitbucket. Création d'agents IA (Anthropic Claude) qui challengent les tickets Jira pour en dériver critères d'acceptation et scénarios Gherkin ; IA appliquée au débogage des tests automatisés E2E et K6.",
            },
            {
                icone: '🚀',
                titre: 'Résultats',
                texte: "TNR fortement accélérée, baisse des bugs en production, culture QAOps adoptée par les développeurs et les PO : la qualité est intégrée au delivery des squads.",
            },
        ],
    },
    {
        titre: 'Responsable QA – Skilleos',
        periode: 'Juillet 2021 – 2023',
        equipe: 'Création du pôle QA · équipe de 4 QA',
        outils: ['Cypress', 'K6', 'Postman', 'GitLab CI'],
        blocs: [
            {
                icone: '🧭',
                titre: 'Leadership',
                texte: "Création du pôle QA de zéro, recrutement et management de l'équipe, référent qualité des squads Agile.",
            },
            {
                icone: '🛠️',
                titre: 'Leviers techniques',
                texte: "Stratégie qualité, bibliothèque de tests automatisés web et mobile intégrée en CI/CD avec l'équipe DevOps, tests de performance et de charge sur les environnements critiques.",
            },
            {
                icone: '🚀',
                titre: 'Résultats',
                texte: "Releases plus fréquentes, recette accélérée, moins de bugs en production. Migration du framework mobile Android/iOS sécurisée.",
            },
        ],
    },
    {
        titre: 'Lead QA – FlexyBeauty/Kiute',
        periode: 'Décembre 2018 – Juillet 2021',
        equipe: 'Pôle de 6 à 10 personnes (QA et support N2)',
        outils: ['Katalon', 'Appium', 'JMeter', 'Postman', 'Bitbucket Pipelines'],
        blocs: [
            {
                icone: '🧭',
                titre: 'Leadership',
                texte: "Création et direction du pôle QA et de l'équipe support N2. Recrutement, montée en compétences, acculturation qualité des équipes.",
            },
            {
                icone: '🛠️',
                titre: 'Leviers techniques',
                texte: "Architecture des tests automatisés web et mobile, tests API, de charge et de performance, intégration en CI/CD avec l'équipe Infra.",
            },
            {
                icone: '🚀',
                titre: 'Résultats',
                texte: "Releases plus fréquentes, recette plus rapide, moins de bugs en production. Partenariat Google « Reserve with Google » validé et mis en production.",
            },
        ],
    },
];

// Débuts : expertise technique qui fonde la crédibilité du manager
const PARCOURS_TECHNIQUE = [
    {
        titre: 'QA Test Automation Engineer – Aviva',
        periode: 'Septembre 2017 – Novembre 2018',
        outils: ['UFT One', 'HP Quality Center'],
        texte: "Référent technique de l'équipe QA : architecture et stratégie de tests, automatisation E2E web et AS400, chiffrage et planification des campagnes.",
    },
    {
        titre: 'Chef de projet Test Junior – AXA Banque',
        periode: 'Septembre 2015 – Septembre 2017',
        outils: ['Robot Framework', 'Selenium', 'SoapUI'],
        texte: "POC et choix des technologies, automatisation des tests web, mobile et API, tests de charge et de performance, intégration des tests en CI/CD.",
    },
];

function Stack({ outils }) {
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
                    <h3 className="text-xl font-semibold text-texte">Parcours technique · 2015 – 2018</h3>
                    <p className="text-sm text-texte-secondaire">
                        L&apos;expertise en automatisation qui fonde mon approche du management de la qualité.
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
