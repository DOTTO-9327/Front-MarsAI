import { Sparkles, ArrowRight } from 'lucide-react';
import heroImage from '../../assets/hero-bg.webp';
import Button from '../ui/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-mars-dark">
      {/* Background avec Overlay et Texture */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-t from-[#282828] via-[#282828]/60 to-[#282828]/40 z-10" />
        <img
          src={heroImage}
          className="w-full h-full object-cover"
          alt="MARS.A.I Hero Background"
        />
        <div className="absolute inset-0 opacity-[0.1] z-20" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-30 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-8 shadow-2xl">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
            {t('hero.badge')}
          </span>
        </div>

        <h1 className="text-6xl md:text-[100px] font-black tracking-tighter mb-8 leading-[0.9] text-white uppercase">
          {t('hero.title_part1')} <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#246BAD] to-[#FF5845]">
            {t('hero.title_part2')}
          </span>
        </h1>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-12 font-medium leading-relaxed">
          {t('hero.description1')} <br />
          {t('hero.description2')}
        </p>

        {/* Call to Action */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Button
            variant="primary"
            icon={ArrowRight}
            onClick={() => navigate('/soumettre')}
          >
            {t('hero.cta')}
          </Button>

          <div className="text-left hidden md:block border-l-2 border-white/20 pl-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{t('hero.cocreated')}</p>
            <p className="text-sm font-black text-white">La Plateforme × Mobile Film Festival</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;