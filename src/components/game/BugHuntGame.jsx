import { useRef, useState, useEffect } from 'react';
import { sounds } from '@/config/assets';

const BugHuntGame = () => {
    const [isActive, setIsActive] = useState(false);
    const [bugs, setBugs] = useState([]);
    const [score, setScore] = useState(0);
    const [showFinalScore, setShowFinalScore] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    const timeoutRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
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
        const id = crypto.randomUUID?.() || Math.random().toString(36).substring(7);
        const x = Math.random() * 90;
        const y = Math.random() * 90;
        const rotation = Math.random() * 360;
        setBugs((prev) => [...prev, { id, x, y, rotation }]);
        setTimeout(() => removeBug(id), 5000);
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
            <button
                onClick={isActive ? stopGame : startGame}
                className="bg-gradient-to-r from-pink-600 to-blue-900 text-white font-bold py-2 px-4 rounded-full shadow-xl hover:scale-105 transition"
            >
                {isActive ? 'Arrêter la chasse' : 'Chasser un bug 🐞'}
            </button>

            {showFinalScore && !isActive && isHydrated && (
                <div className="fixed top-[4.5rem] right-4 z-50 bg-white text-brand-primary font-semibold shadow-md px-4 py-2 rounded-full border border-pink-300 text-sm">
                    🎉 Partie terminée ! Tu as attrapé <span className="text-pink-600">{score}</span> bugs !
                </div>
            )}

            {isActive && isHydrated && (
                <div className="fixed inset-0 z-50">
                    <div className="absolute top-4 right-4 text-white text-lg bg-black/70 px-3 py-1 rounded-full shadow-md">
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
