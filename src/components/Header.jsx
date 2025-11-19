'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BugHuntGame from '@/components/game/BugHuntGame';
import { SiLinkedin } from 'react-icons/si'; // ✅ remplacement

export default function Header() {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Accueil' },
        { href: '/services', label: 'Mes Services' },
        { href: '/cv', label: 'CV' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 border-b border-white/20 shadow-sm">
            <div className="max-w-screen-xl mx-auto">
                <nav className="flex items-center justify-between px-6 py-4">
                    {/* Bloc logo */}
                    <Link href="/" className="text-2xl font-bold">
                        <span className="text-[#002364]">Kali</span>
                        <span className="text-[#D70064]">Ops</span>
                    </Link>

                    {/* Bloc bouton + liens */}
                    <div className="flex items-center gap-6">
                        {/* Bouton jeu + LinkedIn */}
                        <div className="flex items-center gap-3">
                            <BugHuntGame />

                            <a
                                href="https://www.linkedin.com/in/mehdi-t-4505a38b/"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Voir mon profil LinkedIn"
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-white hover:bg-[#e6f0fb] shadow text-[#0A66C2] hover:text-[#084d99] transition-transform transform hover:scale-110"
                            >
                                <SiLinkedin className="w-5 h-5" />
                            </a>
                        </div>

                        {/* Liens à droite */}
                        <div className="flex gap-3 items-center text-sm font-semibold">
                            {links
                                .filter(link => link.href !== pathname)
                                .map(link => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="px-4 py-2 rounded-lg bg-transparent hover:bg-[#fce4ec] text-[#002364] hover:text-[#D70064] transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
