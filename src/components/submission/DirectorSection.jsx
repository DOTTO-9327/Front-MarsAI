import React from 'react';
import { User, Facebook, Instagram, Twitter, Youtube, ChevronRight } from 'lucide-react';
import Label from '../ui/Label';
import Input from '../ui/Input';

const DirectorSection = ({ t, register, errors }) => {

    const ErrorMessage = ({ message }) => (
        <p className="text-[10px] font-bold text-red-500 ml-1 mt-1 animate-pulse">
            {message}
        </p>
    );

    return (
        <section className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-10">
                <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center shadow-md">
                    <User className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-lg font-black uppercase tracking-widest leading-tight">
                        <span className="opacity-50 mr-2">01.</span>{t('submission.sections.director.title')}
                    </h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        {t('submission.sections.director.subtitle')}
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* --- PRÉNOM --- */}
                <div className="space-y-2">
                    <Label>{t('submission.sections.director.firstname')}</Label>
                    <Input
                        type="text"
                        placeholder={t('submission.placeholders.firstname')}
                        {...register("director.firstname", { required: "Le prénom est requis" })}
                        className={errors.director?.firstname ? "border-red-500 focus:border-red-500 text-red-600" : ""}
                    />
                    {errors.director?.firstname && <ErrorMessage message={errors.director.firstname.message} />}
                </div>

                {/* --- NOM --- */}
                <div className="space-y-2">
                    <Label>{t('submission.sections.director.lastname')}</Label>
                    <Input
                        type="text"
                        placeholder={t('submission.placeholders.lastname')}
                        {...register("director.lastname", { required: "Le nom est requis" })}
                        className={errors.director?.lastname ? "border-red-500 focus:border-red-500 text-red-600" : ""}
                    />
                    {errors.director?.lastname && <ErrorMessage message={errors.director.lastname.message} />}
                </div>

                {/* --- EMAIL --- */}
                <div className="space-y-2">
                    <Label>{t('submission.sections.director.email')}</Label>
                    <Input
                        type="email"
                        placeholder={t('submission.placeholders.email')}
                        {...register("director.email", {
                            required: "L'email est requis",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Format email invalide"
                            }
                        })}
                        className={errors.director?.email ? "border-red-500 focus:border-red-500 text-red-600" : ""}
                    />
                    {errors.director?.email && <ErrorMessage message={errors.director.email.message} />}
                </div>

                {/* --- GENRE --- */}
                <div className="space-y-2">
                    <Label>{t('submission.sections.director.gender')}</Label>
                    <div className="relative">
                        <select
                            {...register("director.gender", { required: "Le genre est requis" })}
                            className="w-full bg-mars-light border border-transparent px-6 py-4 rounded-2xl font-bold text-sm text-mars-dark appearance-none focus:outline-none focus:bg-white focus:border-primary transition-all uppercase cursor-pointer"
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

                {/* --- DATE DE NAISSANCE --- */}
                <div className="space-y-2">
                    <Label>{t('submission.sections.director.birthdate')}</Label>
                    <Input
                        type="date"
                        {...register("director.birthdate", { required: "La date de naissance est requise" })}
                        className={errors.director?.birthdate ? "border-red-500 focus:border-red-500 text-red-600" : ""}
                    />
                    {errors.director?.birthdate && <ErrorMessage message={errors.director.birthdate.message} />}
                </div>

                {/* --- TÉLÉPHONE --- */}
                <div className="space-y-2">
                    <Label>{t('submission.sections.director.phone')}</Label>
                    <Input
                        type="tel"
                        placeholder={t('submission.placeholders.phone')}
                        {...register("director.phone", { required: "Le téléphone est requis" })}
                        className={errors.director?.phone ? "border-red-500 focus:border-red-500 text-red-600" : ""}
                    />
                    {errors.director?.phone && <ErrorMessage message={errors.director.phone.message} />}
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 mt-8 border-t border-slate-100">
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors"><Facebook className="w-4 h-4" /></div>
                    <Input type="text" placeholder={t('submission.placeholders.social_fb')} className="pl-12" {...register("director.social.facebook")} />
                </div>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent transition-colors"><Instagram className="w-4 h-4" /></div>
                    <Input type="text" placeholder={t('submission.placeholders.social_insta')} className="pl-12" {...register("director.social.instagram")} />
                </div>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors"><Twitter className="w-4 h-4" /></div>
                    <Input type="text" placeholder={t('submission.placeholders.social_x')} className="pl-12" {...register("director.social.twitter")} />
                </div>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-600 transition-colors"><Youtube className="w-4 h-4" /></div>
                    <Input type="text" placeholder={t('submission.placeholders.social_yt')} className="pl-12" {...register("director.social.youtube")} />
                </div>
            </div>
        </section>
    );
};

export default DirectorSection;