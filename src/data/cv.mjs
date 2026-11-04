// Contenu du CV : source unique pour la page /cv et pour le PDF (scripts/generate-cv-pdf.mjs).
// Fichier .mjs pour pouvoir être importé aussi bien par Next.js que par Node.

// Coordonnées : affichées uniquement dans le PDF, pas sur les pages du site
export const CONTACT = {
    name: 'Mehdi Tassi',
    email: 'mehdi.tassi.pro@gmail.com',
    phone: '06 52 60 69 87',
    site: 'https://kaliops.vercel.app/',
    linkedin: 'https://www.linkedin.com/in/mehdi-t-4505a38b/',
};

export const INTRO = {
    title: 'Head of QA',
    tagline:
        "10 ans de qualité logicielle, dont 7 à créer et diriger des équipes QA. Je structure la qualité à l'échelle de l'organisation — stratégie, équipes, KPI, ROI — tout en gardant une forte expertise technique : automatisation, CI/CD, performance et IA.",
};

// Expériences principales, la plus récente en premier : activité KaliOps puis postes de management
// (Leadership → leviers techniques → résultats). `outils` peut être vide.
export const MANAGEMENT_ROLES = [
    {
        title: 'Fondateur & formateur Tech – KaliOps',
        period: 'Depuis octobre 2025',
        team: 'Activité indépendante',
        tools: [],
        blocks: [
            {
                icon: '🎓',
                title: 'Enseignement',
                text: "Intervenant au CESI et à l'EPSI : cours sur la qualité logicielle et les pratiques tech.",
            },
            {
                icon: '🏛️',
                title: 'Jurys',
                text: "Membre de jury pour l'évaluation des étudiants.",
            },
        ],
    },
    {
        title: 'Head of QA – MEDIN+',
        period: 'Depuis novembre 2023',
        team: 'Chapter de 6 à 10 QA (internes et prestataires)',
        tools: ['Cypress', 'K6', 'Postman', 'Bitbucket Pipelines', 'GitLab CI', 'Claude (Anthropic)', 'Xray', 'Grafana', 'Excel (KPI)'],
        blocks: [
            {
                icon: '🧭',
                title: 'Leadership',
                text: "Création et direction du Chapter QA. Membre des comités stratégiques, porte la roadmap et le budget qualité, pilote les prestataires. Recrutement, objectifs individuels et entretiens annuels.",
            },
            {
                icon: '📊',
                title: 'Pilotage data-driven',
                text: "Maturité de pilotage par les KPI, suivis par la direction : taux de fuite des anomalies en production, couverture et part automatisée, délais de recette et de TNR, stabilité de la CI (tests instables). ROI des tests automatisés démontré pour arbitrer les investissements. Tableaux de bord Jira (JQL), Xray et Grafana.",
            },
            {
                icon: '🤖',
                title: 'Leviers techniques & IA',
                text: "Stratégie de tests de bout en bout (E2E, API, performance K6) intégrée à la CI Bitbucket. Création d'agents IA (Anthropic Claude) qui challengent les tickets Jira pour en dériver critères d'acceptation et scénarios Gherkin ; IA appliquée au débogage des tests automatisés E2E et K6.",
            },
            {
                icon: '🚀',
                title: 'Résultats',
                text: "TNR fortement accélérée, baisse des bugs en production, culture QAOps adoptée par les développeurs et les PO : la qualité est intégrée au delivery des squads.",
            },
        ],
    },
    {
        title: 'Responsable QA – Skilleos',
        period: 'Juillet 2021 – 2023',
        team: 'Création du pôle QA · équipe de 4 QA',
        tools: ['Cypress', 'K6', 'Postman', 'GitLab CI'],
        blocks: [
            {
                icon: '🧭',
                title: 'Leadership',
                text: "Création du pôle QA de zéro, recrutement et management de l'équipe, référent qualité des squads Agile.",
            },
            {
                icon: '🛠️',
                title: 'Leviers techniques',
                text: "Stratégie qualité, bibliothèque de tests automatisés web et mobile intégrée en CI/CD avec l'équipe DevOps, tests de performance et de charge sur les environnements critiques.",
            },
            {
                icon: '🚀',
                title: 'Résultats',
                text: "Releases plus fréquentes, recette accélérée, moins de bugs en production. Migration du framework mobile Android/iOS sécurisée.",
            },
        ],
    },
    {
        title: 'Lead QA – FlexyBeauty/Kiute',
        period: 'Décembre 2018 – Juillet 2021',
        team: 'Pôle de 6 à 10 personnes (QA et support N2)',
        tools: ['Katalon', 'Appium', 'JMeter', 'Postman', 'Bitbucket Pipelines'],
        blocks: [
            {
                icon: '🧭',
                title: 'Leadership',
                text: "Création et direction du pôle QA et de l'équipe support N2. Recrutement, montée en compétences, acculturation qualité des équipes.",
            },
            {
                icon: '🛠️',
                title: 'Leviers techniques',
                text: "Architecture des tests automatisés web et mobile, tests API, de charge et de performance, intégration en CI/CD avec l'équipe Infra.",
            },
            {
                icon: '🚀',
                title: 'Résultats',
                text: "Releases plus fréquentes, recette plus rapide, moins de bugs en production. Partenariat Google « Reserve with Google » validé et mis en production.",
            },
        ],
    },
];

