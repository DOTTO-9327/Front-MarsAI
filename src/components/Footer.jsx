import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import Button from './ui/Button';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-mars-dark text-white pt-20 pb-10 px-4 md:px-8 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">

          {/* Section Info & Social */}
          <div className="max-w-md space-y-8">
            <div className="inline-block bg-primary px-6 py-3 rounded-xl font-black tracking-tighter text-xl">
              MARS.A.I
            </div>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed uppercase font-medium">
              {t('footer.description')}
            </p>

            <div className="flex items-center gap-6 text-white">
              <a href="#" className="hover:text-primary transition-colors"><Facebook size={24} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram size={24} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Youtube size={24} /></a>
              <a href="#" className="hover:text-primary transition-colors">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Section Newsletter */}
          <div className="w-full lg:max-w-xl bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12">
            <h3 className="text-3xl md:text-4xl font-black text-center mb-10 tracking-tighter text-white">
              {t('footer.newsletter.title')}
            </h3>

            <form className="relative flex items-center bg-[#333333] rounded-full p-2 border border-white/10">
              <input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                className="bg-transparent flex-1 px-6 text-sm md:text-base outline-none text-white placeholder:text-gray-500"
              />
              <Button
                variant="primary"
                size="default"
                className="w-full"
                onClick={() => console.log('Inscription effectuée')}
              >
                {t('footer.newsletter.button')}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-white/10 text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">
          <div className="flex gap-8 md:gap-16">
            <a href="#" className="hover:text-white transition-colors">{t('footer.links.legal')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.links.press')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.links.contact')}</a>
          </div>

          <div className="tracking-normal font-medium">
            {t('footer.copyright')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;