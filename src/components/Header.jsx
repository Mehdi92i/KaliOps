'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BugHuntGame from '@/components/game/BugHuntGame';
import { SiLinkedin } from 'react-icons/si';
import { social } from '@/config/assets';

export default function Header() {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Accueil' },
        { href: '/services', label: 'Mes Services' },
        { href: '/cv', label: 'CV' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <header className="sticky top-0 z-40 bg-white border-b border-white/20 shadow-sm">
            <div className="max-w-screen-xl mx-auto">
                {/* Mobile : logo + actions sur la 1re ligne, liens sur la 2e. À partir de md : une seule ligne. */}
                <nav className="flex flex-wrap md:flex-nowrap items-center justify-between gap-y-1 px-4 sm:px-6 py-2 md:py-4">
                    <Link href="/" className="font-heading text-2xl sm:text-3xl font-bold">
                        <span className="text-brand-primary">Kali</span>
                        {/* Cuivre sur blanc : 3,7 — conforme AA en gros texte gras uniquement */}
                        <span className="text-kali-cuivre">Ops</span>
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-3 md:ml-auto">
                        <BugHuntGame />

                        <a
                            href={social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Voir mon profil LinkedIn"
                            className="w-11 h-11 md:w-9 md:h-9 shrink-0 flex items-center justify-center rounded-full bg-white hover:bg-linkedin-bg-hover shadow text-linkedin hover:text-linkedin-hover transition-transform transform hover:scale-110"
                        >
                            <SiLinkedin className="w-5 h-5" />
                        </a>
                    </div>

                    <div className="w-full md:w-auto md:ml-6 flex justify-center gap-1 sm:gap-3 items-center text-sm font-semibold">
                        {links
                            .filter(link => link.href !== pathname)
                            .map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="min-h-11 md:min-h-0 flex items-center px-3 sm:px-4 py-2 rounded-lg bg-transparent hover:bg-nav-hover-bg text-brand-primary hover:text-brand-tertiary transition-colors duration-200 whitespace-nowrap"
                                >
                                    {link.label}
                                </Link>
                            ))}
                    </div>
                </nav>
            </div>
        </header>
    );
}
