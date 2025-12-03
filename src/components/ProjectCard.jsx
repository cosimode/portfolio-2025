import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink, Database, Layers, Sparkles, Cpu } from 'lucide-react';

export default function ProjectCard({ project, className }) {

    // CONFIGURAZIONE TEMI (Web, ML, Altro)
    const getTheme = (cat) => {
        switch(cat) {
            case 'web': return {
                icon: <Layers size={12}/>,
                label: 'Web App',
                accent: 'text-blue-400',
                badge: 'bg-blue-500/10 border-blue-500/30',
                gradient: 'from-blue-900/40 to-black',
                fallback: 'from-blue-600 to-cyan-500'
            };
            case 'ml': return {
                icon: <Sparkles size={12}/>,
                label: 'ML Model',
                accent: 'text-indigo-400',
                badge: 'bg-indigo-500/10 border-indigo-500/30',
                gradient: 'from-indigo-900/40 to-black',
                fallback: 'from-indigo-600 to-purple-500'
            };
            default: return { // Categoria 'other'
                icon: <Cpu size={12}/>,
                label: 'Software / Eng',
                accent: 'text-purple-400',
                badge: 'bg-purple-500/10 border-purple-500/30',
                gradient: 'from-purple-900/40 to-black',
                fallback: 'from-fuchsia-600 to-purple-600'
            };
        }
    };

    const theme = getTheme(project.category);

    return (
        <div className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-tech-border bg-tech-card hover:border-slate-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 ${className}`}>

            {/* HEADER IMMAGINE */}
            <div className={`h-52 w-full relative overflow-hidden border-b border-white/5 ${!project.image_url && `bg-gradient-to-br ${theme.gradient}`}`}>

                {project.image_url ? (
                    <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                ) : (
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br opacity-20 blur-[80px] rounded-full pointer-events-none transition-opacity group-hover:opacity-40 ${theme.fallback}`}></div>
                )}

                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300"></div>

                {/* QUICK ACTIONS */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <Link to={`/project/${project.id}`} className="bg-white text-black p-3 rounded-full hover:scale-110 transition-transform shadow-lg" title="Vedi Dettagli">
                        <ArrowUpRight size={20} />
                    </Link>

                    {project.metadata?.url && (
                        <a href={project.metadata.url} target="_blank" rel="noreferrer" className="bg-slate-900/80 text-white p-3 rounded-full hover:bg-black hover:scale-110 transition-all border border-white/20 backdrop-blur-md">
                            {project.category === 'ml' ? <Database size={20} /> : <ExternalLink size={20} />}
                        </a>
                    )}

                    {project.repo_url && (
                        <a href={project.repo_url} target="_blank" rel="noreferrer" className="bg-slate-900/80 text-white p-3 rounded-full hover:bg-black hover:scale-110 transition-all border border-white/20 backdrop-blur-md">
                            <Github size={20} />
                        </a>
                    )}
                </div>
            </div>

            {/* CONTENUTO */}
            <Link to={`/project/${project.id}`} className="flex flex-col flex-grow">
                <div className="p-6 z-10">
                    <div className="flex justify-between items-start mb-4">
                <span className={`flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded border ${theme.badge} ${theme.accent}`}>
                    {theme.icon}
                    {theme.label}
                </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-tech-primary transition-colors">
                        {project.title}
                    </h3>

                    <p className="text-slate-400 leading-relaxed text-sm line-clamp-3">
                        {project.description}
                    </p>
                </div>

                <div className="p-6 pt-0 mt-auto z-10">
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                        {project.metadata?.stack?.slice(0, 3).map(tech => (
                            <span key={tech} className="text-[10px] uppercase font-mono text-slate-500 bg-slate-900/50 px-2 py-1 rounded border border-white/5">
                          {tech}
                      </span>
                        ))}
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