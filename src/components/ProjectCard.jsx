import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink, Database, Layers, Sparkles } from 'lucide-react';

export default function ProjectCard({ project, className }) {
    // Determina i colori in base alla categoria
    const isWeb = project.category === 'web';
    const accentColor = isWeb ? 'text-blue-400' : 'text-indigo-400';
    const bgBadge = isWeb ? 'bg-blue-500/10 border-blue-500/30' : 'bg-indigo-500/10 border-indigo-500/30';
    const gradient = isWeb ? 'from-blue-900/40 to-black' : 'from-indigo-900/40 to-black';
    const fallbackGradient = isWeb ? 'from-blue-600 to-cyan-500' : 'from-indigo-600 to-purple-500';

    return (
        <div className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-tech-border bg-tech-card hover:border-slate-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 ${className}`}>

            {/* --- HEADER IMMAGINE CON QUICK ACTIONS --- */}
            <div className={`h-52 w-full relative overflow-hidden border-b border-white/5 ${!project.image_url && `bg-gradient-to-br ${gradient}`}`}>

                {/* Immagine o Fallback */}
                {project.image_url ? (
                    <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                ) : (
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br opacity-20 blur-[80px] rounded-full pointer-events-none transition-opacity group-hover:opacity-40 ${fallbackGradient}`}></div>
                )}

                {/* OVERLAY SCURO (Sempre visibile un po', aumenta all'hover) */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300"></div>

                {/* --- QUICK ACTIONS (Appaiono solo in hover) --- */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    {/* Link Dettagli (Il tasto principale) */}
                    <Link to={`/project/${project.id}`} className="bg-white text-black p-3 rounded-full hover:scale-110 transition-transform shadow-lg" title="Vedi Dettagli">
                        <ArrowUpRight size={20} />
                    </Link>

                    {/* Link Esterno (Sito o Dataset) */}
                    {project.metadata?.url && (
                        <a href={project.metadata.url} target="_blank" rel="noreferrer" className="bg-slate-900/80 text-white p-3 rounded-full hover:bg-black hover:scale-110 transition-all border border-white/20 backdrop-blur-md" title={isWeb ? "Vai al Sito" : "Vai al Dataset"}>
                            {isWeb ? <ExternalLink size={20} /> : <Database size={20} />}
                        </a>
                    )}

                    {/* Link Repo (Se c'è) */}
                    {project.repo_url && (
                        <a href={project.repo_url} target="_blank" rel="noreferrer" className="bg-slate-900/80 text-white p-3 rounded-full hover:bg-black hover:scale-110 transition-all border border-white/20 backdrop-blur-md" title="Codice GitHub">
                            <Github size={20} />
                        </a>
                    )}
                </div>
            </div>

            {/* --- CONTENUTO CARD --- */}
            {/* Avvolgiamo il contenuto in un Link così se clicchi fuori dai bottoni vai comunque al dettaglio */}
            <Link to={`/project/${project.id}`} className="flex flex-col flex-grow">

                <div className="p-6 z-10">
                    {/* Badge Categoria */}
                    <div className="flex justify-between items-start mb-4">
                <span className={`flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded border ${bgBadge} ${accentColor}`}>
                    {isWeb ? <Layers size={12}/> : <Sparkles size={12}/>}
                    {project.category === 'web' ? 'Web App' : 'ML Model'}
                </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-tech-primary transition-colors">
                        {project.title}
                    </h3>

                    <p className="text-slate-400 leading-relaxed text-sm line-clamp-3">
                        {project.description}
                    </p>
                </div>

                {/* Footer Card (Stack Tecnologico) */}
                <div className="p-6 pt-0 mt-auto z-10">
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                        {/* Mostra Stack (Max 3) */}
                        {project.metadata?.stack?.slice(0, 3).map(tech => (
                            <span key={tech} className="text-[10px] uppercase font-mono text-slate-500 bg-slate-900/50 px-2 py-1 rounded border border-white/5">
                          {tech}
                      </span>
                        ))}

                        {/* Metriche ML (Se ci sono) */}
                        {project.metadata?.rmse && (
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-900/10 px-2 py-1 rounded border border-emerald-500/20">
                          RMSE: {project.metadata.rmse}
                      </span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}