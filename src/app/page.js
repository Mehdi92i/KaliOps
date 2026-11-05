import Link from 'next/link';
import RecommendationCarousel from '@/components/ui/RecommendationCarousel';
import { SITE_URL, SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION, OG_IMAGE, pageMetadata } from '@/config/site.mjs';
import { images, social } from '@/config/assets';

export const metadata = pageMetadata({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: '/',
    absoluteTitle: true,
});

// Données structurées : indiquent à Google que KaliOps est un service de conseil porté par Mehdi Tassi
const STRUCTURED_DATA = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    image: `${SITE_URL}${OG_IMAGE.url}`,
    logo: `${SITE_URL}${images.logoHorizontal}`,
    areaServed: 'FR',
    sameAs: [social.linkedin],
    knowsAbout: ['Stratégie QA', 'KPI qualité', 'Automatisation des tests', 'QAOps', 'IA appliquée aux tests', 'Formation QA'],
    founder: {
        '@type': 'Person',
        name: 'Mehdi Tassi',
        jobTitle: 'Head of QA',
        url: `${SITE_URL}/cv`,
        sameAs: [social.linkedin],
    },
};

export default function Home() {
    return (
        <div className="relative w-full">
            <script
                type="application/ld+json"
                // Contenu statique défini ci-dessus, aucune donnée utilisateur
                dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
            />
            <div className="fixed inset-0 -z-10 page-gradient" />

            <div className="w-full max-w-screen-xl mx-auto px-6 lg:px-12 py-6 md:py-8 flex flex-col items-center space-y-8 md:space-y-10">
                <div className="bg-white/90 backdrop-blur-sm border border-white/30 shadow-lg rounded-lg p-6 sm:p-10 text-center space-y-6 max-w-2xl">
                    <h1 className="text-3xl md:text-5xl font-bold">
                        Structurer la <span className="text-kali-cuivre">qualité</span>. <br />
                        Accélérer le <span className="text-kali-cuivre">delivery</span>.
                    </h1>

                    <p className="text-lg md:text-xl text-texte-secondaire">
                        Bienvenue chez{' '}
                        <span className="text-brand-primary">Kali</span>
                        <span className="text-brand-tertiary">Ops</span> : un Head of QA à vos côtés pour
                        structurer votre démarche qualité — stratégie, équipes, KPI — et l&apos;outiller avec
                        l&apos;automatisation, la CI/CD et l&apos;IA.
                    </p>

                    <p className="italic text-texte mt-4 text-center">
                        ➜ Vous voulez intégrer / fiabiliser votre qualité logicielle ?
                        Contactez-moi.
                    </p>
                </div>

                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full max-w-5xl px-4">
                    <Link
                        href="/services#strategie"
                        className="bg-white/90 text-brand-primary rounded-2xl p-6 shadow-lg text-center flex flex-col items-center hover:scale-105 transition-transform duration-300"
                    >
                        <span className="text-4xl mb-2">🎯</span>
                        <h3 className="font-bold text-lg">Stratégie QA & gouvernance</h3>
                        <p className="text-sm text-texte-secondaire mt-1">Audit de maturité, roadmap, KPI</p>
                    </Link>

                    <Link
                        href="/services#tests"
                        className="bg-white/90 text-brand-tertiary rounded-2xl p-6 shadow-lg text-center flex flex-col items-center hover:scale-105 transition-transform duration-300"
                    >
                        <span className="text-4xl mb-2">🧪</span>
                        <h3 className="font-bold text-lg">Industrialisation des tests</h3>
                        <p className="text-sm text-texte-secondaire mt-1">Manuels, automatisés, sécurité, design system</p>
                    </Link>

                    <Link
                        href="/services#qaops"
                        className="bg-white/90 text-brand-primary rounded-2xl p-6 shadow-lg text-center flex flex-col items-center hover:scale-105 transition-transform duration-300"
                    >
                        <span className="text-4xl mb-2">⚙️</span>
                        <h3 className="font-bold text-lg">CI/CD & QAOps</h3>
                        <p className="text-sm text-texte-secondaire mt-1">La qualité intégrée au delivery</p>
                    </Link>

                    <Link
                        href="/services#ia"
                        className="bg-white/90 text-brand-tertiary rounded-2xl p-6 shadow-lg text-center flex flex-col items-center hover:scale-105 transition-transform duration-300"
                    >
                        <span className="text-4xl mb-2">🤖</span>
                        <h3 className="font-bold text-lg">IA</h3>
                        <p className="text-sm text-texte-secondaire mt-1">Agents sur mesure, automatisation</p>
                    </Link>

                    <Link
                        href="/services#formation"
                        className="bg-white/90 text-brand-primary rounded-2xl p-6 shadow-lg text-center flex flex-col items-center hover:scale-105 transition-transform duration-300"
                    >
                        <span className="text-4xl mb-2">🎓</span>
                        <h3 className="font-bold text-lg">Formation & coaching</h3>
                        <p className="text-sm text-texte-secondaire mt-1">QA, devs, managers, écoles</p>
                    </Link>

                    <Link
                        href="/services#accompagnement"
                        className="bg-white/90 text-brand-tertiary rounded-2xl p-6 shadow-lg text-center flex flex-col items-center hover:scale-105 transition-transform duration-300"
                    >
                        <span className="text-4xl mb-2">🧭</span>
                        <h3 className="font-bold text-lg">Accompagnement Head of QA</h3>
                        <p className="text-sm text-texte-secondaire mt-1">Direction QA à temps partagé</p>
                    </Link>
                </section>

                <div className="flex flex-wrap justify-center gap-6">
                    <Link
                        href="/services"
                        className="bg-white/80 text-brand-tertiary font-semibold px-6 py-3 rounded-full shadow-md hover:bg-white transition"
                    >
                        En savoir plus
                    </Link>
                    <Link
                        href="/cv"
                        className="bg-brand-secondary text-kali-noir font-semibold px-6 py-3 rounded-full shadow-md hover:bg-brand-secondary-hover transition"
                    >
                        Voir mon CV
                    </Link>
                    <Link
                        href="/contact"
                        className="bg-white/80 text-brand-primary font-semibold px-6 py-3 rounded-full shadow-md hover:bg-white transition"
                    >
                        Me contacter
                    </Link>
                </div>
            </div>
            <RecommendationCarousel />
        </div>
    );
}
