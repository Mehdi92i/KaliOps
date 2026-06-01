'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import BugHuntGame from '@/components/game/BugHuntGame';
import { SiLinkedin } from 'react-icons/si';
import { social, images } from '@/config/assets';

export default function Header() {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Accueil' },
        { href: '/services', label: 'Mes Services' },
        { href: '/cv', label: 'CV' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <header className="sticky top-0 z-40 bg-brand-primary shadow-lg">
            <div className="max-w-screen-xl mx-auto">
                <nav className="flex items-center justify-between px-6 py-3">
                    <Link href="/">
                        <Image
                            src={images.logo}
                            alt="KaliOps"
                            height={48}
                            width={120}
                            priority
                            className="object-contain brightness-0 invert"
                        />
                    </Link>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <BugHuntGame />

                            <a
                                href={social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Voir mon profil LinkedIn"
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-brand-secondary transition-all duration-200"
                            >
                                <SiLinkedin className="w-5 h-5" />
                            </a>
                        </div>

                        <div className="flex gap-2 items-center text-sm font-semibold">
                            {links
                                .filter(link => link.href !== pathname)
                                .map(link => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="px-4 py-2 rounded-lg text-white/80 hover:text-brand-secondary hover:bg-white/10 transition-all duration-200"
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
