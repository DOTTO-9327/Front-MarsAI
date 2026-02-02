import React from 'react';
import { Film, Youtube } from 'lucide-react';
import Label from '../ui/Label';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';

const FilmSection = ({ t, register, errors, watch, setValue }) => {
    const currentLang = watch('film.lang');
    const synopsisFr = watch('film.synopsisFr') || '';
    const synopsisEn = watch('film.synopsisEn') || '';

    const ErrorMessage = ({ message }) => (
        <p className="text-[10px] font-bold text-red-500 ml-1 mt-1 animate-pulse">
            {message}
        </p>
    );

    return (
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

                {/* --- TITRE ORIGINAL --- */}
                <div className="space-y-2">
                    <Label>{t('submission.sections.film.original_title')}</Label>
                    <Input
                        type="text"
                        placeholder={t('submission.placeholders.orig_title')}
                        {...register("film.titleOriginal", { required: "Le titre original est requis" })}
                        className={errors.film?.titleOriginal ? "border-red-500 focus:border-red-500 text-red-600" : ""}
                    />
                    {errors.film?.titleOriginal && <ErrorMessage message={errors.film.titleOriginal.message} />}
                </div>

                {/* --- TITRE ANGLAIS --- */}
                <div className="space-y-2">
                    <Label>{t('submission.sections.film.english_title')}</Label>
                    <Input
                        type="text"
                        placeholder={t('submission.placeholders.intl_title')}
                        {...register("film.titleEnglish", { required: "Le titre anglais est requis" })}
                        className={errors.film?.titleEnglish ? "border-red-500 focus:border-red-500 text-red-600" : ""}
                    />
                    {errors.film?.titleEnglish && <ErrorMessage message={errors.film.titleEnglish.message} />}
                </div>

                {/* --- LANGUE ORIGINALE --- */}
                <div className="space-y-2">
                    <Label>{t('submission.sections.film.original_lang')}</Label>
                    <div className="flex gap-4">
                        {['FR', 'EN'].map((l) => (
                            <button
                                key={l}
                                type="button"
                                onClick={() => setValue('film.lang', l)}
                                className={`flex-1 py-4 rounded-xl border text-[10px] font-black transition-all ${currentLang === l ? 'bg-primary border-primary text-white shadow-lg' : 'bg-mars-light border-slate-200 text-slate-500 hover:bg-slate-200'
                                    }`}
                            >
                                {t(`submission.sections.film.lang_options.${l.toLowerCase()}`)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- YOUTUBE --- */}
                <div className="space-y-2">
                    <Label>{t('submission.sections.film.youtube')}</Label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-600 transition-colors pointer-events-none">
                            <Youtube className="w-4 h-4" />
                        </div>
                        <Input
                            type="url"
                            placeholder={t('submission.placeholders.youtube')}
                            className={`pl-12 pr-6 ${errors.film?.youtube ? "border-red-500 focus:border-red-500 text-red-600" : ""}`}
                            {...register("film.youtube", {
                                required: "Le lien est requis",
                                pattern: {
                                    value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
                                    message: "URL Youtube invalide"
                                }
                            })}
                        />
                    </div>
                    {errors.film?.youtube && <ErrorMessage message={errors.film.youtube.message} />}
                </div>

                {/* --- SYNOPSIS FR --- */}
                <div className="md:col-span-2 space-y-2">
                    <div className="flex justify-between">
                        <Label>{t('submission.sections.film.synopsis_orig')}</Label>
                        <span className={`text-[8px] font-bold transition-colors ${synopsisFr.length >= 1000 ? 'text-red-500' : 'text-slate-400'}`}>
                            {synopsisFr.length}/1000
                        </span>
                    </div>
                    <TextArea
                        rows={4}
                        placeholder={t('submission.placeholders.synopsis_orig')}
                        {...register("film.synopsisFr", {
                            required: "Le synopsis original est requis",
                            maxLength: { value: 1000, message: "Trop long (max 1000 caractères)" }
                        })}
                        className={errors.film?.synopsisFr || synopsisFr.length >= 1000 ? "border-red-500 focus:border-red-500" : ""}
                    />
                    {errors.film?.synopsisFr && <ErrorMessage message={errors.film.synopsisFr.message} />}
                </div>

                {/* --- SYNOPSIS EN --- */}
                <div className="md:col-span-2 space-y-2">
                    <div className="flex justify-between">
                        <Label>{t('submission.sections.film.synopsis_en')}</Label>
                        <span className={`text-[8px] font-bold transition-colors ${synopsisEn.length >= 1000 ? 'text-red-500' : 'text-slate-400'}`}>
                            {synopsisEn.length}/1000
                        </span>
                    </div>
                    <TextArea
                        rows={4}
                        placeholder={t('submission.placeholders.synopsis_en')}
                        {...register("film.synopsisEn", {
                            required: "Le synopsis anglais est requis",
                            maxLength: { value: 1000, message: "Trop long (max 1000 caractères)" }
                        })}
                        className={errors.film?.synopsisEn || synopsisEn.length >= 1000 ? "border-red-500 focus:border-red-500" : ""}
                    />
                    {errors.film?.synopsisEn && <ErrorMessage message={errors.film.synopsisEn.message} />}
                </div>
            </div>
        </section>
    );
};

export default FilmSection;