export default function Footer() {
    return (
        <footer className="mt-12 backdrop-blur-sm bg-white/70 border-t border-white/20 shadow-inner">
            <div className="max-w-screen-xl mx-auto px-6 py-6 text-center text-sm text-gray-700">
                © {new Date().getFullYear()} KaliOps - Tous droits réservés
            </div>
        </footer>
    );
}