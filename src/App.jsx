import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa'; // Icone Social corrette
import NotFound from './pages/NotFound'

// Componenti Strutturali
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pagine Pubbliche
import Home from './pages/Home';
import Login from './pages/Login';
import ProjectDetail from './pages/ProjectDetail';

// Pagine Private (Admin)
import AdminDashboard from './pages/AdminDashboard';
import NewProject from './pages/NewProject';
import EditProject from './pages/EditProject';

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-tech-bg text-slate-200 font-sans">
                <Navbar />

                {/* --- MODIFICA QUI --- */}
                {/* pb-10: Padding basso su Mobile */}
                {/* md:pb-24: Padding basso GRANDE su Desktop (risolve il problema) */}
                <main className="flex-grow pb-10 md:pb-24">
                    <Routes>
                        {/* --- AREA PUBBLICA --- */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/project/:id" element={<ProjectDetail />} />

                        {/* --- AREA PRIVATA --- */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/admin/new" element={<NewProject />} />
                            <Route path="/admin/edit/:id" element={<EditProject />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />

                    </Routes>
                </main>

                {/* FOOTER */}
                <footer className="border-t border-white/5 bg-tech-card mt-auto">
                    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">

                        <div className="text-center md:text-left">
                            <h3 className="text-lg font-bold text-white mb-2">Cosimo De Pasquale</h3>
                            <p className="text-slate-400 text-sm">
                                Data Scientist & Full-Stack Developer.
                            </p>
                        </div>

                        <div className="flex gap-6">
                            {/* LinkedIn */}
                            <a href="https://linkedin.com/in/iltuoprofilo" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#0077b5] transition-colors">
                                <FaLinkedin size={24} />
                            </a>

                            {/* GitHub */}
                            <a href="https://github.com/cosimode" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                                <FaGithub size={24} />
                            </a>

                            {/* Email */}
                            <a href="mailto:cosimo_depasquale@libero.it" className="text-slate-400 hover:text-emerald-400 transition-colors">
                                <Mail size={24} />
                            </a>
                        </div>

                        <div className="text-slate-600 text-xs">
                            © {new Date().getFullYear()} Cosimo De Pasquale. Built with React & Supabase.
                        </div>
                    </div>
                </footer>

            </div>
        </Router>
    );
}

export default App;