import { useRef } from 'react'
import { Sparkles, Check, ImageIcon, Zap } from 'lucide-react'
import Label from '../ui/Label'
import TextArea from '../ui/TextArea'

const ErrorMessage = ({ message }) => (
  <p className="mt-1 ml-1 animate-pulse text-[10px] font-bold text-red-500">
    {message}
  </p>
)

const TechSection = ({ t, register, errors, watch, setValue }) => {
  const isHybrid = watch('tech.isHybrid')
  const hasSubs = watch('tech.hasSubs')
  const toolsUsed = watch('tech.toolsUsed') || ''
  const creativeProcess = watch('tech.creativeProcess') || ''

  // Upload setup
  const coverFile = watch('tech.cover')
  const fileInputRef = useRef(null)
  const { ref: fileRef, ...fileRest } = register('tech.cover', {
    required: 'Affiche requise',
  })

  return (
    <section className="bg-mars-dark relative overflow-hidden rounded-[3rem] border border-white/10 p-8 text-white shadow-2xl md:p-12">
      <div className="pointer-events-none absolute top-0 right-0 scale-150 rotate-12 p-12 opacity-5">
        <Zap className="text-primary h-32 w-32" />
      </div>

      <div className="relative z-10 mb-10 flex items-center gap-4 border-b border-white/10 pb-6">
        <div className="bg-primary shadow-primary/30 flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-lg leading-tight font-black tracking-widest uppercase">
            <span className="mr-2 opacity-50">03.</span>
            {t('sections.tech.title')}
          </h2>
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            {t('sections.tech.subtitle')}
          </p>
        </div>
      </div>

      <div className="relative z-10 grid gap-8 md:grid-cols-2">
        {/* CLASSIFICATION */}
        <div className="space-y-4">
          <Label className="text-slate-400">
            {t('sections.tech.classification')}
          </Label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setValue('tech.isHybrid', false)}
              className={`flex-1 rounded-2xl border p-6 text-left transition-all active:scale-95 ${!isHybrid ? 'bg-primary border-primary' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
            >
              <div className="mb-1 text-[10px] font-black text-white uppercase">
                {t('sections.tech.type_ai.title')}
              </div>
              <div
                className={`text-[8px] font-bold ${!isHybrid ? 'text-white/70' : 'text-slate-500'}`}
              >
                {t('sections.tech.type_ai.sub')}
              </div>
            </button>
            <button
              type="button"
              onClick={() => setValue('tech.isHybrid', true)}
              className={`flex-1 rounded-2xl border p-6 text-left transition-all active:scale-95 ${isHybrid ? 'bg-primary border-primary' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
            >
              <div className="mb-1 text-[10px] font-black text-white uppercase">
                {t('sections.tech.type_hybrid.title')}
              </div>
              <div
                className={`text-[8px] font-bold ${isHybrid ? 'text-white/70' : 'text-slate-500'}`}
              >
                {t('sections.tech.type_hybrid.sub')}
              </div>
            </button>
          </div>
        </div>

        {/* SUBS */}
        <div className="space-y-4">
          <Label className="text-slate-400">
            {t('sections.tech.subtitles')}
          </Label>
          <div
            onClick={() => setValue('tech.hasSubs', !hasSubs)}
            className={`group flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition-all ${hasSubs ? 'bg-primary/10 border-primary' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${hasSubs ? 'border-primary bg-primary' : 'border-white/20'}`}
            >
              {hasSubs && <Check className="h-3 w-3 text-white" />}
            </div>
            <span
              className={`text-[10px] font-black uppercase transition-colors ${hasSubs ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}
            >
              {t('sections.tech.subtitles_label')}
            </span>
          </div>
        </div>

        {/* TOOLS & PROCESS */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-slate-400">{t('sections.tech.tools')}</Label>
            <span
              className={`text-[8px] font-bold transition-colors ${toolsUsed.length >= 500 ? 'text-red-500' : 'text-slate-500'}`}
            >
              {toolsUsed.length}/500
            </span>
          </div>
          <TextArea
            rows={4}
            placeholder={t('placeholders.tools')}
            {...register('tech.toolsUsed', {
              required: 'Outils IA utilisés requis',
              maxLength: 500, minLength: {
                value: 2,
                message: 'Le champ outils IA saisi doit contenir au moins 2 caractères',
              },
              maxLength: {
                value: 500,
                message: 'Le champ outils IA saisi doit contenir moins de 500 caractères',
              },
            })}
            className={`focus:border-primary bg-white/5 text-white placeholder:text-slate-500 focus:bg-white/10 ${errors.tech?.toolsUsed || toolsUsed.length >= 500 ? 'border-red-500' : 'border-white/10'}`}
          />
          {errors.tech?.toolsUsed && (
            <ErrorMessage message={errors.tech.toolsUsed.message} />
          )}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-slate-400">
              {t('sections.tech.process')}
            </Label>
            <span
              className={`text-[8px] font-bold transition-colors ${creativeProcess.length >= 500 ? 'text-red-500' : 'text-slate-500'}`}
            >
              {creativeProcess.length}/500
            </span>
          </div>
          <TextArea
            rows={4}
            placeholder={t('placeholders.process')}
            {...register('tech.creativeProcess', {
              required: 'Processus de créativité requis',minLength: {
                value: 2,
                message: 'Le champ processus de créativité saisi doit contenir au moins 2 caractères',
              },
              maxLength: {
                value: 500,
                message: 'Le champ processus de créativité saisi doit contenir moins de 500 caractères',
              },
            })}
            className={`focus:border-primary bg-white/5 text-white placeholder:text-slate-500 focus:bg-white/10 ${errors.tech?.creativeProcess || creativeProcess.length >= 500 ? 'border-red-500' : 'border-white/10'}`}
          />
          {errors.tech?.creativeProcess && (
            <ErrorMessage message={errors.tech.creativeProcess.message} />
          )}
        </div>

        {/* COVER UPLOAD */}
        <div className="space-y-2 md:col-span-2">
          <Label className="text-slate-400">{t('sections.tech.cover')}</Label>
          <input
            type="file"
            hidden
            accept="image/png, image/jpeg"
            {...fileRest}
            ref={(e) => {
              fileRef(e)
              fileInputRef.current = e
            }}
            onChange={(e) => {
              fileRest.onChange(e) // Notifier RHF
            }}
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`group hover:border-primary hover:bg-primary/5 flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed bg-white/5 transition-all ${errors.tech?.cover ? 'border-red-500' : 'border-white/10'}`}
          >
            {coverFile && coverFile.length > 0 ? (
              <div className="text-primary flex flex-col items-center">
                <Check className="mb-2 h-10 w-10" />
                <span className="text-sm font-bold">{coverFile[0].name}</span>
              </div>
            ) : (
              <>
                <ImageIcon className="group-hover:text-primary mb-4 h-10 w-10 text-white/10 transition-all" />
                <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase group-hover:text-white">
                  {t('sections.tech.cover_drag')}
                </span>
                <span className="mt-1 text-[8px] font-bold text-slate-600">
                  JPG / PNG (Max 2Mo)
                </span>
              </>
            )}
          </div>
          {errors.tech?.cover && (
            <ErrorMessage message={errors.tech.cover.message} />
          )}
        </div>
      </div>
    </section>
  )
}

export default TechSection;
