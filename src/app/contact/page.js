import ContactForm from '@/components/contact/ContactForm';
import { pageMetadata } from '@/config/site.mjs';

export const metadata = pageMetadata({
    title: 'Contact : parlons de votre qualité logicielle',
    description:
        "Un projet d'audit qualité, d'automatisation des tests, de QAOps ou de formation ? Contactez Mehdi Tassi, Head of QA chez KaliOps.",
    path: '/contact',
});

export default function Contact() {
    return (
        <div className="relative w-full">
            {/* Fond dégradé harmonisé */}
            <div className="fixed inset-0 -z-10 page-gradient" />

            {/* Mobile : titre puis formulaire empilés. Grand écran : côte à côte pour tenir dans l'écran. */}
            <div className="w-full max-w-screen-xl mx-auto px-6 lg:px-12 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center justify-items-center">
                {/* Bloc titre + accroche */}
                <div className="bg-white/90 backdrop-blur-sm border border-white/30 shadow-lg rounded-lg p-6 sm:p-10 text-center lg:text-left space-y-6 max-w-2xl">
                    <h1 className="text-3xl md:text-5xl font-bold">
                        <span className="text-brand-primary">Envie de</span>{' '}
                        <span className="text-kali-cuivre">collaborer</span> ?
                    </h1>
                    <p className="text-lg md:text-xl text-texte-secondaire">
                        Que ce soit pour un accompagnement QA, un audit, je suis à votre écoute. Parlons qualité et adaptons votre besoin.
                    </p>
                </div>

                {/* Formulaire centré dans un bloc harmonisé */}
                <div className="w-full flex justify-center">
                    <div className="bg-white/90 backdrop-blur-sm border border-white/30 shadow-lg rounded-lg p-3 sm:p-6 w-full max-w-xl">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
