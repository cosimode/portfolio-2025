import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const ADMIN_EMAIL = 'cosimo_depasquale@libero.it';

    useEffect(() => {
        // 1. Controlla la sessione attuale
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user?.email === ADMIN_EMAIL) {
                setUser(session.user);
            } else {
                // Se c'è una sessione ma l'email è sbagliata (es. utente Tracce), sloggalo
                if (session) await supabase.auth.signOut();
                setUser(null);
            }
            setLoading(false);
        };

        checkUser();

        // 2. Ascolta i cambiamenti (se fai logout in un'altra scheda)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user?.email === ADMIN_EMAIL) {
                setUser(session.user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-tech-bg text-tech-primary">
                <Loader2 className="animate-spin" size={40} />
            </div>
        );
    }

    // Se non sei Cosimo, vai al login. Altrimenti, mostra la pagina protetta (Outlet)
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;