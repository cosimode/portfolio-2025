import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Trash2, LogOut, Eye, LayoutGrid, Activity, Pencil } from 'lucide-react';


export default function AdminDashboard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 1. Carica i progetti all'avvio
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) setProjects(data);
        setLoading(false);
    };

    // 2. Funzione Logout
    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    // 3. Funzione Elimina (con conferma)
    const handleDelete = async (id) => {
        if (!window.confirm("Sei sicuro di voler eliminare questo progetto? L'azione è irreversibile.")) return;

        const { error } = await supabase.from('projects').delete().eq('id', id);

        if (error) {
            alert("Errore durante l'eliminazione: " + error.message);
        } else {
            // Rimuovi dalla lista locale senza ricaricare la pagina
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    if (loading) return <div className="p-10 text-center text-slate-500">Caricamento Dashboard...</div>;

    return (
        <div className="min-h-screen bg-tech-bg pt-24 px-6">
            <div className="max-w-5xl mx-auto">

                {/* HEADER DASHBOARD */}
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-12 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Pannello Admin</h1>
                        <p className="text-slate-400 text-sm">Gestisci i contenuti di World Tracer & Portfolio.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-xs text-slate-500 font-mono hidden md:block">cosimo_depasquale@libero.it</span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 text-sm transition-colors"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </div>

                {/* STATISTICHE RAPIDE */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="bg-tech-card p-6 rounded-xl border border-tech-border">
                        <div className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">Totale Progetti</div>
                        <div className="text-3xl font-bold text-white">{projects.length}</div>
                    </div>
                    <div className="bg-tech-card p-6 rounded-xl border border-tech-border">
                        <div className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">Web Apps</div>
                        <div className="text-3xl font-bold text-tech-primary">{projects.filter(p => p.category === 'web').length}</div>
                    </div>
                    <div className="bg-tech-card p-6 rounded-xl border border-tech-border">
                        <div className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">ML Models</div>
                        <div className="text-3xl font-bold text-tech-secondary">{projects.filter(p => p.category === 'ml').length}</div>
                    </div>

                    {/* BOTTONE ADD NEW */}
                    <Link to="/admin/new" className="bg-white hover:bg-slate-200 text-black p-6 rounded-xl flex flex-col justify-center items-center transition-all shadow-lg hover:scale-[1.02] cursor-pointer group">
                        <Plus size={32} className="mb-2 group-hover:rotate-90 transition-transform" />
                        <span className="font-bold text-sm">Aggiungi Nuovo</span>
                    </Link>
                </div>

                {/* LISTA PROGETTI */}
                <div className="bg-tech-card border border-tech-border rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-tech-border">
                        <h2 className="text-lg font-semibold text-white">Progetti Attivi</h2>
                    </div>

                    <div className="divide-y divide-tech-border">
                        {projects.map((project) => (
                            <div key={project.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors group">

                                {/* Info Progetto */}
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-lg ${project.category === 'web' ? 'bg-blue-500/10 text-blue-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                                        {project.category === 'web' ? <LayoutGrid size={20} /> : <Activity size={20} />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{project.title}</h3>
                                        <p className="text-slate-500 text-sm truncate max-w-md">{project.description}</p>
                                    </div>
                                </div>

                                {/* Azioni */}
                                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <a href={project.metadata?.url || '#'} target="_blank" rel="noreferrer" title="Vedi Live" className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                                        <Eye size={18} />
                                    </a>

                                    {/* --- NUOVO TASTO MODIFICA --- */}
                                    <Link
                                        to={`/admin/edit/${project.id}`}
                                        title="Modifica"
                                        className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-full transition-colors"
                                    >
                                        <Pencil size={18} />
                                    </Link>
                                    {/* --------------------------- */}

                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        title="Elimina"
                                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                            </div>
                        ))}

                        {projects.length === 0 && (
                            <div className="p-12 text-center text-slate-500">
                                Nessun progetto trovato. Clicca su "Aggiungi Nuovo" per iniziare.
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}