'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const services = [
        {
            id: 'strategie',
            icon: '🎯',
            color: 'text-brand-primary',
            title: 'Stratégie QA & KPI',
            description:
                "Je commence par un audit de maturité QA : processus, couverture, outillage et organisation. J'en tire une stratégie et une roadmap qualité concrètes, puis je mets en place un pilotage data-driven : taux de fuite des anomalies, couverture et part automatisée, délais de recette, stabilité de la CI. Vous décidez sur des chiffres, ROI de l'automatisation compris.",
        },
        {
            id: 'tests',
            icon: '🧪',
            color: 'text-brand-tertiary',
            title: 'Tests automatisés & IA',
            description:
                "Je conçois ou fais évoluer votre architecture de tests E2E, API et performance (Playwright, Cypress, K6, Postman), en automatisant là où le retour sur investissement est réel. J'y ajoute l'IA : des agents qui challengent les tickets Jira pour en tirer critères d'acceptation et scénarios Gherkin, et une assistance au débogage des tests.",
        },
        {
            id: 'qaops',
            icon: '⚙️',
            color: 'text-brand-primary',
            title: 'CI/CD & QAOps',
            description:
                "Je connecte vos tests aux pipelines (GitHub Actions, GitLab CI, Bitbucket Pipelines) pour qu'ils tournent à chaque changement, avec des contrôles de non-régression et de sécurité. Développeurs et PO s'approprient la qualité : elle devient une étape naturelle du delivery, et non un goulot d'étranglement en fin de sprint.",
        },
        {
            id: 'accompagnement',
            icon: '🧭',
            color: 'text-brand-tertiary',
            title: 'Accompagnement Head of QA',
            description:
                "Pas encore de responsable QA, ou besoin d'un renfort ? J'interviens comme Head of QA à temps partagé : structuration ou création de l'équipe, recrutement, coaching des QA, pilotage des prestataires et représentation de la qualité auprès de la direction. L'objectif : une équipe autonome et une qualité durable.",
        },
];

export default function Services() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const target = hash.substring(1);
            const index = services.findIndex((s) => s.id === target);
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
                        J&apos;accompagne les équipes tech de la stratégie à l&apos;outillage : direction QA, pilotage par
                        les KPI, automatisation, QAOps et IA. Voici comment je peux vous aider :
                    </p>
                </div>

                <div className="w-full max-w-[600px] flex items-center justify-center gap-2 sm:gap-4">
                    <button
                        onClick={() => setCurrentSlide((prev) => (prev === 0 ? services.length - 1 : prev - 1))}
                        className="shrink-0 p-2.5 bg-white/80 rounded-full shadow-md hover:bg-white cursor-pointer"
                    >
                        <ChevronLeft className="w-6 h-6 text-brand-primary" />
                    </button>

                    <div
                        key={services[currentSlide].id}
                        id={services[currentSlide].id}
                        className="cursor-default bg-white/90 rounded-xl p-5 sm:p-8 shadow-lg hover:shadow-xl text-center space-y-4 flex-1 min-w-0 max-w-[500px] transition-all duration-500 ease-in-out opacity-0 animate-fade-in"
                    >
                        <div className={`text-5xl ${services[currentSlide].color}`}>
                            {services[currentSlide].icon}
                        </div>
                        <h3 className={`text-2xl font-bold ${services[currentSlide].color}`}>
                            {services[currentSlide].title}
                        </h3>
                        <p className="text-texte-secondaire text-base">
                            {services[currentSlide].description}
                        </p>
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
                        Discutons de vos enjeux qualité : audit ponctuel, mission de Head of QA à temps partagé ou mise en place de votre automatisation.
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
