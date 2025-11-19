import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer'; // ➔ on importe ton Footer

export const metadata = {
    title: 'KaliOps- Tassi Mehdi - Expert QA',
    description: 'Optimisez votre qualité logicielle et structurez vos Design Systems avec KaliOps.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
        <body className="bg-yellow-50 text-gray-800 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 w-full flex flex-col items-center py-8 px-4">
            {children}
        </main>
        <Footer />
        </body>
        </html>
    );
}
