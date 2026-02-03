import { useTranslation } from 'react-i18next';
import { Handshake } from 'lucide-react';

const partnersLogos = [
    { name: 'Topito', src: '/logos/topito.png' },
    { name: 'Bioguia', src: '/logos/bioguia.png' },
    { name: 'Dotsub', src: '/logos/dotsub.png' },
    { name: 'Bioaddict', src: '/logos/bioaddict.png' },
    { name: 'Sens Critique', src: '/logos/senscritique.png' },
    { name: 'CNC', src: '/logos/cnc.png' },
    { name: 'SACD', src: '/logos/sacd.png' },
    { name: 'UNRIC', src: '/logos/unric.png' },
    { name: 'Action Campaign', src: '/logos/action-campaign.png' },
    { name: 'GYBN', src: '/logos/gybn.png' },
    { name: 'PSL', src: '/logos/psl.png' },
    { name: 'UNDP', src: '/logos/undp.png' },
];

const PartnersSection = () => {
    const { t } = useTranslation();

    return (
        <section className="w-full bg-[#F3F4F6] py-24 px-4 md:px-8 lg:px-16 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <header className="flex flex-col items-center text-center mb-16 space-y-6">
                    <div className="flex items-center gap-4 text-primary font-bold text-xl uppercase tracking-[0.2em]">
                        <Handshake size={40} strokeWidth={1.5} />
                        <span>{t('partners.badge')}</span>
                    </div>

                    <h2 className="tracking-tighter text-mars-dark leading-none">
                        {t('partners.title_main')} <span className="text-accent">{t('partners.title_accent')}</span>
                    </h2>
                </header>

                {/* Logos Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {partnersLogos.map((logo, index) => (
                        <div
                            key={index}
                            className="bg-white/50 border border-gray-100 rounded-2xl p-6 md:p-10 flex items-center justify-center aspect-square md:aspect-video grayscale hover:grayscale-0 transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 group"
                        >
                            <img
                                src={logo.src}
                                alt={logo.name}
                                className="max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=' + logo.name }}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default PartnersSection;