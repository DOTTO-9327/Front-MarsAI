import React from 'react';
import { Users2, Plus, Trash2 } from 'lucide-react';
import Label from '../ui/Label';
import Input from '../ui/Input';

const TeamSection = ({ t, register }) => {
    return (
        <section className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-10">
                <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center shadow-md">
                    <Users2 className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-lg font-black uppercase tracking-widest leading-tight">
                        <span className="opacity-50 mr-2">04.</span>{t('submission.sections.team.title')}
                    </h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t('submission.sections.team.subtitle')}</p>
                </div>
            </div>

            <div className="space-y-4">
                {/* Exemple statique - Utiliser useFieldArray de RHF plus tard */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-mars-light/50 rounded-4xl border border-slate-100 relative group hover:border-primary/20 transition-colors">
                    <div className="space-y-2">
                        <Label className="text-[8px]">{t('submission.sections.team.firstname')}</Label>
                        <Input type="text" placeholder={t('submission.placeholders.firstname')} className="bg-white" {...register("team.0.firstname")} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[8px]">{t('submission.sections.team.lastname')}</Label>
                        <Input type="text" placeholder={t('submission.placeholders.lastname')} className="bg-white" {...register("team.0.lastname")} />
                    </div>
                    <div className="md:col-span-2 flex gap-4">
                        <div className="flex-1 space-y-2">
                            <Label className="text-[8px]">{t('submission.sections.team.role')}</Label>
                            <Input type="text" placeholder={t('submission.placeholders.role')} className="bg-white" {...register("team.0.role")} />
                        </div>
                        <div className="flex items-end">
                            <button type="button" className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <button type="button" className="w-full py-5 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" /> {t('submission.sections.team.add_btn')}
                </button>
            </div>
        </section>
    );
};

export default TeamSection;