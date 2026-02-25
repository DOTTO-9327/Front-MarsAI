import { TrainFront, Car, Navigation, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AccessSection = () => {
    const { t } = useTranslation('program');



    const accessPoints = [
        {
            icon: TrainFront,
            title: "Transports en commun",
            description: "Tram T2 / T3 - Arrêt Arenc Le Silo. Métro M2 - Station Désirée Clary."
            
        },
        {
            icon: Car,
            title: "Voiture",
            description: "Autoroute A55 - Sortie 2. Parking Indigo Quai Du Lazaret À 200m."
        },
        {
            icon: Navigation,
            title: "Adresse",
            description: "12 Rue D'Uzes, 13002 Marseille (Entrée Principale)."
        }
    ];

    return (
        <section className="mb-16 mt-28">
            <h2 className="text-4xl font-black uppercase tracking-tight text-mars-dark mb-10 inline-block border-b-[5px] border-primary pb-4">
                {t('section.accessTittle')}
            </h2>

            <div className="flex flex-col gap-10">

                {/* Liste des infos */}
                <div className="grid gap-8 md:gap-10">
                    {accessPoints.map((item, idx) => (
                        <div key={idx} className="flex gap-6 md:gap-8 items-start group">
                            {/* Icône */}
                            <div className="shrink-0 pt-1">
                                <item.icon
                                    size={40}
                                    strokeWidth={1.5}
                                    className="text-primary transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>

                            {/* Textes */}
                            <div className="flex flex-col">
                                <h3 className="text-2xl font-black uppercase text-mars-dark tracking-tight mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed max-w-2xl">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Map */}
                <div className="w-full h-100 mt-4 rounded-4xl overflow-hidden shadow-sm border border-slate-100 relative group">
                    <iframe
                        src="https://maps.google.com/maps?q=43.31536725010646,5.3683772883595635&hl=fr&z=13&output=embed"
                        className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Localisation Exacte"
                    ></iframe>
                </div>

            </div>
        </section>
    );
};

export default AccessSection;