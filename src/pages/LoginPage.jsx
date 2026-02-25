import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Utilisation du vrai contexte
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ mail: '', password: '' }); 
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Sauvegarde de l'utilisateur et du token dans le contexte
        login(data.user, data.token); 
        navigate('/admin'); 
      } else {
        setError(data.message || 'Identifiants invalides');
      }
    } catch (err) {
      setError("L'identifiant ou le mot de passe est incorrect.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-mars-light flex flex-col items-center justify-center p-6 font-sans">
      <header className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-5xl md:text-6xl font-black text-mars-dark italic tracking-tighter uppercase">
          Connexion
        </h1>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Sparkles size={18} className="text-accent animate-pulse" />
          <span className="uppercase tracking-[0.2em] text-[10px] font-bold opacity-70 text-mars-dark">
            Espace Membre Mars.A.I
          </span>
        </div>
      </header>

      <section className="bg-white rounded-[2.5rem] shadow-2xl shadow-primary/5 p-8 md:p-12 w-full max-w-md border border-gray-100 transition-all">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="space-y-2">
            <label htmlFor="mail" className="block text-[10px] font-black uppercase tracking-widest text-mars-dark/60 ml-1">
              Adresse E-mail
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-light-gray group-focus-within:text-primary transition-colors" size={18} />
              <input
                type="email"
                id="mail"
                required
                placeholder="EMAIL@EXEMPLE.COM"
                value={formData.mail}
                onChange={(e) => setFormData({...formData, mail: e.target.value})}
                className="w-full bg-mars-light border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:bg-white focus:border-primary/20 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-[10px] font-black uppercase tracking-widest text-mars-dark/60 ml-1">
              Mot de passe
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-light-gray group-focus-within:text-primary transition-colors" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                required
                placeholder="••••••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-mars-light border-2 border-transparent rounded-2xl py-4 pl-12 pr-12 text-sm font-medium focus:bg-white focus:border-primary/20 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-light-gray hover:text-primary transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-extrabold py-5 rounded-2xl shadow-xl shadow-primary/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? 'Vérification en cours...' : "Accéder à l'espace"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;