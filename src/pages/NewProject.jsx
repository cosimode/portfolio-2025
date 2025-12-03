import { useState } from 'react';
import { supabase } from '../services/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Layers, BrainCircuit, Loader2, Link as LinkIcon } from 'lucide-react';

export default function NewProject() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // STATO DEL FORM
    const [category, setCategory] = useState('web'); // 'web' o 'ml'
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState(''); // Articolo Markdown

    // METADATA
    const [stack, setStack] = useState('');
    const [url, setUrl] = useState(''); // <--- Questo servirà per il Dataset o il Sito Live
    const [algorithm, setAlgorithm] = useState('');
    const [rmse, setRmse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // 1. Costruiamo il JSON metadata
        let metadata = {
            stack: stack.split(',').map(s => s.trim()),
            url: url // <--- Salviamo il link (Dataset o Sito) qui dentro
        };

        // Se è ML, aggiungiamo i campi specifici
        if (category === 'ml') {
            metadata = {
                ...metadata,
                algorithm: algorithm,
                rmse: rmse
            };
        }

        // 2. Inviamo a Supabase
        // Nota: user_id viene preso automaticamente dalla sessione grazie alla policy
        const { error } = await supabase.from('projects').insert([
            {
                title,
                description,
                content_md: content,
                category,
                metadata,
                user_id: (await supabase.auth.getUser()).data.user.id
            }
        ]);

        if (error) {
            alert("Errore: " + error.message);
            setLoading(false);
        } else {
            navigate('/admin');
        }
    };

    return (
        <div className="min-h-screen bg-tech-bg pt-24 px-6 pb-20">
            <div className="max-w-3xl mx-auto">

                <div className="flex items-center gap-4 mb-8">
                    <Link to="/admin" className="p-2 bg-tech-card hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Nuovo Progetto</h1>
                </div>

                <div className="bg-tech-card border border-tech-border rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* SELETTORE CATEGORIA */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setCategory('web')}
                                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                                    category === 'web'
                                        ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                                        : 'bg-slate-900/50 border-tech-border text-slate-500'
                                }`}
                            >
                                <Layers size={24} />
                                <span className="font-bold">Web App</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setCategory('ml')}
                                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                                    category === 'ml'
                                        ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400'
                                        : 'bg-slate-900/50 border-tech-border text-slate-500'
                                }`}
                            >
                                <BrainCircuit size={24} />
                                <span className="font-bold">ML Model</span>
                            </button>
                        </div>

                        {/* DATI BASE */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Titolo</label>
                                <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-tech-bg border border-tech-border rounded-lg px-4 py-3 text-white focus:border-tech-primary outline-none" placeholder="Es. Tesi ML o Chronos" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Descrizione Breve</label>
                                <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={2} className="w-full bg-tech-bg border border-tech-border rounded-lg px-4 py-3 text-white focus:border-tech-primary outline-none resize-none" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Tech Stack</label>
                                <input type="text" value={stack} onChange={e => setStack(e.target.value)} className="w-full bg-tech-bg border border-tech-border rounded-lg px-4 py-3 text-white focus:border-tech-primary outline-none" placeholder="Es. Python, MATLAB, React" />
                            </div>

                            {/* CAMPO LINK (DATASET O SITO) - ORA VISIBILE SEMPRE */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
                                    <LinkIcon size={14}/> {category === 'web' ? 'Sito Live URL' : 'Link Dataset / Repo GitHub'}
                                </label>
                                <input
                                    type="url"
                                    value={url}
                                    onChange={e => setUrl(e.target.value)}
                                    className="w-full bg-tech-bg border border-tech-border rounded-lg px-4 py-3 text-white focus:border-tech-primary outline-none text-blue-400"
                                    placeholder={category === 'web' ? "https://mio-sito.com" : "https://github.com/cosimo/tesi o https://data.nasa.gov/..."}
                                />
                            </div>
                        </div>

                        {/* CAMPI SPECIFICI ML */}
                        {category === 'ml' && (
                            <div className="grid grid-cols-2 gap-4 p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Algoritmo</label>
                                    <input type="text" value={algorithm} onChange={e => setAlgorithm(e.target.value)} className="w-full bg-tech-bg border border-tech-border rounded-lg px-3 py-2 text-white focus:border-indigo-500 outline-none" placeholder="CNN-BiLSTM" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">RMSE / Accuracy</label>
                                    <input type="text" value={rmse} onChange={e => setRmse(e.target.value)} className="w-full bg-tech-bg border border-tech-border rounded-lg px-3 py-2 text-white focus:border-indigo-500 outline-none" placeholder="20.74" />
                                </div>
                            </div>
                        )}

                        {/* ARTICOLO MARKDOWN */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Articolo Tecnico (Markdown)</label>
                            <textarea required value={content} onChange={e => setContent(e.target.value)} rows={10} className="w-full bg-tech-bg border border-tech-border rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-tech-primary outline-none" placeholder="# Titolo..." />
                        </div>

                        <button type="submit" disabled={loading} className="w-full bg-white hover:bg-slate-200 text-black font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.01] flex justify-center items-center gap-2">
                            {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Pubblica Progetto</>}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}