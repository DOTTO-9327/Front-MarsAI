import { useRef } from 'react';
import { Sparkles, Check, ImageIcon, Zap } from 'lucide-react';
import Label from '../ui/Label';
import TextArea from '../ui/TextArea';

const TechSection = ({ t, register, errors, watch, setValue }) => {
    const isHybrid = watch('tech.isHybrid');
    const hasSubs = watch('tech.hasSubs');
    const toolsUsed = watch('tech.toolsUsed') || '';
    const creativeProcess = watch('tech.creativeProcess') || '';
    
    // Upload setup
    const coverFile = watch('tech.cover');
    const fileInputRef = useRef(null);
    const { ref: fileRef, ...fileRest } = register("tech.cover", { required: "Affiche requise" });

    const ErrorMessage = ({ message }) => (
        <p className="text-[10px] font-bold text-red-500 ml-1 mt-1 animate-pulse">{message}</p>
    );

    return (
        <section className="bg-mars-dark text-white rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 pointer-events-none"><Zap className="w-32 h-32 text-primary" /></div>

            <div className="flex items-center gap-4 border-b border-white/10 pb-6 mb-10 relative z-10">
                <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30"><Sparkles className="w-6 h-6" /></div>
                <div>
                    <h2 className="text-lg font-black uppercase tracking-widest leading-tight"><span className="opacity-50 mr-2">03.</span>{t('sections.tech.title')}</h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t('sections.tech.subtitle')}</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 relative z-10">
                {/* CLASSIFICATION */}
                <div className="space-y-4">
                    <Label className="text-slate-400">{t('sections.tech.classification')}</Label>
                    <div className="flex gap-4">
                        <button type="button" onClick={() => setValue('tech.isHybrid', false)} className={`flex-1 p-6 rounded-2xl border transition-all text-left active:scale-95 ${!isHybrid ? 'bg-primary border-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                            <div className="text-[10px] font-black uppercase mb-1 text-white">{t('sections.tech.type_ai.title')}</div>
                            <div className={`text-[8px] font-bold ${!isHybrid ? 'text-white/70' : 'text-slate-500'}`}>{t('sections.tech.type_ai.sub')}</div>
                        </button>
                        <button type="button" onClick={() => setValue('tech.isHybrid', true)} className={`flex-1 p-6 rounded-2xl border transition-all text-left active:scale-95 ${isHybrid ? 'bg-primary border-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                            <div className="text-[10px] font-black uppercase mb-1 text-white">{t('sections.tech.type_hybrid.title')}</div>
                            <div className={`text-[8px] font-bold ${isHybrid ? 'text-white/70' : 'text-slate-500'}`}>{t('sections.tech.type_hybrid.sub')}</div>
                        </button>
                    </div>
                </div>

                {/* SUBS */}
                <div className="space-y-4">
                    <Label className="text-slate-400">{t('sections.tech.subtitles')}</Label>
                    <div onClick={() => setValue('tech.hasSubs', !hasSubs)} className={`flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all group ${hasSubs ? 'bg-primary/10 border-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${hasSubs ? 'border-primary bg-primary' : 'border-white/20'}`}>{hasSubs && <Check className="w-3 h-3 text-white" />}</div>
                        <span className={`text-[10px] font-black uppercase transition-colors ${hasSubs ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>{t('sections.tech.subtitles_label')}</span>
                    </div>
                </div>

                {/* TOOLS & PROCESS */}
                <div className="space-y-2">
                    <div className="flex justify-between"><Label className="text-slate-400">{t('sections.tech.tools')}</Label><span className={`text-[8px] font-bold transition-colors ${toolsUsed.length >= 500 ? 'text-red-500' : 'text-slate-500'}`}>{toolsUsed.length}/500</span></div>
                    <TextArea rows={4} placeholder={t('placeholders.tools')} {...register("tech.toolsUsed", { required: "Requis", maxLength: 500 })} className={`bg-white/5 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-primary ${errors.tech?.toolsUsed || toolsUsed.length >= 500 ? 'border-red-500' : 'border-white/10'}`} />
                    {errors.tech?.toolsUsed && <ErrorMessage message={errors.tech.toolsUsed.message} />}
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between"><Label className="text-slate-400">{t('sections.tech.process')}</Label><span className={`text-[8px] font-bold transition-colors ${creativeProcess.length >= 500 ? 'text-red-500' : 'text-slate-500'}`}>{creativeProcess.length}/500</span></div>
                    <TextArea rows={4} placeholder={t('placeholders.process')} {...register("tech.creativeProcess", { required: "Requis", maxLength: 500 })} className={`bg-white/5 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-primary ${errors.tech?.creativeProcess || creativeProcess.length >= 500 ? 'border-red-500' : 'border-white/10'}`} />
                    {errors.tech?.creativeProcess && <ErrorMessage message={errors.tech.creativeProcess.message} />}
                </div>

                {/* COVER UPLOAD */}
                <div className="md:col-span-2 space-y-2">
                    <Label className="text-slate-400">{t('sections.tech.cover')}</Label>
                    <input 
                        type="file" 
                        hidden 
                        accept="image/png, image/jpeg"
                        {...fileRest}
                        ref={(e) => {
                            fileRef(e);
                            fileInputRef.current = e;
                        }}
                        onChange={(e) => {
                            fileRest.onChange(e); // Notifier RHF
                        }}
                    />
                    <div onClick={() => fileInputRef.current?.click()} className={`w-full h-48 border-2 border-dashed rounded-3xl bg-white/5 flex flex-col items-center justify-center group hover:border-primary hover:bg-primary/5 transition-all cursor-pointer ${errors.tech?.cover ? 'border-red-500' : 'border-white/10'}`}>
                        {coverFile && coverFile.length > 0 ? (
                            <div className="flex flex-col items-center text-primary"><Check className="w-10 h-10 mb-2" /><span className="text-sm font-bold">{coverFile[0].name}</span></div>
                        ) : (
                            <><ImageIcon className="w-10 h-10 text-white/10 group-hover:text-primary transition-all mb-4" /><span className="text-[10px] font-black text-slate-500 group-hover:text-white uppercase tracking-widest">{t('sections.tech.cover_drag')}</span><span className="text-[8px] font-bold text-slate-600 mt-1">JPG / PNG (Max 2Mo)</span></>
                        )}
                    </div>
                    {errors.tech?.cover && <ErrorMessage message={errors.tech.cover.message} />}
                </div>
            </div>
        </section>
    );
};

export default TechSection;