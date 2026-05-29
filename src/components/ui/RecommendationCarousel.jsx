'use client';

import { useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { recommendations } from '@/data/recommendations';

export default function RecommendationCarousel() {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % recommendations.length);
    const prev = () => setCurrent((prev) => (prev - 1 + recommendations.length) % recommendations.length);

    return (
        <div className="w-full flex flex-col items-center py-12 mt-0">
            <h2 className="text-2xl font-extrabold mb-6 text-center">
                <span className="text-brand-secondary drop-shadow">Ce qu'on dit de moi</span>{' '}
                <span className="text-highlight">👇</span>
            </h2>

            <div className="flex items-center space-x-4">
                <button
                    onClick={prev}
                    className="p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition"
                >
                    <HiChevronLeft className="w-6 h-6 text-brand-primary" />
                </button>

                <div className="bg-white/90 rounded-xl p-6 shadow-lg max-w-md w-[320px] sm:w-[400px] md:w-[500px] transition-all duration-500 ease-in-out opacity-0 animate-fade-in">
                    <p className="text-sm text-gray-700 italic">"{recommendations[current].text}"</p>
                    <p className="mt-4 text-sm font-semibold text-brand-primary">
                        {recommendations[current].name}
                        <span className="block text-xs text-gray-500">{recommendations[current].role}</span>
                    </p>
                </div>

                <button
                    onClick={next}
                    className="p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition"
                >
                    <HiChevronRight className="w-6 h-6 text-brand-primary" />
                </button>
            </div>
        </div>
    );
}
