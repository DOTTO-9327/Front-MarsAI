import React, { useState } from 'react'
import {
    User, Film, Sparkles, Users2, Rocket, ShieldCheck,
    Facebook, Instagram, Twitter, Youtube, ImageIcon, Zap,
    Plus, Trash2, ChevronRight, Check
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import Label from '../components/ui/Label'
import Input from '../components/ui/Input'
import TextArea from '../components/ui/TextArea'

const SubmissionForm = () => {
    const { t } = useTranslation();
    const [lang, setLang] = useState('FR')
    const [isHybrid, setIsHybrid] = useState(false)
    const [hasSubs, setHasSubs] = useState(false)

    return (
        <div className="w-full bg-mars-light text-mars-dark font-sans pb-20 selection:bg-primary selection:text-white pt-20">

            <div className="max-w-6xl mx-auto px-6 space-y-12 animate-fade-in-up">

                {/* --- PAGE HEADER --- */}
                <div className="text-center mb-16 space-y-6">
                    <div className="inline-flex items-center gap-2 text-accent bg-accent/5 px-4 py-1.5 rounded-full border border-accent/10">
                        <Rocket className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">{t('submission.header.badge')}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                        {t('submission.header.title_main')} <br /><span className="text-primary">{t('submission.header.title_accent')}</span>
                    </h1>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed text-sm md:text-base whitespace-pre-line">
                        {t('submission.header.description')}
                    </p>
                </div>

                {/* =========================================================================
            SECTION 01 : RÉALISATEUR
           ========================================================================= */}
                <section className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-10">
                        <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center shadow-md">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-black uppercase tracking-widest leading-tight">
                                <span className="opacity-50 mr-2">01.</span>{t('submission.sections.director.title')}
                            </h2>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t('submission.sections.director.subtitle')}</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="space-y-2">
                            <Label>{t('submission.sections.director.firstname')}</Label>
                            <Input
                                type="text"
                                placeholder={t('submission.placeholders.firstname')}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>{t('submission.sections.director.lastname')}</Label>
                            <Input
                                type="text"
                                placeholder={t('submission.placeholders.lastname')}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>{t('submission.sections.director.email')}</Label>
                            <Input
                                type="email"
                                placeholder={t('submission.placeholders.email')}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>{t('submission.sections.director.gender')}</Label>
                            <div className="relative">
                                <select
                                    required
                                    className="w-full bg-mars-light border border-transparent px-6 py-4 rounded-2xl font-bold text-sm text-mars-dark appearance-none focus:outline-none focus:bg-white focus:border-primary focus:shadow-lg focus:shadow-primary/10 transition-all uppercase cursor-pointer"
                                >
                                    <option value="M">{t('submission.sections.director.gender_options.m')}</option>
                                    <option value="F">{t('submission.sections.director.gender_options.f')}</option>
                                    <option value="O">{t('submission.sections.director.gender_options.o')}</option>
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <ChevronRight className="w-4 h-4 rotate-90" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>{t('submission.sections.director.birthdate')}</Label>
                            <Input type="date" required />
                        </div>
                        <div className="space-y-2">
                            <Label>{t('submission.sections.director.phone')}</Label>
                            <Input
                                type="tel"
                                placeholder={t('submission.placeholders.phone')}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 mt-8 border-t border-slate-100">
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors"><Facebook className="w-4 h-4" /></div>
                            {/* Réseaux sociaux généralement optionnels, pas de required ici */}
                            <Input type="text" placeholder={t('submission.placeholders.social_fb')} className="pl-12" />
                        </div>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent transition-colors"><Instagram className="w-4 h-4" /></div>
                            <Input type="text" placeholder={t('submission.placeholders.social_insta')} className="pl-12" />
                        </div>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors"><Twitter className="w-4 h-4" /></div>
                            <Input type="text" placeholder={t('submission.placeholders.social_x')} className="pl-12" />
                        </div>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-600 transition-colors"><Youtube className="w-4 h-4" /></div>
                            <Input type="text" placeholder={t('submission.placeholders.social_yt')} className="pl-12" />
                        </div>
                    </div>
                </section>

                {/* =========================================================================
            SECTION 02 : DÉTAILS DE L'ŒUVRE
           ========================================================================= */}
                <section className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-10">
                        <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center shadow-md">
                            <Film className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-black uppercase tracking-widest leading-tight">
                                <span className="opacity-50 mr-2">02.</span>{t('submission.sections.film.title')}
                            </h2>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t('submission.sections.film.subtitle')}</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <Label>{t('submission.sections.film.original_title')}</Label>
                            <Input
                                type="text"
                                placeholder={t('submission.placeholders.orig_title')}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>{t('submission.sections.film.english_title')}</Label>
                            <Input
                                type="text"
                                placeholder={t('submission.placeholders.intl_title')}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>{t('submission.sections.film.original_lang')}</Label>
                            <div className="flex gap-4">
                                <button type="button" onClick={() => setLang('FR')} className={`flex-1 py-4 rounded-xl border text-[10px] font-black transition-all ${lang === 'FR' ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-mars-light border-slate-200 text-slate-500 hover:bg-slate-200'}`}>
                                    {t('submission.sections.film.lang_options.fr')}
                                </button>
                                <button type="button" onClick={() => setLang('EN')} className={`flex-1 py-4 rounded-xl border text-[10px] font-black transition-all ${lang === 'EN' ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-mars-light border-slate-200 text-slate-500 hover:bg-slate-200'}`}>
                                    {t('submission.sections.film.lang_options.en')}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>{t('submission.sections.film.youtube')}</Label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-600 transition-colors"><Youtube className="w-4 h-4" /></div>
                                <Input
                                    type="url"
                                    placeholder={t('submission.placeholders.youtube')}
                                    className="pl-12 pr-6"
                                    required
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <div className="flex justify-between">
                                <Label>{t('submission.sections.film.synopsis_orig')}</Label>
                                <span className="text-[8px] font-bold text-slate-400">0/1000</span>
                            </div>
                            <TextArea
                                rows={4}
                                placeholder={t('submission.placeholders.synopsis_orig')}
                                required
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <div className="flex justify-between">
                                <Label>{t('submission.sections.film.synopsis_en')}</Label>
                                <span className="text-[8px] font-bold text-slate-400">0/1000</span>
                            </div>
                            <TextArea
                                rows={4}
                                placeholder={t('submission.placeholders.synopsis_en')}
                                required
                            />
                        </div>
                    </div>
                </section>

                {/* =========================================================================
            SECTION 03 : EXPERTISE TECHNIQUE
           ========================================================================= */}
                <section className="bg-mars-dark text-white rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 pointer-events-none">
                        <Zap className="w-32 h-32 text-primary" />
                    </div>

                    <div className="flex items-center gap-4 border-b border-white/10 pb-6 mb-10 relative z-10">
                        <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-black uppercase tracking-widest leading-tight">
                                <span className="opacity-50 mr-2">03.</span>{t('submission.sections.tech.title')}
                            </h2>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t('submission.sections.tech.subtitle')}</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 relative z-10">
                        <div className="space-y-4">
                            <Label className="text-slate-400">{t('submission.sections.tech.classification')}</Label>
                            <div className="flex gap-4">
                                {/* Boutons gérés par le state, pas de required HTML possible directement ici */}
                                <button type="button" onClick={() => setIsHybrid(false)} className={`flex-1 p-6 rounded-2xl border transition-all text-left active:scale-95 ${!isHybrid ? 'bg-primary border-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                                    <div className="text-[10px] font-black uppercase mb-1 text-white">{t('submission.sections.tech.type_ai.title')}</div>
                                    <div className={`text-[8px] font-bold ${!isHybrid ? 'text-white/70' : 'text-slate-500'}`}>{t('submission.sections.tech.type_ai.sub')}</div>
                                </button>
                                <button type="button" onClick={() => setIsHybrid(true)} className={`flex-1 p-6 rounded-2xl border transition-all text-left active:scale-95 ${isHybrid ? 'bg-primary border-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                                    <div className="text-[10px] font-black uppercase mb-1 text-white">{t('submission.sections.tech.type_hybrid.title')}</div>
                                    <div className={`text-[8px] font-bold ${isHybrid ? 'text-white/70' : 'text-slate-500'}`}>{t('submission.sections.tech.type_hybrid.sub')}</div>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-slate-400">{t('submission.sections.tech.subtitles')}</Label>
                            {/* Checkbox custom, pas de required HTML possible directement ici */}
                            <div onClick={() => setHasSubs(!hasSubs)} className={`flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all group ${hasSubs ? 'bg-primary/10 border-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${hasSubs ? 'border-primary bg-primary' : 'border-white/20'}`}>
                                    {hasSubs && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span className={`text-[10px] font-black uppercase transition-colors ${hasSubs ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                                    {t('submission.sections.tech.subtitles_label')}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-slate-400">{t('submission.sections.tech.tools')}</Label>
                            <TextArea
                                rows={4}
                                placeholder={t('submission.placeholders.tools')}
                                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-primary"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-400">{t('submission.sections.tech.process')}</Label>
                            <TextArea
                                rows={4}
                                placeholder={t('submission.placeholders.process')}
                                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-primary"
                                required
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <Label className="text-slate-400">{t('submission.sections.tech.cover')}</Label>
                            {/* Zone de drag & drop (DIV), impossible de mettre required directement. Il faudra gérer la validation JS. */}
                            <div className="w-full h-48 border-2 border-dashed border-white/10 rounded-3xl bg-white/5 flex flex-col items-center justify-center group hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                                <ImageIcon className="w-10 h-10 text-white/10 group-hover:text-primary transition-all mb-4" />
                                <span className="text-[10px] font-black text-slate-500 group-hover:text-white uppercase tracking-widest">{t('submission.sections.tech.cover_drag')}</span>
                                <span className="text-[8px] font-bold text-slate-600 mt-1">JPG / PNG (Max 2Mo)</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================================================================
            SECTION 04 : ÉQUIPE
            (Pas d'astérisques dans les labels fournis précédemment, donc pas de required ici)
           ========================================================================= */}
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
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-mars-light/50 rounded-4xl border border-slate-100 relative group hover:border-primary/20 transition-colors">
                            <div className="space-y-2">
                                <Label className="text-[8px]">{t('submission.sections.team.firstname')}</Label>
                                <Input type="text" defaultValue={t('submission.placeholders.firstname')} className="bg-white" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[8px]">{t('submission.sections.team.lastname')}</Label>
                                <Input type="text" defaultValue={t('submission.placeholders.lastname')} className="bg-white" />
                            </div>
                            <div className="md:col-span-2 flex gap-4">
                                <div className="flex-1 space-y-2">
                                    <Label className="text-[8px]">{t('submission.sections.team.role')}</Label>
                                    <Input type="text" defaultValue={t('submission.placeholders.role')} className="bg-white" />
                                </div>
                                <div className="flex items-end">
                                    <button className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-5 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                            <Plus className="w-4 h-4" /> {t('submission.sections.team.add_btn')}
                        </button>
                    </div>
                </section>

                {/* --- VALIDATION & LEGAL --- */}
                <div className="flex flex-col items-center gap-10 pt-8 pb-10">
                    <div className="max-w-xl p-8 bg-primary/5 border border-primary/10 rounded-[2.5rem] flex gap-5 items-start">
                        <ShieldCheck className="w-8 h-8 text-primary shrink-0 mt-1" />
                        <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed tracking-tight">
                            {t('submission.legal')}
                        </p>
                    </div>

                    <button className="w-full md:w-112.5 bg-primary text-white py-7 rounded-[2.2rem] text-sm font-black uppercase tracking-[0.4em] shadow-2xl shadow-primary/30 hover:-translate-y-1 hover:shadow-primary/50 active:scale-95 transition-all flex items-center justify-center gap-4 group cursor-pointer">
                        {t('submission.submit_btn')}
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default SubmissionForm