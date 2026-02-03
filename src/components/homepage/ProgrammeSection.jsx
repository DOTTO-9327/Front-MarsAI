import { useTranslation } from 'react-i18next';
import { Award, Calendar, Cpu, Film } from "lucide-react";
import Button from "../ui/Button";
import NightImage from '../../assets/Night.webp';

const ProgrammeSection = () => {
    const { t } = useTranslation();

    return (
        <section className="w-full bg-white py-24 px-4 md:px-8 lg:px-16 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <header className="mb-12">
                    <span className="inline-block bg-primary text-white text-md font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-16">
                        {t('programme.badge')}
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-mars-dark mb-16 leading-[1.1]">
                        {t('programme.title_main')} <br />
                        <span className="text-primary">{t('programme.title_accent')}</span> {t('programme.title_free')}
                    </h2>

                    <ul className="mt-8 space-y-3 mb-16">
                        {t('programme.features', { returnObjects: true }).map((text, i) => (
                            <li key={i} className="flex items-center gap-4">
                                <span className="flex-none w-6 h-6 flex items-center justify-center rounded-full bg-blue-50 text-primary text-[10px] font-bold">
                                    {i + 1}
                                </span>
                                <span className="text-sm font-medium text-gray-500 uppercase">{text}</span>
                            </li>
                        ))}
                    </ul>
                </header>

                {/* Grid Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    {/* Card: Projections */}
                    <article className="bg-mars-dark text-white p-10 rounded-4xl flex flex-col justify-between min-h-60">
                        <div className="text-accent">
                            <Film size={32} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-3xl text-white font-black uppercase mb-2 tracking-tight">
                                {t('programme.projections.title')}
                            </h3>
                            <p className="text-gray-400">
                                {t('programme.projections.desc')}
                            </p>
                        </div>
                    </article>

                    {/* Card: Workshops */}
                    <article className="bg-mars-light p-10 rounded-4xl flex flex-col justify-between min-h-60">
                        <div className="text-primary">
                            <Cpu size={32} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black uppercase mb-2 tracking-tight text-mars-dark">
                                {t('programme.workshops.title')}
                            </h3>
                            <p className="text-gray-500">
                                {t('programme.workshops.desc')}
                            </p>
                        </div>
                    </article>

                    {/* Card: Remise des prix */}
                    <article className="md:col-span-2 bg-mars-light p-10 rounded-4xl flex flex-col justify-between">
                        <div className="text-accent mb-6">
                            <Award size={32} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black uppercase mb-2 tracking-tight text-mars-dark">
                                {t('programme.awards.title')}
                            </h3>
                            <p className="text-gray-500">
                                {t('programme.awards.desc')}
                            </p>
                        </div>
                    </article>
                </div>

                {/* MARS.A.I NIGHT Banner */}
                <footer className="relative rounded-[2.5rem] overflow-hidden bg-black flex flex-col md:flex-row items-center justify-between p-8 md:p-16 min-h-125">
                    {/* Image de fond avec overlay progressif */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent z-10" />
                        <img
                            src={NightImage}
                            alt={t('programme.night.title')}
                            className="w-full h-full object-cover opacity-70"
                        />
                    </div>

                    {/* Texte de gauche */}
                    <div className="relative z-20 max-w-xl mb-8 md:mb-0">
                        <span className="inline-block bg-accent text-white text-md font-bold px-4 py-1.5 rounded-full uppercase mb-8">
                            {t('programme.night.badge')}
                        </span>
                        <h2 className="text-6xl md:text-8xl text-white leading-[0.9] font-black uppercase mb-6">
                            {t('programme.night.title')}
                        </h2>
                        <p className="text-gray-200 text-lg italic font-medium leading-tight">
                            {t('programme.night.desc')}<br />
                            <span className="text-sm font-normal not-italic opacity-70">
                                {t('programme.night.subdesc')}
                            </span>
                        </p>
                    </div>

                    {/* Card de Date */}
                    <div className="relative z-20 bg-white rounded-4xl p-8 w-full md:w-72 text-center shadow-2xl">
                        <div className="flex justify-center mb-4 text-primary">
                            <Calendar size={32} strokeWidth={1.5} />
                        </div>
                        <h4 className="text-4xl font-black text-mars-dark uppercase leading-none">
                            {t('programme.night.date')}
                        </h4>
                        <p className="text-accent font-bold text-xs uppercase tracking-widest mt-2 mb-8">
                            {t('programme.night.time')}
                        </p>
                        <Button
                            variant="primary"
                            size="small"
                            className="w-full"
                            onClick={() => console.log('Pass cliqué')}
                        >
                            {t('programme.night.cta')}
                        </Button>
                    </div>
                </footer>

            </div>
        </section>
    );
};

export default ProgrammeSection;