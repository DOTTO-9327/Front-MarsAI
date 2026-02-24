import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';

/* ==========================================================================
  A FAIRE : SYSTÈME D'AUTHENTIFICATION 
  ==========================================================================
  
  Ce composant est prêt, mais nécessite les actiopns suivantes :
  
  1. CONTEXTE AUTH : Créer 'src/context/AuthContext.js' pour gérer l'état global.
     - Implémenter une fonction 'login(userData)' qui met à jour l'état.
     - Gérer la persistance via localStorage : 
       localStorage.setItem('user', JSON.stringify(userData));
  
  2. PROVIDER : Envelopper le composant <App /> avec <AuthProvider>.
  
  3. ROUTE PROTÉGÉE : Utiliser le composant <ProtectedRoute /> dans 'App.jsx' 
     pour entourer les routes sous '/admin' (sauf '/admin/login').
     
  4. Une fois fait, décommenter l'import 'useAuth' et la ligne 
     const { login } = useAuth(); ci-dessous.
  ==========================================================================
*/

// import { useAuth } from '../context/AuthContext'; // À DÉCOMMENTER 

const LoginPage = () => {
  const navigate = useNavigate();
  
  // Simulation de useAuth pour éviter les erreurs de compilation 
  const login = (data) => console.log("Login contextuel avec :", data); 
  // const { login } = useAuth(); //  À ACTIVER PLUS TARD

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Appel à l'API de connexion 
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // 1. Stockage dans le futur contexte global
        login(data.user); 
        // 2. Redirection vers le tableau de bord
        navigate('/admin'); 
      } else {
        setError(data.message || 'Identifiants invalides');
      }
    } catch (err) {
      setError("Le serveur est injoignable. L'API est-elle lancée ?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-mars-light flex flex-col items-center justify-center p-6 font-sans">
      
      {/* Header Branding */}
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

      {/* Login Card */}
      <section className="bg-white rounded-4xl shadow-2xl shadow-primary/5 p-8 md:p-12 w-full max-w-md border border-gray-100 transition-all">
        
        {/* Affichage des erreurs API */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-widest text-mars-dark/60 ml-1">
              Adresse E-mail
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-light-gray group-focus-within:text-primary transition-colors" size={18} />
              <input
                type="email"
                id="email"
                required
                placeholder="EMAIL@EXEMPLE.COM"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-mars-light border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:bg-white focus:border-primary/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
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

          {/* Submit Button */}
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