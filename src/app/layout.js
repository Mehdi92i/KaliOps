import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_URL, SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION, pageMetadata } from '@/config/site.mjs';

export const metadata = {
    // Base des URL relatives (canonical, Open Graph) : toujours le domaine officiel, y compris sur les déploiements de recette
    metadataBase: new URL(SITE_URL),
    // Aperçu de partage par défaut ; chaque page définit ensuite son titre, sa description et son URL canonique
    ...pageMetadata({ title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, path: '/', absoluteTitle: true }),
    alternates: undefined,
    // Titre des pages : « Services QA … · KaliOps »
    title: { default: DEFAULT_TITLE, template: `%s · ${SITE_NAME}` },
    authors: [{ name: 'Mehdi Tassi' }],
    keywords: [
        'Head of QA',
        'QA Manager',
        'Quality Assurance',
        'Stratégie QA',
        'KPI qualité',
        'QAOps',
        'Automatisation des tests',
        'IA appliquée aux tests',
        'Formation QA',
        'Freelance QA',
    ],
};

export default function RootLayout({ children }) {
    return (
        // suppressHydrationWarning : ignore les attributs ajoutés sur <html> par des extensions (LanguageTool…)
        <html lang="fr" suppressHydrationWarning>
        <body className="bg-background text-foreground flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 w-full flex flex-col items-center py-4 px-4">
            {children}
        </main>
        <Footer />
        {/* Vercel Web Analytics : visites et pages vues, sans cookies (plan Hobby gratuit) */}
        <Analytics />
        </body>
        </html>
    );
}
