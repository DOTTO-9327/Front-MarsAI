import { Rocket } from 'lucide-react';

const HeaderSection = ({ t }) => (
    <div className="text-center mb-16 space-y-6">
        <div className="inline-flex items-center gap-2 text-accent bg-accent/5 px-4 py-1.5 rounded-full border border-accent/10">
            <Rocket className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                {t('submission.header.badge')}
            </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
            {t('submission.header.title_main')} <br />
            <span className="text-primary">{t('submission.header.title_accent')}</span>
        </h1>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed text-sm md:text-base whitespace-pre-line">
            {t('submission.header.description')}
        </p>
    </div>
);

export default HeaderSection;