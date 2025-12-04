import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Link, useNavigate } from 'react-router-dom';
import {
    Plus, Trash2, Eye, Pencil, Layers, BrainCircuit, Cpu,
    LayoutGrid, LogOut, FileCode
} from 'lucide-react';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');

    // 1. FETCH DATI E UTENTE
    useEffect(() => {
        const init = async () => {
            // Get User
            const { data: { user } } = await supabase.auth.getUser();
            if (user) setUserEmail(user.email);

            // Get Projects
            const { data } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            setProjects(data || []);
            setLoading(false);
        };
        init();
    }, []);

    // 2. LOGOUT FUNZIONE
    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    // 3. DELETE OTTIMIZZATO
    const handleDelete = async (id) => {
        if (!window.confirm("Sei sicuro di voler eliminare questo progetto?")) return;

        const { error } = await supabase.from('projects').delete().eq('id', id);

        if (!error) {
            setProjects(prev => prev.filter(p => p.id !== id));
        } else {
            alert("Errore durante l'eliminazione");
        }
    };

    // CALCOLO STATISTICHE (Ora separate!)
    const stats = {
        total: projects.length,
        web: projects.filter(p => p.category === 'web').length,
        ml: projects.filter(p => p.category === 'ml').length,
        other: projects.filter(p => p.category === 'other').length
    };

    if (loading) return <div className="p-10 text-center text-white">Caricamento Dashboard...</div>;

    return (
        <div className="min-h-screen bg-tech-bg pt-24 px-4 pb-20">
            <div className="max-w-6xl mx-auto">

                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-white/5 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold font-display text-white mb-1">Dashboard</h1>
                        <p className="text-slate-400 text-sm">Bentornato, <span className="text-emerald-400">{userEmail}</span></p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-full text-sm font-bold transition-colors border border-red-500/20"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>

                {/* --- SEZIONE STATISTICHE (KPI) - 5 Colonne --- */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">

                    {/* 1. Card Totale */}
                    <div className="bg-tech-card border border-tech-border p-5 rounded-2xl relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Totale</span>
                            <LayoutGrid size={18} className="text-slate-500"/>
                        </div>
                        <div className="text-3xl font-bold text-white font-display">{stats.total}</div>
                        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-colors"></div>
                    </div>

                    {/* 2. Card Web */}
                    <div className="bg-tech-card border border-tech-border p-5 rounded-2xl relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-blue-400 text-[10px] font-bold uppercase tracking-wider">Web Apps</span>
                            <Layers size={18} className="text-blue-500/50"/>
                        </div>
                        <div className="text-3xl font-bold text-white font-display">{stats.web}</div>
                        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-colors"></div>
                    </div>

                    {/* 3. Card ML */}
                    <div className="bg-tech-card border border-tech-border p-5 rounded-2xl relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-wider">ML Models</span>
                            <BrainCircuit size={18} className="text-indigo-500/50"/>
                        </div>
                        <div className="text-3xl font-bold text-white font-display">{stats.ml}</div>
                        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-colors"></div>
                    </div>

                    {/* 4. Card Altro (NUOVA) */}
                    <div className="bg-tech-card border border-tech-border p-5 rounded-2xl relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-purple-400 text-[10px] font-bold uppercase tracking-wider">Software</span>
                            <Cpu size={18} className="text-purple-500/50"/>
                        </div>
                        <div className="text-3xl font-bold text-white font-display">{stats.other}</div>
                        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-colors"></div>
                    </div>

                    {/* 5. Bottone Aggiungi Nuovo (Col. 5) */}
                    <Link
                        to="/admin/new"
                        className="col-span-2 md:col-span-1 bg-emerald-500 hover:bg-emerald-400 p-[7px] rounded-2xl flex flex-col justify-center items-center text-center transition-all hover:scale-[1.02] shadow-lg shadow-emerald-900/20 cursor-pointer group border border-emerald-400/50"
                    >
                        <div className="bg-black/20 p-2 rounded-full mb-2 group-hover:rotate-90 transition-transform duration-300">
                            <Plus size={20} className="text-black"/>
                        </div>
                        <span className="text-black font-bold text-xs uppercase tracking-wide">Nuovo Progetto</span>
                    </Link>
                </div>

                {/* --- LISTA PROGETTI --- */}
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <FileCode size={20} className="text-tech-primary"/> I tuoi Progetti
                </h2>

                <div className="space-y-4">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group bg-tech-card border border-tech-border rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center gap-4 transition-all hover:border-slate-500 overflow-hidden shadow-sm"
                        >

                            {/* IMMAGINE */}
                            <div className="w-full md:w-24 h-32 md:h-16 flex-shrink-0 bg-slate-900 rounded-lg overflow-hidden border border-white/5 relative">
                                {project.image_url ? (
                                    <img src={project.image_url} alt="cover" className="w-full h-full object-cover" />
                                ) : (
                                    <div className={`w-full h-full bg-gradient-to-br ${project.category === 'web' ? 'from-blue-900' : project.category === 'ml' ? 'from-indigo-900' : 'from-purple-900'} to-black opacity-50`}></div>
                                )}
                                <div className="absolute top-1 right-1 p-1 bg-black/60 rounded backdrop-blur-sm text-white/90">
                                    {project.category === 'web' ? <Layers size={12}/> : project.category === 'ml' ? <BrainCircuit size={12}/> : <Cpu size={12}/>}
                                </div>
                            </div>

                            {/* TESTI */}
                            <div className="flex-grow min-w-0 w-full">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-bold text-white truncate">{project.title}</h3>
                                    <span className={`hidden md:inline-block text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded border ${
                                        project.category === 'web' ? 'text-blue-400 border-blue-500/30 bg-blue-500/10' :
                                            project.category === 'ml' ? 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10' :
                                                'text-purple-400 border-purple-500/30 bg-purple-500/10'
                                    }`}>
                        {project.category}
                    </span>
                                </div>

                                <p className="text-slate-500 text-xs truncate">{project.description}</p>

                                {/* Mobile Info */}
                                <div className="mt-2 md:hidden flex items-center gap-2">
                                    <span className="text-[10px] uppercase font-bold text-slate-500">{project.category}</span>
                                    <span className="text-[10px] text-slate-600">• {new Date(project.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* BOTTONI AZIONI */}
                            <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0 justify-end md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                <a href={project.metadata?.url || '#'} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 rounded-lg transition-colors" title="Vedi Link">
                                    <Eye size={18} />
                                </a>
                                <Link to={`/admin/edit/${project.id}`} className="p-2 text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-colors" title="Modifica">
                                    <Pencil size={18} />
                                </Link>
                                <button onClick={() => handleDelete(project.id)} className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors" title="Elimina">
                                    <Trash2 size={18} />
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}