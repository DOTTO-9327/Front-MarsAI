import { useFieldArray } from 'react-hook-form'
import { Users2, Plus, Trash2 } from 'lucide-react'
import Label from '../ui/Label'
import Input from '../ui/Input'

const TeamSection = ({ t, register, control }) => {
    // Initialisation du hook useFieldArray pour gérer le tableau "team"
    const { fields, append, remove } = useFieldArray({
        control,
        name: "team" 
    });

    return (
        <section className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-10">
                <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center shadow-md">
                    <Users2 className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-lg font-black uppercase tracking-widest leading-tight">
                        <span className="opacity-50 mr-2">04.</span>{t('sections.team.title')}
                    </h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        {t('sections.team.subtitle')}
                    </p>
                </div>
            </div>

            {/* Conteneur des champs dynamiques */}
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <div 
                        key={field.id} 
                        className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-mars-light/50 rounded-4xl border border-slate-100 relative group hover:border-primary/20 transition-colors animate-in fade-in slide-in-from-top-2 duration-300"
                    >
                        <div className="space-y-2">
                            <Label className="text-[8px]">{t('sections.team.firstname')}</Label>
                            <Input 
                                type="text" 
                                placeholder={t('placeholders.firstname')} 
                                className="bg-white" 
                                {...register(`team.${index}.firstname`)} 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[8px]">{t('sections.team.lastname')}</Label>
                            <Input 
                                type="text" 
                                placeholder={t('placeholders.lastname')} 
                                className="bg-white" 
                                {...register(`team.${index}.lastname`)} 
                            />
                        </div>
                        <div className="md:col-span-2 flex gap-4">
                            <div className="flex-1 space-y-2">
                                <Label className="text-[8px]">{t('sections.team.role')}</Label>
                                <Input 
                                    type="text" 
                                    placeholder={t('placeholders.role')} 
                                    className="bg-white" 
                                    {...register(`team.${index}.role`)} 
                                />
                            </div>
                            <div className="flex items-end">
                                <button 
                                    type="button" 
                                    onClick={() => remove(index)} 
                                    className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Bouton d'ajout */}
                <button 
                    type="button" 
                    onClick={() => append({ firstname: '', lastname: '', role: '' })}
                    className="w-full py-5 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 group"
                >
                    <Plus className="w-4 h-4 group-hover:scale-125 transition-transform" /> 
                    {t('sections.team.add_btn')}
                </button>
            </div>
        </section>
    );
};

export default TeamSection;