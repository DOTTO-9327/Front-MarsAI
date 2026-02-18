import React from 'react';
import { Play, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next'; 

const FilmCard = ({ 
  title, 
  director, 
  country, 
  thumbnail, // correspond à movie.cover_image
  tags, 
  duration = "60S",
  onClick 
}) => {
  const { t } = useTranslation(); 

  /**
   * Gestion dynamique de l'URL de la miniature
   * Détecte si c'est une URL S3 (http) ou une image locale
   */
  const getImageUrl = (path) => {
    if (!path) return 'https://placehold.co/600x400?text=No+Cover';
    
    // Si l'URL commence par http, c'est ton lien S3 direct
    if (path.startsWith('http')) {
      return path;
    }
    
    // Sinon, on construit l'URL avec ta variable d'environnement
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    
    return `${baseUrl}${cleanPath}`;
  };

  return (
    <article 
      onClick={onClick}
      className="group relative bg-white rounded-4xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 cursor-pointer"
    >
      {/* Thumbnail Container */}
      <div className="aspect-video relative overflow-hidden bg-mars-dark">
        <img 
          src={getImageUrl(thumbnail)} 
          alt={title} 
          className="w-full h-full object-cover grayscale-40 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
          onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Image+Error' }}
        />
        
        {/* Overlay dégradé */}
        <div className="absolute inset-0 bg-gradient-to-t from-mars-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Bouton Play au hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-2xl shadow-accent/40 ring-4 ring-white/20">
            <Play className="w-6 h-6 text-white fill-current ml-1" />
          </div>
        </div>

        {/* Tags (ex: AI Tools) */}
        <div className="absolute top-4 left-4 flex gap-2">
          {tags?.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[8px] font-black uppercase text-white tracking-widest">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Contenu Texte */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-black uppercase text-mars-dark leading-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
          <span className="text-[10px] font-black text-accent bg-accent/5 px-2 py-1 rounded">
            {duration}
          </span>
        </div>
        
        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
                {t('competition.cards.director')}
            </span>
            <span className="text-sm font-bold text-mars-dark">{director}</span>
          </div>
          <div className="text-right flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
                {t('competition.cards.origin')}
            </span>
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-primary" />
              <span className="text-xs font-bold text-mars-dark">{country}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FilmCard;