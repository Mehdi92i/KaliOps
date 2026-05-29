export default function CvSkills() {
    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/30">
            <h2 className="text-2xl font-bold text-cv-section mb-6 text-center">Compétences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Expertises fonctionnelles</h3>
                    <ul className="list-none space-y-1 text-gray-800 text-sm">
                        <li>📝 Tests manuels</li>
                        <li>🔁 Tests E2E</li>
                        <li>🔌 Tests API</li>
                        <li>⚡ Tests de perf</li>
                        <li>📈 Tests de charge</li>
                        <li>📊 KPI QA</li>
                        <li>📌 Suivi qualité & process</li>
                        <li>🤝 Communication inter-équipes</li>
                        <li>📂 Gestion de projet</li>
                        <li>🧭 Pilotage d’équipe</li>
                        <li>👥 Recrutement & onboarding</li>
                        <li>🎯 Coaching & montée en compétences</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Méthodologies & CI</h3>
                    <ul className="list-none space-y-1 text-gray-800 text-sm">
                        <li>🔄 CI/CD - QAOps</li>
                        <li>📅 Agilité/Cycle en V</li>
                        <li>📊 Suivi des métriques QA</li>
                        <li>🧠 Amélioration continue</li>
                        <li>🧭 Pilotage des objectifs par profil</li>
                        <li>🎯 Certification ISTQB Foundation</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
