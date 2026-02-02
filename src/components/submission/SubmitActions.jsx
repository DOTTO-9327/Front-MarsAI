import React from 'react';
import { ShieldCheck, ChevronRight } from 'lucide-react';

const SubmitActions = ({ t, isSubmitting }) => {
    return (
        <div className="flex flex-col items-center gap-10 pt-8 pb-10">
            <div className="max-w-xl p-8 bg-primary/5 border border-primary/10 rounded-[2.5rem] flex gap-5 items-start">
                <ShieldCheck className="w-8 h-8 text-primary shrink-0 mt-1" />
                <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed tracking-tight">
                    {t('submission.legal')}
                </p>
            </div>

            <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-112.5 bg-primary text-white py-7 rounded-[2.2rem] text-sm font-black uppercase tracking-[0.4em] shadow-2xl shadow-primary/30 hover:-translate-y-1 hover:shadow-primary/50 active:scale-95 transition-all flex items-center justify-center gap-4 group cursor-pointer disabled:opacity-70 disabled:cursor-wait"
            >
                {isSubmitting ? "Envoi en cours..." : t('submission.submit_btn')}
                {!isSubmitting && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
        </div>
    );
};

export default SubmitActions;