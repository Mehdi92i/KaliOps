import { useRef, useState, useEffect } from 'react';
import { sounds } from '@/config/assets';

// Icône « bug » (tracé Lucide) appliquée en masque CSS : elle prend la couleur du token
// (noir sur ocre, 7,8:1) sans ajouter de <svg> au DOM, que les tests des carousels ciblent.
const BUG_ICON_MASK = `url("data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'
    + '<path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/>'
    + '<path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/>'
    + '<path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/>'
    + '<path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/></svg>'
)}") center / contain no-repeat`;

// Tirage aléatoire hors du composant : la règle React Compiler « purity » interdit Math.random dans le rendu
const createBug = () => ({
    id: crypto.randomUUID?.() || Math.random().toString(36).substring(7),
    x: Math.random() * 90,
    y: Math.random() * 90,
    rotation: Math.random() * 360,
});

const BugHuntGame = () => {
    const [isActive, setIsActive] = useState(false);
    const [bugs, setBugs] = useState([]);
    const [score, setScore] = useState(0);
    const [showFinalScore, setShowFinalScore] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    const timeoutRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        // Marqueur d'hydratation volontaire : le jeu ne s'affiche qu'après le montage côté client
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsHydrated(true);
    }, []);

    const startGame = () => {
        setIsActive(true);
        setScore(0);
        setBugs([]);
        setShowFinalScore(false);

        intervalRef.current = setInterval(spawnBug, 800);
        timeoutRef.current = setTimeout(() => {
            stopGame();
        }, 30000);
    };

    const stopGame = () => {
        clearInterval(intervalRef.current);
        clearTimeout(timeoutRef.current);
        setIsActive(false);
        setBugs([]);
        setShowFinalScore(true);
    };

    const spawnBug = () => {
        const bug = createBug();
        setBugs((prev) => [...prev, bug]);
        setTimeout(() => removeBug(bug.id), 5000);
    };

    const removeBug = (id) => {
        setBugs((prev) => prev.filter((bug) => bug.id !== id));
    };

    const hitBug = (id) => {
        removeBug(id);
        setScore((s) => s + 1);
        const audio = new Audio(sounds.bugSquish);
        audio.play();
    };

    useEffect(() => {
        if (showFinalScore) {
            const timer = setTimeout(() => setShowFinalScore(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showFinalScore]);

    return (
        <div className="relative">
            {!isActive && (
                <button
                    onClick={startGame}
                    className="inline-flex items-center gap-1.5 bg-brand-secondary hover:bg-brand-secondary-hover text-kali-noir font-bold text-xs sm:text-base min-h-11 md:min-h-0 py-2 px-3 sm:px-4 rounded-full shadow-xl hover:scale-105 transition whitespace-nowrap"
                >
                    Chasser un bug
                    <span
                        aria-hidden="true"
                        className="inline-block w-4 h-4 sm:w-5 sm:h-5 bg-kali-noir"
                        style={{ mask: BUG_ICON_MASK, WebkitMask: BUG_ICON_MASK }}
                    />
                </button>
            )}

            {showFinalScore && !isActive && isHydrated && (
                <div className="fixed top-[4.5rem] right-4 z-50 bg-white text-brand-primary font-semibold shadow-md px-4 py-2 rounded-full border border-kali-ocre text-sm">
                    🎉 Partie terminée ! Tu as attrapé <span className="font-bold text-brand-tertiary">{score}</span> bugs !
                </div>
            )}

            {isActive && isHydrated && (
                <div className="fixed inset-0 z-50">
                    <div className="absolute top-4 left-4">
                        <button
                            onClick={stopGame}
                            className="bg-brand-primary hover:bg-brand-primary-hover text-white font-bold py-2 px-4 rounded-full shadow-xl transition"
                        >
                            Arrêter la chasse
                        </button>
                    </div>

                    <div className="absolute top-4 right-4 text-white text-lg bg-kali-noir/70 px-3 py-1 rounded-full shadow-md">
                        Score : {score}
                    </div>

                    {bugs.map((bug) => (
                        <div
                            key={bug.id}
                            onClick={() => hitBug(bug.id)}
                            className="absolute cursor-pointer animate-pulse"
                            style={{
                                top: `${bug.y}vh`,
                                left: `${bug.x}vw`,
                                transform: `rotate(${bug.rotation}deg)`
                            }}
                        >
                            <span className="text-3xl">🐞</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BugHuntGame;
