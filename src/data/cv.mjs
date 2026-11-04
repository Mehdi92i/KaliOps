// Contenu du CV : source unique pour la page /cv et pour le PDF (scripts/generate-cv-pdf.mjs).
// Fichier .mjs pour pouvoir être importé aussi bien par Next.js que par Node.

// Coordonnées : affichées uniquement dans le PDF, pas sur les pages du site
export const CONTACT = {
    nom: 'Mehdi Tassi',
    email: 'mehdi.tassi.pro@gmail.com',
    telephone: '06 52 60 69 87',
    site: 'https://kaliops.vercel.app/',
    linkedin: 'https://www.linkedin.com/in/mehdi-t-4505a38b/',
};

export const INTRO = {
    titre: 'Head of QA',
    accroche:
        "10 ans de qualité logicielle, dont 7 à créer et diriger des équipes QA. Je structure la qualité à l'échelle de l'organisation — stratégie, équipes, KPI, ROI — tout en gardant une forte expertise technique : automatisation, CI/CD, performance et IA.",
};

// Expériences principales, la plus récente en premier : activité KaliOps puis postes de management
// (Leadership → leviers techniques → résultats). `outils` peut être vide.
export const POSTES_MANAGEMENT = [
    {
        titre: 'Fondateur & formateur Tech – KaliOps',
        periode: 'Depuis octobre 2025',
        equipe: 'Activité indépendante',
        outils: [],
        blocs: [
            {
                icone: '🎓',
                titre: 'Enseignement',
                texte: "Intervenant au CESI et à l'EPSI : cours sur la qualité logicielle et les pratiques tech.",
            },
            {
                icone: '🏛️',
                titre: 'Jurys',
                texte: "Membre de jury pour l'évaluation des étudiants.",
            },
        ],
    },
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

// Débuts de carrière : la technique, toujours pratiquée, au second plan derrière le management
export const PREMIERES_EXPERIENCES = {
    titre: 'Premières expériences · 2015 – 2018',
    note: 'Les fondations techniques de mon parcours — automatisation, performance, CI/CD — que je continue d\'exercer au quotidien.',
};

export const PARCOURS_TECHNIQUE = [
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

// Ordre volontaire : management d'abord, puis gouvernance, puis expertise technique
export const COMPETENCES = [
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
            '📝 Stratégie de tests',
            '🔁 Automatisation E2E & API',
            '⚡ Tests de performance & de charge',
            '🔄 CI/CD & QAOps',
            '🔒 Tests de sécurité',
            '🤖 IA générative & agents',
        ],
    },
];

export const CERTIFICATION = '🎓 Certification ISTQB Foundation';

// Stack actuelle, par domaine. Les outils plus anciens sont cités dans chaque expérience.
export const OUTILS = [
    {
        titre: 'Automatisation & performance',
        outils: ['🎭 Playwright', '🧪 Cypress', '📈 K6', '📮 Postman'],
    },
    {
        titre: 'CI/CD & DevOps',
        outils: ['⚙️ GitHub Actions', '🧱 Bitbucket Pipelines', '🦊 GitLab CI', '🐳 Docker'],
    },
    {
        titre: 'Langages',
        outils: ['📘 TypeScript', '💻 JavaScript', '🐍 Python'],
    },
    {
        titre: 'Pilotage & KPI',
        outils: ['📋 Jira (JQL & dashboards)', '✅ Xray', '📉 Grafana', '📊 Excel'],
    },
    {
        titre: 'IA',
        outils: ['🤖 Claude (Anthropic)'],
    },
];

export const LOISIRS = 'Football, Jeux vidéos, Cinéma, Échecs, Astronomie.';
export const CENTRES_INTERET = 'Innovation technologique, IA, Développement durable.';
export const VOYAGES = 'Espagne, Maroc, Mexique, Jamaïque, USA, Grèce.';
