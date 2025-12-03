import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, LayoutDashboard, FileText } from 'lucide-react'; // Aggiungi icona Dashboard
import { supabase } from '../services/supabase';

const Navbar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // 1. Controlla subito se sei già loggato
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);
        };
        checkUser();

        // 2. Ascolta i cambiamenti in tempo reale (se fai login o logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <nav className="fixed top-0 w-full z-50 bg-tech-bg/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* LOGO */}
                <Link to="/" className="text-sm font-bold tracking-wide text-white hover:opacity-80 transition-opacity flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-tech-primary shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
                    COSIMO DE PASQUALE
                </Link>

                {/* MENU */}
                <div className="flex items-center gap-6">
                    <Link to="/" className="text-xs font-medium text-slate-400 hover:text-white transition-colors">
                        Portfolio
                    </Link>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="text-xs font-medium text-slate-400 hover:text-white transition-colors">
                        GitHub
                    </a>

                    <a
                        href="https://tshdlcjepksleuvjqhli.supabase.co/storage/v1/object/public/documents/Damage%20Propagation%20Modeling.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-xs font-bold hover:bg-slate-200 transition-colors"
                    >
                        <FileText size={14} />
                        Resume
                    </a>

                    {/* LOGICA INTELLIGENTE:
              Se c'è l'utente -> Mostra "Dashboard"
              Se non c'è -> Mostra il Lucchetto */}
                    {user ? (
                        <Link
                            to="/admin"
                            className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-bold transition-all border border-white/10"
                        >
                            <LayoutDashboard size={14} />
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="text-slate-500 hover:text-white transition-colors p-2"
                            title="Area Riservata"
                        >
                            <Lock size={16} />
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;