import { pageMetadata } from '@/config/site.mjs';

// La page Services est un composant client (carousel) : ses métadonnées sont déclarées dans ce layout
export const metadata = pageMetadata({
    title: 'Services QA : stratégie, QAOps, IA et formation',
    description:
        "Stratégie QA et KPI qualité, industrialisation des tests, CI/CD & QAOps, IA appliquée aux tests, formation des équipes et Head of QA à temps partagé.",
    path: '/services',
});

export default function ServicesLayout({ children }) {
    return children;
}