// Débuts de carrière : la technique, toujours pratiquée, au second plan derrière le management
export const EARLY_CAREER = {
    title: 'Premières expériences · 2015 – 2018',
    note: 'Les fondations techniques de mon parcours — automatisation, performance, CI/CD — que je continue d\'exercer au quotidien.',
};

export const TECHNICAL_ROLES = [
    {
        title: 'QA Test Automation Engineer – Aviva',
        period: 'Septembre 2017 – Novembre 2018',
        tools: ['UFT One', 'HP Quality Center'],
        text: "Référent technique de l'équipe QA : architecture et stratégie de tests, automatisation E2E web et AS400, chiffrage et planification des campagnes.",
    },
    {
        title: 'Chef de projet Test Junior – AXA Banque',
        period: 'Septembre 2015 – Septembre 2017',
        tools: ['Robot Framework', 'Selenium', 'SoapUI'],
        text: "POC et choix des technologies, automatisation des tests web, mobile et API, tests de charge et de performance, intégration des tests en CI/CD.",
    },
];

// Ordre volontaire : management d'abord, puis gouvernance, puis expertise technique
export const SKILLS = [
    {
        title: 'Leadership & management',
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
        title: 'Stratégie & gouvernance qualité',
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
        title: 'Expertise technique',
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
export const TOOLS = [
    {
        title: 'Automatisation & performance',
        tools: ['🎭 Playwright', '🧪 Cypress', '📈 K6', '📮 Postman'],
    },
    {
        title: 'CI/CD & DevOps',
        tools: ['⚙️ GitHub Actions', '🧱 Bitbucket Pipelines', '🦊 GitLab CI', '🐳 Docker'],
    },
    {
        title: 'Langages',
        tools: ['📘 TypeScript', '💻 JavaScript', '🐍 Python'],
    },
    {
        title: 'Pilotage & KPI',
        tools: ['📋 Jira (JQL & dashboards)', '✅ Xray', '📉 Grafana', '📊 Excel'],
    },
    {
        title: 'IA',
        tools: ['🤖 Claude (Anthropic)'],
    },
];

export const HOBBIES = 'Football, Jeux vidéos, Cinéma, Échecs, Astronomie.';
export const INTERESTS = 'Innovation technologique, IA, Développement durable.';
export const TRAVELS = 'Espagne, Maroc, Mexique, Jamaïque, USA, Grèce.';
