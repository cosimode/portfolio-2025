import { useState } from 'react';
import { supabase } from '../services/supabase';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader2, ShieldAlert } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // LA TUA MAIL AUTORIZZATA
    const ADMIN_EMAIL = 'cosimo_depasquale@libero.it';

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // 1. Primo controllo rapido (UX)
        if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
            setError("Accesso negato: Questa dashboard è riservata all'amministratore.");
            setLoading(false);
            return;
        }

        // 2. Autenticazione reale su Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            // 3. Doppio controllo di sicurezza post-login
            if (data.user?.email !== ADMIN_EMAIL) {
                await supabase.auth.signOut(); // Logout immediato forzato
                setError("Utente non autorizzato all'area Admin.");
            } else {
                navigate('/admin'); // Solo tu passi qui
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-tech-bg">
            <div className="w-full max-w-md bg-tech-card border border-tech-border p-8 rounded-2xl shadow-2xl relative overflow-hidden">

                {/* Decorazione Sfondo */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tech-primary to-transparent"></div>

                <div className="flex justify-center mb-6">
                    <div className="p-3 bg-tech-primary/10 rounded-full text-tech-primary border border-tech-primary/20">
                        <Lock size={32} />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center text-white mb-2">Admin Access</h2>
                <p className="text-center text-slate-500 text-sm mb-8">Identificati per gestire il portfolio.</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Email Admin</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-900/50 border border-tech-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-tech-primary focus:ring-1 focus:ring-tech-primary transition-all placeholder-slate-600"
                            placeholder="admin@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-900/50 border border-tech-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-tech-primary focus:ring-1 focus:ring-tech-primary transition-all placeholder-slate-600"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg flex items-start gap-3">
                            <ShieldAlert className="shrink-0" size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white hover:bg-slate-200 text-black font-bold py-3 rounded-lg transition-all flex justify-center items-center shadow-lg shadow-white/5"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Entra nella Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
}