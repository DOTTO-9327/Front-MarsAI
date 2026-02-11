
import { Film, Clock, Check } from 'lucide-react' // Retrait des icônes inutilisées
import Label from '../ui/Label'
import Input from '../ui/Input'
import TextArea from '../ui/TextArea'
import { useRef } from 'react'

const ErrorMessage = ({ message }) => (
  <p className="mt-1 ml-1 animate-pulse text-[10px] font-bold text-red-500">
    {message}
  </p>
)

const FilmSection = ({ t, register, errors, watch, setValue }) => {
  const currentLang = watch('film.lang')
  const synopsisFr = watch('film.synopsisFr') || ''
  const synopsisEn = watch('film.synopsisEn') || ''
  const videofile = watch('film.videofile')

  const fileInputRef = useRef(null)

  // On extrait la ref de register pour la combiner
  const { ref: registerRef, ...fileRest } = register('film.videofile', {
    required: t('errors.video_required') || 'Vidéo requise',
  })

  return (
    <section className="relative overflow-hidden rounded-[3rem] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
      <div className="mb-10 flex items-center gap-4 border-b border-slate-100 pb-6">
        <div className="bg-primary/5 text-primary flex h-12 w-12 items-center justify-center rounded-2xl shadow-md">
          <Film className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-lg leading-tight font-black tracking-widest uppercase">
            <span className="mr-2 opacity-50">02.</span>
            {t('sections.film.title')}
          </h2>
          <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            {t('sections.film.subtitle')}
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* TITRES */}
        <div className="space-y-2">
          <Label>{t('sections.film.original_title')}</Label>
          <Input
            type="text"
            placeholder={t('placeholders.orig_title')}
            {...register('film.titleOriginal', { required: 'Requis' })}
            className={errors.film?.titleOriginal ? 'border-red-500' : ''}
          />
          {errors.film?.titleOriginal && (
            <ErrorMessage message={errors.film.titleOriginal.message} />
          )}
        </div>

        <div className="space-y-2">
          <Label>{t('sections.film.english_title')}</Label>
          <Input
            type="text"
            placeholder={t('placeholders.intl_title')}
            {...register('film.titleEnglish', { required: 'Requis' })}
            className={errors.film?.titleEnglish ? 'border-red-500' : ''}
          />
          {errors.film?.titleEnglish && (
            <ErrorMessage message={errors.film.titleEnglish.message} />
          )}
        </div>

        {/* LANGUE */}
        <div className="space-y-2">
          <Label>{t('sections.film.original_lang')}</Label>
          <div className="flex gap-4">
            {['FR', 'EN'].map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setValue('film.lang', l)}
                className={`flex-1 rounded-xl border py-4 text-[10px] font-black transition-all ${
                  currentLang === l
                    ? 'bg-primary border-primary text-white shadow-lg'
                    : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {t(`sections.film.lang_options.${l.toLowerCase()}`)}
              </button>
            ))}
          </div>
        </div>

        {/* DUREE */}
        <div className="space-y-2">
          <Label>{t('sections.film.duration')}</Label>
          <div className="group relative">
            <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-300">
              <Clock className="h-4 w-4" />
            </div>
            <Input
              type="number"
              placeholder="60"
              className={`pl-12 ${errors.film?.duration ? 'border-red-500' : ''}`}
              {...register('film.duration', {
                required: 'Durée requise',
                min: { value: 1, message: 'Min 1s' },
                max: { value: 60, message: 'Max 60s' },
              })}
            />
          </div>
          {errors.film?.duration && (
            <ErrorMessage message={errors.film.duration.message} />
          )}
        </div>

        {/* MOVIE UPLOAD */}
        <div className="space-y-2 md:col-span-2">
          <Label className="text-slate-400">
            {t('sections.film.movie_drag')}
          </Label>
          <div className="relative rounded-3xl border-2 border-transparent">
            <input
              type="file"
              hidden
              accept="video/mp4,video/x-m4v,video/*"
              {...fileRest}
              ref={(e) => {
                registerRef(e)
                fileInputRef.current = e
              }}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`group hover:border-primary hover:bg-primary/5 flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed transition-all ${
                errors.film?.videofile
                  ? 'border-red-500 bg-red-50'
                  : 'border-slate-200 bg-slate-50/50'
              }`}
            >
              {videofile && videofile.length > 0 ? (
                <div className="text-primary flex flex-col items-center">
                  <Check className="mb-2 h-10 w-10" />
                  <span className="text-sm font-bold text-black">
                    {videofile[0].name}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Cliquez pour modifier
                  </span>
                </div>
              ) : (
                <>
                  <Film className="group-hover:text-primary mb-4 h-10 w-10 text-slate-200 transition-all" />
                  <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase group-hover:text-black">
                    {t('sections.tech.cover_drag')}
                  </span>
                  <span className="mt-1 text-[8px] font-bold text-slate-400">
                    MP4 / MOV (Max 300Mo)
                  </span>
                </>
              )}
            </div>
            {errors.film?.videofile && (
              <ErrorMessage message={errors.film.videofile.message} />
            )}
          </div>
        </div>

        {/* SYNOPSIS FR */}
        <div className="space-y-2 md:col-span-2">
          <div className="flex justify-between">
            <Label>{t('sections.film.synopsis_orig')}</Label>
            <span
              className={`text-[8px] font-bold ${synopsisFr.length > 1000 ? 'text-red-500' : 'text-slate-400'}`}
            >
              {synopsisFr.length}/1000
            </span>
          </div>
          <TextArea
            rows={4}
            placeholder={t('placeholders.synopsis_orig')}
            {...register('film.synopsisFr', {
              required: 'Requis',
              maxLength: 1000,
            })}
            className={errors.film?.synopsisFr ? 'border-red-500' : ''}
          />
          {errors.film?.synopsisFr && (
            <ErrorMessage message={errors.film.synopsisFr.message} />
          )}
        </div>

        {/* SYNOPSIS EN */}
        <div className="space-y-2 md:col-span-2">
          <div className="flex justify-between">
            <Label>{t('sections.film.synopsis_en')}</Label>
            <span
              className={`text-[8px] font-bold ${synopsisEn.length > 1000 ? 'text-red-500' : 'text-slate-400'}`}
            >
              {synopsisEn.length}/1000
            </span>
          </div>
          <TextArea
            rows={4}
            placeholder={t('placeholders.synopsis_en')}
            {...register('film.synopsisEn', {
              required: 'Requis',
              maxLength: 1000,
            })}
            className={errors.film?.synopsisEn ? 'border-red-500' : ''}
          />
          {errors.film?.synopsisEn && (
            <ErrorMessage message={errors.film.synopsisEn.message} />
          )}
        </div>
      </div>
    </section>
  )
}

export default FilmSection
