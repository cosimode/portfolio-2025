import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-tech-bg flex flex-col items-center justify-center text-center px-6">

            {/* Icona Animata */}
            <div className="mb-8 relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
                <Compass size={100} className="text-slate-700 relative z-10 animate-pulse" />
            </div>

            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tighter">
                404
            </h1>

            <h2 className="text-2xl text-slate-300 mb-6 font-medium">
                Coordinate non trovate.
            </h2>

            <p className="text-slate-500 max-w-md mb-10 leading-relaxed">
                Sembra che tu abbia navigato in una zona inesplorata del mio portfolio.
                Questa pagina non esiste (o è stata spostata in un'altra dimensione).
            </p>

            <Link
                to="/"
                className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-slate-200 transition-all hover:scale-105 shadow-lg shadow-white/10"
            >
                <Home size={18} />
                Torna alla Base
            </Link>

        </div>
    );
}