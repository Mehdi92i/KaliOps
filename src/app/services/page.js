'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const services = [
        {
            id: 'strategie',
            icon: '🎯',
            color: 'text-brand-secondary',
            title: 'Stratégie QA',
            description:
                "Une démarche qualité efficace commence par une stratégie claire. J'analyse votre contexte produit, vos contraintes d'équipe, et je vous propose un plan d'action QA concret : rôles, types de tests, niveaux de validation, choix d'outils, KPIs et organisation.",
        },
        {
            id: 'tests',
            icon: '🧪',
            color: 'text-brand-tertiary',
            title: 'Tests automatisés',
            description:
                "J'implémente ou optimise vos tests E2E, API et performance. Je travaille avec des outils comme Cypress, Postman ou K6. Je vous aide à automatiser intelligemment pour accélérer le feedback et fiabiliser les déploiements.",
        },
        {
            id: 'qaops',
            icon: '⚙️',
            color: 'text-brand-primary',
            title: 'CI/CD & QAOps',
            description:
                "Je connecte vos tests aux pipelines CI/CD pour qu'ils tournent en continu et en automatique. J'optimise la chaîne de validation (Bitbucket Pipelines, GitHub Actions, GitLab CI...) pour accélérer vos mises en production et renforcer la confiance dans les livraisons.",
        },
        {
            id: 'accompagnement',
            icon: '🤝',
            color: 'text-brand-secondary',
            title: 'Accompagnement',
            description:
                "Que ce soit pour un audit QA, du coaching de testeurs, ou pour formaliser votre référentiel de tests, je vous accompagne avec des pratiques adaptées à votre structure et vos outils. Mon but est de vous rendre autonomes sur votre qualité.",
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
        <div className="relative w-full min-h-screen">
            <div className="fixed inset-0 -z-10 page-gradient" />

            <div className="w-full max-w-screen-xl mx-auto px-6 lg:px-12 py-20 flex flex-col items-center space-y-16">
                <div className="bg-white/90 backdrop-blur-sm border border-white/30 shadow-lg rounded-lg p-10 text-center space-y-6 max-w-2xl">
                    <h1 className="text-3xl md:text-5xl font-bold">
                        <span className="text-brand-primary">Mes</span>{' '}
                        <span className="text-brand-secondary">services</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700">
                        J&apos;accompagne les équipes tech à construire une démarche qualité moderne, fluide et efficace.
                        Voici comment je peux vous aider :
                    </p>
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setCurrentSlide((prev) => (prev === 0 ? services.length - 1 : prev - 1))}
                        className="p-2 bg-white/80 rounded-full shadow-md hover:bg-white cursor-pointer"
                    >
                        <ChevronLeft className="w-6 h-6 text-brand-primary" />
                    </button>

                    <div
                        key={services[currentSlide].id}
                        id={services[currentSlide].id}
                        className="cursor-default bg-white/90 rounded-xl p-8 shadow-lg hover:shadow-xl text-center space-y-4 w-[320px] sm:w-[400px] md:w-[500px] transition-all duration-500 ease-in-out opacity-0 animate-fade-in"
                    >
                        <div className={`text-5xl ${services[currentSlide].color}`}>
                            {services[currentSlide].icon}
                        </div>
                        <h3 className={`text-2xl font-bold ${services[currentSlide].color}`}>
                            {services[currentSlide].title}
                        </h3>
                        <p className="text-gray-700 text-base">
                            {services[currentSlide].description}
                        </p>
                    </div>

                    <button
                        onClick={() => setCurrentSlide((prev) => (prev === services.length - 1 ? 0 : prev + 1))}
                        className="p-2 bg-white/80 rounded-full shadow-md hover:bg-white cursor-pointer"
                    >
                        <ChevronRight className="w-6 h-6 text-brand-primary" />
                    </button>
                </div>

                <div className="pt-10 text-center space-y-4">
                    <p className="text-md md:text-lg text-white">
                        Discutons ensemble de vos besoins QA, que ce soit pour un accompagnement ponctuel ou une mission plus stratégique.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold px-8 py-3 rounded shadow-md transition"
                    >
                        Me contacter
                    </a>
                </div>
            </div>
        </div>
    );
}
