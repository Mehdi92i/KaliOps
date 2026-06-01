export default function Footer() {
    return (
        <footer className="bg-brand-primary border-t border-white/10">
            <div className="max-w-screen-xl mx-auto px-6 py-5 flex items-center justify-between">
                <span className="text-sm text-white/60">© {new Date().getFullYear()} KaliOps</span>
                <span className="text-sm text-white/40">Tous droits réservés</span>
            </div>
        </footer>
    );
}