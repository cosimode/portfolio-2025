import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Layers, Sparkles, User, Terminal } from 'lucide-react';

// Importiamo le icone: Ho sostituito quelle "rischiose" con icone sicure di FontAwesome (Fa...)
import {
    FaJava,
    FaJs,
    FaReact,
    FaPhp,
    FaHtml5,
    FaDatabase,
    FaCode,       // Usiamo questa per C
    FaChartLine   // Usiamo questa per Matlab (Analisi Dati)
} from 'react-icons/fa';

import {
    SiVite,
    SiTailwindcss,
    SiSupabase
} from 'react-icons/si';

export default function Home() {
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchProjects = async () => {
            const { data } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });
            if (data) setProjects(data);
        };
        fetchProjects();
    }, []);

    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    // LISTA COMPETENZE CORRETTA (Senza errori di import)
    const skills = [
        { name: 'C', icon: <FaCode className="text-blue-500" /> }, // Icona generica Codice
        { name: 'Matlab', icon: <FaChartLine className="text-orange-600" /> }, // Icona Analisi Dati
        { name: 'Java', icon: <FaJava className="text-red-500" /> },
        { name: 'JavaScript', icon: <FaJs className="text-yellow-400" /> },
        { name: 'PHP', icon: <FaPhp className="text-indigo-400" /> },
        { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" /> },
        { name: 'SQL', icon: <FaDatabase className="text-gray-400" /> },
        { name: 'React', icon: <FaReact className="text-blue-400" /> },
        { name: 'Vite', icon: <SiVite className="text-purple-500" /> },
        { name: 'Tailwind', icon: <SiTailwindcss className="text-cyan-400" /> },
        { name: 'Supabase', icon: <SiSupabase className="text-emerald-400" /> },
    ];

    return (
        <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">

            {/* HERO SECTION */}
            <div className="mb-24 animate-fade-in">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">
                    Cosimo<span className="text-slate-600">.</span>Portfolio
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                    Laureato Triennale in <b>Ingegneria Informatica</b>. <br/>
                    Esploro il mondo dello sviluppo software con curiosità e rigore accademico.
                </p>
            </div>

            {/* --- ABOUT & STACK --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32 animate-fade-in delay-100">

                {/* Bio */}
                <div className="bg-tech-card/30 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><User size={24}/></div>
                        <h2 className="text-2xl font-bold text-white">Chi Sono</h2>
                    </div>
                    <p className="text-slate-400 leading-relaxed mb-4">
                        Sono un <b>Laureato Triennale in Ingegneria Informatica</b> (percorso P-Tech).
                        Il mio percorso accademico mi ha fornito solide basi trasversali, dalla logica di programmazione in <b>C</b> e <b>Java</b> all'analisi dati con <b>Matlab</b>.
                    </p>
                    <p className="text-slate-400 leading-relaxed">
                        Non mi definisco ancora uno specialista verticale, ma un ingegnere versatile che ha studiato e applicato con successo diverse tecnologie per risolvere problemi concreti, come dimostrano i progetti in questo portfolio.
                    </p>
                </div>

                {/* Tech Stack Grid */}
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6 flex items-center gap-2">
                        <Terminal size={16}/> Competenze Acquisite
                    </h3>
                    <div className="grid grid-cols-4 gap-4">
                        {skills.map((skill) => (
                            <div key={skill.name} className="flex flex-col items-center justify-center p-4 bg-tech-card border border-white/5 rounded-xl hover:border-white/20 hover:bg-white/5 transition-all group">
                                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                                    {skill.icon}
                                </div>
                                <span className="text-xs text-slate-400 font-medium">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FILTRI */}
            <div className="flex flex-wrap gap-3 mb-10 border-b border-white/5 pb-6">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filter === 'all' ? 'bg-white text-black' : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                    Tutti i Progetti
                </button>
                <button
                    onClick={() => setFilter('web')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filter === 'web' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50' : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                    <Layers size={16} /> Web Apps
                </button>
                <button
                    onClick={() => setFilter('ml')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filter === 'ml' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50' : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                    <Sparkles size={16} /> Machine Learning
                </button>
            </div>

            {/* GRID PROGETTI */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {filtered.map((project, index) => (
                    <Link
                        to={`/project/${project.id}`}
                        key={project.id}
                        className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-tech-border bg-tech-card hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 cursor-pointer ${
                            index === 0 ? 'md:col-span-2' : ''
                        }`}
                    >
                        <div className={`h-48 w-full relative overflow-hidden border-b border-white/5 ${
                            !project.image_url && (project.category === 'web' ? 'bg-gradient-to-br from-blue-900/40 to-black' : 'bg-gradient-to-br from-emerald-900/40 to-black')
                        }`}>
                            {project.image_url ? (
                                <>
                                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"/>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                                </>
                            ) : (
                                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br opacity-20 blur-[80px] rounded-full pointer-events-none transition-opacity group-hover:opacity-40 ${project.category === 'web' ? 'from-blue-600 to-cyan-500' : 'from-indigo-600 to-purple-500'}`}></div>
                            )}
                        </div>

                        <div className="p-8 z-10">
                            <div className="flex justify-between items-start mb-4">
                 <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded border ${
                     project.category === 'web' ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' : 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10'
                 }`}>
                  {project.category}
                </span>
                                <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-tech-primary transition-colors">{project.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm line-clamp-3">{project.description}</p>
                        </div>

                        <div className="p-8 pt-0 mt-auto z-10">
                            <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                                {project.metadata?.stack?.slice(0, 3).map(tech => (
                                    <span key={tech} className="text-xs text-slate-500 bg-slate-900/50 px-2 py-1 rounded border border-white/5">{tech}</span>
                                ))}
                                {project.metadata?.algorithm && <span className="text-xs text-indigo-300 bg-indigo-900/20 px-2 py-1 rounded border border-indigo-500/20">{project.metadata.algorithm}</span>}
                                {project.metadata?.rmse && <span className="text-xs text-emerald-400 bg-emerald-900/20 px-2 py-1 rounded border border-emerald-500/20">RMSE: {project.metadata.rmse}</span>}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}