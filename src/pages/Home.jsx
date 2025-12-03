import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Layers, Sparkles, User, Terminal, Cpu } from 'lucide-react';

// IMPORTA IL NUOVO COMPONENTE
import ProjectCard from '../components/ProjectCard';

// Icone Stack
import { FaJava, FaJs, FaReact, FaPhp, FaHtml5, FaDatabase, FaCode, FaChartLine } from 'react-icons/fa';
import { SiVite, SiTailwindcss, SiSupabase } from 'react-icons/si';

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

    // SKILLS (Uguale a prima)
    const skills = [
        { name: 'C', icon: <FaCode className="text-blue-500" /> },
        { name: 'Matlab', icon: <FaChartLine className="text-orange-600" /> },
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
                <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-6 text-white">
                    Cosimo<span className="text-slate-600">.</span>Dev
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                    Laureato Triennale in <b>Ingegneria Informatica</b>. <br/>
                    Esploro il mondo dello sviluppo software con curiosità e rigore accademico.
                </p>
            </div>

            {/* ABOUT & STACK */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32 animate-fade-in delay-100">
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
                        Non mi definisco ancora uno specialista verticale, ma un ingegnere versatile che ha studiato e applicato con successo diverse tecnologie per risolvere problemi concreti.
                    </p>
                </div>

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
                <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'all' ? 'bg-white text-black' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                    Tutti
                </button>
                <button onClick={() => setFilter('web')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'web' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                    <Layers size={16} /> Web
                </button>
                <button onClick={() => setFilter('ml')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'ml' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                    <Sparkles size={16} /> AI / ML
                </button>

                {/* --- NUOVO TASTO ALTRO --- */}
                <button onClick={() => setFilter('other')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'other' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                    <Cpu size={16} /> Altro
                </button>
            </div>
            {/* GRID PROGETTI (Refactoring Completo) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {filtered.map((project, index) => (
                    // Usiamo il componente ProjectCard
                    <ProjectCard
                        key={project.id}
                        project={project}
                        // Logica Bento Grid: Il primo elemento è largo il doppio (solo su desktop)
                        className={index === 0 ? 'md:col-span-2' : ''}
                    />
                ))}
            </div>

        </div>
    );
}