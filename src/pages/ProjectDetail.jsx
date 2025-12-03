import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Database, Layers, Github, ExternalLink, Code2 } from 'lucide-react';

export default function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            const { data } = await supabase.from('projects').select('*').eq('id', id).single();
            setProject(data);
            setLoading(false);
        };
        fetchProject();
    }, [id]);

    if (loading) return <div className="text-center pt-20 text-slate-500">Caricamento...</div>;
    if (!project) return <div className="text-center pt-20 text-red-400">Progetto non trovato</div>;

    return (
        <div className="min-h-screen bg-tech-bg pb-20">

            {/* --- HERO SECTION CINEMATICA --- */}
            <div className="relative w-full h-[50vh] flex flex-col justify-end">
                {/* Sfondo con Immagine Sfocata o Gradiente */}
                <div className="absolute inset-0 overflow-hidden z-0">
                    {project.image_url ? (
                        <>
                            <img src={project.image_url} className="w-full h-full object-cover opacity-30 blur-xl scale-110" alt="bg" />
                            <div className="absolute inset-0 bg-gradient-to-t from-tech-bg via-tech-bg/80 to-transparent"></div>
                        </>
                    ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${project.category === 'web' ? 'from-blue-900/40' : 'from-indigo-900/40'} to-tech-bg`}></div>
                    )}
                </div>

                {/* Contenuto Hero */}
                <div className="relative z-10 max-w-4xl mx-auto w-full px-6 pb-12">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors text-sm font-medium">
                        <ArrowLeft size={16} /> Torna ai Progetti
                    </Link>

                    <div className="flex flex-wrap gap-3 mb-4">
                <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-widest border ${
                    project.category === 'web' ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
                }`}>
                    {project.category === 'web' ? 'Full-Stack App' : 'AI Research'}
                </span>
                        <span className="px-3 py-1 rounded text-xs font-bold uppercase tracking-widest border border-white/10 text-slate-400 flex items-center gap-2">
                    <Calendar size={12} /> {new Date(project.created_at).toLocaleDateString()}
                </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight shadow-black drop-shadow-lg">
                        {project.title}
                    </h1>

                    <div className="flex flex-wrap gap-4 items-center">
                        {/* BOTTONI AZIONE INTELLIGENTI */}
                        {project.category === 'web' ? (
                            // --- CASO SITO WEB ---
                            <>
                                {project.metadata?.url && (
                                    <a href={project.metadata.url} target="_blank" rel="noreferrer"
                                       className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 hover:scale-105">
                                        <ExternalLink size={18} /> Visita Sito Live
                                    </a>
                                )}
                                {/* Se hai la repo github nel metadata, la mostriamo. Altrimenti nulla. */}
                                {project.repo_url && (
                                    <a href={project.repo_url} target="_blank" rel="noreferrer"
                                       className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium flex items-center gap-2 transition-all">
                                        <Github size={18} /> Codice
                                    </a>
                                )}
                            </>
                        ) : (
                            // --- CASO ML MODEL ---
                            <>
                                {project.metadata?.url && (
                                    <a href={project.metadata.url} target="_blank" rel="noreferrer"
                                       className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium flex items-center gap-2 transition-all">
                                        <Database size={18} /> Dataset NASA
                                    </a>
                                )}
                                {/* Per la tesi, magari vuoi mettere il link alla repo se esiste */}
                                <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20">
                                    <Code2 size={18} /> Vedi Implementazione
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6">

                {/* DESCRIZIONE BREVE E STACK */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="md:col-span-2">
                        <h3 className="text-lg font-semibold text-white mb-2">Overview</h3>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            {project.description}
                        </p>
                    </div>
                    <div className="bg-tech-card/50 p-6 rounded-2xl border border-white/5">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.metadata?.stack?.map(tech => (
                                <span key={tech} className="px-3 py-1 bg-slate-900 rounded border border-white/10 text-xs text-slate-300 font-mono">
                        {tech}
                        </span>
                            ))}
                        </div>
                        {/* Se è ML, mostriamo le metriche qui in evidenza */}
                        {project.category === 'ml' && (
                            <div className="mt-6 pt-6 border-t border-white/5">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs text-slate-500 uppercase font-bold">Best RMSE</span>
                                    <span className="text-emerald-400 font-mono font-bold">{project.metadata.rmse}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-slate-500 uppercase font-bold">Algorithm</span>
                                    <span className="text-indigo-400 font-mono font-bold">{project.metadata.algorithm}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* CORPO DELL'ARTICOLO (Markdown) */}
                <div className="border-t border-white/10 pt-12">
                    <h2 className="text-2xl font-bold text-white mb-8">
                        {project.category === 'web' ? 'Dietro le Quinte' : 'Analisi Tecnica'}
                    </h2>

                    <article className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-slate-400 prose-a:text-tech-primary prose-strong:text-white prose-li:text-slate-400 prose-table:border-collapse prose-th:border-b prose-th:border-slate-700 prose-td:border-b prose-td:border-slate-800 prose-th:text-slate-200 prose-th:p-4 prose-td:p-4">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {project.content_md}
                        </ReactMarkdown>
                    </article>
                </div>

            </div>
        </div>
    );
}