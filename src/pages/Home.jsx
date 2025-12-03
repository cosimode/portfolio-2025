import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Link } from 'react-router-dom'; // Importante per la navigazione
import { ArrowUpRight, Layers, Sparkles } from 'lucide-react';

export default function Home() {
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchProjects = async () => {
            // Scarichiamo tutti i dati, ordinati per data (il più recente per primo)
            const { data } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (data) setProjects(data);
        };
        fetchProjects();
    }, []);

    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    return (
        <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">

            {/* HERO SECTION */}
            <div className="mb-20 animate-fade-in">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">
                    Cosimo<span className="text-slate-600">.</span>Portfolio
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                    Sviluppo Full-Stack & Machine Learning. <br/>
                    Dalle Web App reattive all'Analisi Predittiva avanzata.
                </p>

                {/* FILTRI */}
                <div className="flex flex-wrap gap-3 mt-10">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            filter === 'all' ? 'bg-white text-black' : 'bg-tech-card text-slate-400 hover:text-white border border-tech-border'
                        }`}
                    >
                        Tutti i Progetti
                    </button>
                    <button
                        onClick={() => setFilter('web')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            filter === 'web' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50' : 'bg-tech-card text-slate-400 hover:text-white border border-tech-border'
                        }`}
                    >
                        <Layers size={16} /> Web Apps
                    </button>
                    <button
                        onClick={() => setFilter('ml')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            filter === 'ml' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50' : 'bg-tech-card text-slate-400 hover:text-white border border-tech-border'
                        }`}
                    >
                        <Sparkles size={16} /> Machine Learning
                    </button>
                </div>
            </div>

            {/* GRID DEI PROGETTI */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {filtered.map((project, index) => (
                    <Link
                        to={`/project/${project.id}`} // <--- IL LINK MAGICO
                        key={project.id}
                        // Logica Bento Grid: Il primo elemento è largo il doppio
                        className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-tech-border bg-tech-card hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 cursor-pointer ${
                            index === 0 ? 'md:col-span-2' : ''
                        }`}
                    >

                        {/* --- INIZIO MODIFICA CARD HEADER --- */}
                            <div className={`h-48 w-full relative overflow-hidden border-b border-white/5 ${
                            // Manteniamo il gradiente come fallback se non c'è immagine
                            !project.image_url && (project.category === 'web' ? 'bg-gradient-to-br from-blue-900/40 to-black' : 'bg-gradient-to-br from-emerald-900/40 to-black')
                        }`}>

                        {/* SE C'È L'IMMAGINE (Logo/Screenshot) */}
                        {project.image_url ? (
                            <>
                                {/* Immagine vera */}
                                <img
                                    src={project.image_url}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                                />
                                {/* Overlay scuro per leggere meglio il testo sopra (opzionale) */}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                            </>
                        ) : (
                            /* FALLBACK (Se non hai caricato l'immagine, mostra l'effetto astratto di prima) */
                            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br opacity-20 blur-[80px] rounded-full pointer-events-none transition-opacity group-hover:opacity-40
        ${project.category === 'web' ? 'from-blue-600 to-cyan-500' : 'from-indigo-600 to-purple-500'}
    `}></div>
                        )}

                    </div>
                {/* --- FINE MODIFICA --- */}

                        {/* HEADER CARD */}
                        <div className="p-8 z-10">
                            <div className="flex justify-between items-start mb-4">
                 <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded border ${
                     project.category === 'web'
                         ? 'border-blue-500/30 text-blue-400 bg-blue-500/10'
                         : 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10'
                 }`}>
                  {project.category}
                </span>
                                <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-tech-primary transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-slate-400 leading-relaxed text-sm line-clamp-3">
                                {project.description}
                            </p>
                        </div>

                        {/* FOOTER CARD */}
                        <div className="p-8 pt-0 mt-auto z-10">
                            <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                                {/* Mostriamo massimo 3 tecnologie per non affollare la card */}
                                {project.metadata?.stack?.slice(0, 3).map(tech => (
                                    <span key={tech} className="text-xs text-slate-500 bg-slate-900/50 px-2 py-1 rounded border border-white/5">
                      {tech}
                    </span>
                                ))}

                                {project.metadata?.algorithm && (
                                    <span className="text-xs text-indigo-300 bg-indigo-900/20 px-2 py-1 rounded border border-indigo-500/20">
                      {project.metadata.algorithm}
                    </span>
                                )}
                                {project.metadata?.rmse && (
                                    <span className="text-xs text-emerald-400 bg-emerald-900/20 px-2 py-1 rounded border border-emerald-500/20">
                      RMSE: {project.metadata.rmse}
                    </span>
                                )}
                            </div>
                        </div>

                    </Link>
                ))}
            </div>
        </div>
    );
}