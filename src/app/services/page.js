'use client';

import { useEffect, useState } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

// Chaque service : une accroche (le bénéfice) puis quelques points concrets
const services = [
        {
            id: 'strategie',
            icon: '🎯',
            color: 'text-brand-primary',
            title: 'Stratégie QA & gouvernance',
            tagline: 'Un cadre qualité clair, piloté par les chiffres.',
            points: [
                'Audit de maturité : processus, équipes, outillage',
                'Stratégie et roadmap QA alignées sur vos enjeux produit',
                'Gouvernance et rituels de pilotage',
                "KPI suivis par la direction et ROI de l'automatisation",
            ],
        },
        {
            id: 'tests',
            icon: '🧪',
            color: 'text-brand-tertiary',
            title: 'Industrialisation des tests',
            tagline: "Des tests fiables, du manuel à l'automatisé.",
            points: [
                'Référentiel et campagnes de tests manuels structurés',
                'Automatisation E2E, API et performance là où le ROI est réel',
                'Tests de sécurité : en-têtes HTTP, XSS, robustesse des API',
                'Validation de design system : chaque composant vérifié contre la charte (typographies, couleurs, espacements, accessibilité)',
                'TNR fiabilisée pour livrer plus vite et plus sereinement',
            ],
        },
        {
            id: 'qaops',
            icon: '⚙️',
            color: 'text-brand-primary',
            title: 'CI/CD & QAOps',
            tagline: 'La qualité intégrée à chaque livraison.',
            points: [
                'Vos tests branchés sur les pipelines, à chaque changement',
                'Contrôles de non-régression et de sécurité automatiques',
                'Développeurs et PO acteurs de la qualité',
                "Fini le goulot d'étranglement en fin de sprint",
            ],
        },
        {
            id: 'ia',
            icon: '🤖',
            color: 'text-brand-tertiary',
            title: 'IA',
            tagline: "L'IA générative au service de vos équipes.",
            points: [
                'Agents sur mesure et automatisation de tâches',
                "Critères d'acceptation et scénarios Gherkin générés depuis vos tickets Jira",
                'Assistance au développement, aux tests et au débogage',
                "Cas d'usage ciblés, déployés avec des garde-fous",
            ],
        },
        {
            id: 'formation',
            icon: '🎓',
            color: 'text-brand-primary',
            title: 'Formation & coaching',
            tagline: 'Des équipes autonomes sur la qualité.',
            points: [
                "Coaching d'équipe au quotidien",
                'Formations : automatisation des tests, QAOps et CI/CD, IA',
                'Contenus adaptés : QA, développeurs et PO, managers et direction',
                'Interventions en écoles et organismes de formation',
            ],
        },
        {
            id: 'accompagnement',
            icon: '🧭',
            color: 'text-brand-tertiary',
            title: 'Accompagnement Head of QA',
            tagline: 'Un Head of QA à temps partagé, sans recrutement.',
            points: [
                "Structuration ou création de l'équipe QA",
                'Recrutement, objectifs et entretiens annuels',
                'Pilotage des prestataires et du budget qualité',
                'La qualité représentée en comité de direction',
            ],
        },
];

export default function Services() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const target = hash.substring(1);
            const index = services.findIndex((s) => s.id === target);
            // Synchronisation avec l'ancre de l'URL (#ia…), lisible seulement après le montage
            // eslint-disable-next-line react-hooks/set-state-in-effect
            if (index !== -1) setCurrentSlide(index);
            const element = document.getElementById(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, []);

    return (
        // flex-1 + justify-center : centre le contenu verticalement quand l'écran est plus haut que la page
        <div className="relative w-full flex-1 flex flex-col justify-center">
            <div className="fixed inset-0 -z-10 page-gradient" />

            <div className="w-full max-w-screen-xl mx-auto px-6 lg:px-12 py-6 md:py-8 flex flex-col items-center space-y-8 md:space-y-10">
                <div className="bg-white/90 backdrop-blur-sm border border-white/30 shadow-lg rounded-lg p-6 sm:p-10 text-center space-y-6 max-w-2xl">
                    <h1 className="text-3xl md:text-5xl font-bold">
                        <span className="text-brand-primary">Mes</span>{' '}
                        <span className="text-kali-cuivre">services</span>
                    </h1>
                    <p className="text-lg md:text-xl text-texte-secondaire">
                        J&apos;accompagne les organisations tech de la stratégie à l&apos;outillage : direction et gouvernance
                        QA, pilotage par les KPI, formation des équipes, sans perdre le lien avec la technique —
                        automatisation, QAOps et IA. Voici comment je peux vous aider :
                    </p>
                </div>

                <div className="w-full max-w-[980px] flex flex-wrap sm:flex-nowrap items-center justify-center gap-4">
                    <button
                        onClick={() => setCurrentSlide((prev) => (prev === 0 ? services.length - 1 : prev - 1))}
                        className="shrink-0 p-2.5 bg-white/80 rounded-full shadow-md hover:bg-white cursor-pointer"
                    >
                        <ChevronLeft className="w-6 h-6 text-brand-primary" />
                    </button>

                    <div
                        key={services[currentSlide].id}
                        id={services[currentSlide].id}
                        className="cursor-default bg-white/90 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl basis-full sm:basis-auto order-last sm:order-none flex-1 min-w-0 max-w-[860px] flex flex-col transition-all duration-500 ease-in-out opacity-0 animate-fade-in"
                    >
                        {/* En-tête en haut de la carte : icône et titre, un filet ocre, puis l'accroche */}
                        <div className="text-center">
                            <span className="block text-4xl sm:text-5xl" aria-hidden="true">{services[currentSlide].icon}</span>
                            <h3 className={`mt-2 text-xl sm:text-2xl font-bold ${services[currentSlide].color}`}>
                                {services[currentSlide].title}
                            </h3>
                            <span className="block mx-auto my-3 h-1 w-12 rounded-full bg-brand-secondary" aria-hidden="true" />
                            <p className="text-texte-secondaire font-medium">{services[currentSlide].tagline}</p>
                        </div>

                        <ul className="mt-10 space-y-2.5 text-left">
                            {services[currentSlide].points.map((point) => (
                                <li key={point} className="flex items-start gap-2.5 text-texte">
                                    <Check className="w-5 h-5 shrink-0 mt-0.5 text-brand-tertiary" aria-hidden="true" />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>

                    </div>

                    <button
                        onClick={() => setCurrentSlide((prev) => (prev === services.length - 1 ? 0 : prev + 1))}
                        className="shrink-0 p-2.5 bg-white/80 rounded-full shadow-md hover:bg-white cursor-pointer"
                    >
                        <ChevronRight className="w-6 h-6 text-brand-primary" />
                    </button>
                </div>

                <div className="pt-2 text-center space-y-4">
                    <p className="text-md md:text-lg text-white">
                        Discutons de vos enjeux qualité : audit ponctuel, Head of QA à temps partagé, formation de vos équipes ou mise en place de votre automatisation.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-brand-secondary hover:bg-brand-secondary-hover text-kali-noir font-semibold px-8 py-3 rounded-full shadow-md transition"
                    >
                        Me contacter
                    </a>
                </div>
            </div>
        </div>
    );
}
