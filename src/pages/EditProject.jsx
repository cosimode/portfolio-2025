import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { ArrowLeft, Save, Loader2, Link as LinkIcon, Layers, BrainCircuit } from 'lucide-react';

export default function EditProject() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // STATI DEL FORM
    const [category, setCategory] = useState('web');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(''); // Descrizione Breve
    const [content, setContent] = useState(''); // Articolo Dettagliato (content_md)

    // METADATA
    const [stack, setStack] = useState('');
    const [url, setUrl] = useState('');
    const [algorithm, setAlgorithm] = useState('');
    const [rmse, setRmse] = useState('');

    // 1. CARICA DATI
    useEffect(() => {
        const fetchProject = async () => {
            const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();

            if (error) {
                alert("Errore nel caricamento: " + error.message);
                navigate('/admin');
            } else {
                setTitle(data.title);
                setDescription(data.description);
                setContent(data.content_md || ''); // Carica l'articolo lungo
                setCategory(data.category);

                if (data.metadata) {
                    setStack(data.metadata.stack ? data.metadata.stack.join(', ') : '');
                    setUrl(data.metadata.url || '');
                    setAlgorithm(data.metadata.algorithm || '');
                    setRmse(data.metadata.rmse || '');
                }
            }
            setLoading(false);
        };
        fetchProject();
    }, [id, navigate]);

    // 2. SALVA MODIFICHE
    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);

        // Ricostruiamo il JSON in base alla NUOVA categoria selezionata
        let metadata = {
            stack: stack.split(',').map(s => s.trim()),
            url: url
        };

        if (category === 'ml') {
            metadata = { ...metadata, algorithm, rmse };
        }

        const { error } = await supabase
            .from('projects')
            .update({
                title,
                description,
                content_md: content, // Salva la descrizione dettagliata
                category,            // Salva la nuova categoria
                metadata
            })
            .eq('id', id);

        if (error) {
            alert("Errore aggiornamento: " + error.message);
            setSaving(false);
        } else {
            navigate('/admin');
        }
    };

    if (loading) return <div className="p-10 text-center text-white">Caricamento dati...</div>;

    return (
        <div className="min-h-screen bg-tech-bg pt-24 px-6 pb-20">
            <div className="max-w-3xl mx-auto">

                <div className="flex items-center gap-4 mb-8">
                    <Link to="/admin" className="p-2 bg-tech-card hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Modifica Progetto</h1>
                </div>

                <div className="bg-tech-card border border-tech-border rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleUpdate} className="space-y-8">

                        {/* --- SELETTORE CATEGORIA (ORA ATTIVO) --- */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setCategory('web')}
                                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                                    category === 'web'
                                        ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                                        : 'bg-slate-900/50 border-tech-border text-slate-500 hover:bg-slate-800'
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
                                        : 'bg-slate-900/50 border-tech-border text-slate-500 hover:bg-slate-800'
                                }`}
                            >
                                <BrainCircuit size={24} />
                                <span className="font-bold">ML Model</span>
                            </button>
                        </div>

                        {/* CAMPI COMUNI */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Titolo</label>
                                <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-tech-bg border border-tech-border rounded-lg px-4 py-3 text-white focus:border-tech-primary outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Descrizione Breve (per la Card)</label>
                                <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={2} className="w-full bg-tech-bg border border-tech-border rounded-lg px-4 py-3 text-white focus:border-tech-primary outline-none resize-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Tech Stack</label>
                                <input type="text" value={stack} onChange={e => setStack(e.target.value)} className="w-full bg-tech-bg border border-tech-border rounded-lg px-4 py-3 text-white focus:border-tech-primary outline-none" />
                            </div>

                            {/* CAMPO LINK (DINAMICO) */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
                                    <LinkIcon size={14}/> {category === 'web' ? 'Sito Live URL' : 'Link Dataset / Repo GitHub'}
                                </label>
                                <input type="url" value={url} onChange={e => setUrl(e.target.value)} className="w-full bg-tech-bg border border-tech-border rounded-lg px-4 py-3 text-white focus:border-tech-primary outline-none text-blue-400" />
                            </div>
                        </div>

                        {/* CAMPI SPECIFICI ML (Visibili solo se selezioni ML) */}
                        {category === 'ml' && (
                            <div className="grid grid-cols-2 gap-4 p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 animate-fade-in">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Algoritmo</label>
                                    <input type="text" value={algorithm} onChange={e => setAlgorithm(e.target.value)} className="w-full bg-tech-bg border border-tech-border rounded-lg px-3 py-2 text-white focus:border-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">RMSE</label>
                                    <input type="text" value={rmse} onChange={e => setRmse(e.target.value)} className="w-full bg-tech-bg border border-tech-border rounded-lg px-3 py-2 text-white focus:border-indigo-500 outline-none" />
                                </div>
                            </div>
                        )}

                        {/* ARTICOLO DETTAGLIATO */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Articolo Tecnico (Markdown)</label>
                            <textarea required value={content} onChange={e => setContent(e.target.value)} rows={15} className="w-full bg-tech-bg border border-tech-border rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-tech-primary outline-none" placeholder="# Titolo..."/>
                        </div>

                        <button type="submit" disabled={saving} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.01] flex justify-center items-center gap-2">
                            {saving ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Salva Modifiche</>}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}