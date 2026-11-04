import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'KaliOps · Mehdi Tassi — Head of QA & conseil qualité logicielle',
    description:
        'Mehdi Tassi, Head of QA : direction QA à temps partagé, stratégie et KPI qualité, formation des équipes, automatisation et QAOps, IA appliquée aux tests.',
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
