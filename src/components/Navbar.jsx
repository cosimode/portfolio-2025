import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, LayoutDashboard, FileText } from 'lucide-react';
import { supabase } from '../services/supabase';

const Navbar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);
        };
        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <nav className="fixed top-0 w-full z-50 bg-tech-bg/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* LOGO (Cliccabile per tornare Home) */}
                <Link to="/" className="text-sm font-bold tracking-wide text-white hover:opacity-80 transition-opacity flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-tech-primary shadow-[0_0_10px_rgba(56,189,248,0.5)] shrink-0"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1 leading-none sm:leading-normal">
                        <span>COSIMO</span>
                        <span>DE PASQUALE</span>
                    </div>
                </Link>

                {/* MENU */}
                <div className="flex items-center gap-5"> {/* Ridotto gap da 6 a 5 per sicurezza su mobile */}

                    {/* 1. PORTFOLIO: Ora visibile SEMPRE (abbiamo tolto 'hidden') */}
                    <Link to="/" className="text-xs font-medium text-slate-400 hover:text-white transition-colors">
                        Portfolio
                    </Link>

                    {/* 2. GITHUB: Nascosto su mobile (hidden), visibile su Tablet/PC (sm:block) */}
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="hidden sm:block text-xs font-medium text-slate-400 hover:text-white transition-colors">
                        GitHub
                    </a>

                    {/* RESUME: Visibile solo su Tablet/PC */}
                    <a
                        href="https://tshdlcjepksleuvjqhli.supabase.co/storage/v1/object/public/documents/Analisi%20RUL.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-xs font-bold hover:bg-slate-200 transition-colors"
                    >
                        <FileText size={14} />
                        Resume
                    </a>

                    {/* DASHBOARD / LOGIN */}
                    {user ? (
                        <Link
                            to="/admin"
                            className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-bold transition-all border border-white/10"
                        >
                            <LayoutDashboard size={14} />
                            {/* Su mobile solo icona, su tablet anche testo */}
                            <span className="hidden sm:inline">Dashboard</span>
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