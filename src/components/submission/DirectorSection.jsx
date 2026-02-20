import {
  User,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ChevronRight,
} from 'lucide-react'
import Label from '../ui/Label'
import Input from '../ui/Input'

const DirectorSection = ({ t, register, errors }) => {
  const ErrorMessage = ({ message }) => (
    <p className="mt-1 ml-1 animate-pulse text-[10px] font-bold text-red-500">
      {message}
    </p>
  )

  return (
    <section className="relative overflow-hidden rounded-[3rem] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
      <div className="mb-10 flex items-center gap-4 border-b border-slate-100 pb-6">
        <div className="bg-primary/5 text-primary flex h-12 w-12 items-center justify-center rounded-2xl shadow-md">
          <User className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-lg leading-tight font-black tracking-widest uppercase">
            <span className="mr-2 opacity-50">01.</span>
            {t('sections.director.title')}
          </h2>
          <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            {t('sections.director.subtitle')}
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* PRENOM */}
        <div className="space-y-2">
          <Label>{t('sections.director.firstname')}</Label>
          <Input
            type="text"
            placeholder={t('placeholders.firstname')}
            {...register('director.firstname', {
              required: 'Prénom requis',
              minLength: {
                value: 2,
                message: 'Le prénom doit contenir au moins 2 caractères',
              },
              maxLength: {
                value: 100,
                message: 'Le prénom doit contenir moins de 100 caractères',
              },
            })}
            className={errors.director?.firstname ? 'border-red-500' : ''}
          />
          {errors.director?.firstname && (
            <ErrorMessage message={errors.director.firstname.message} />
          )}
        </div>
        {/* NOM */}
        <div className="space-y-2">
          <Label>{t('sections.director.lastname')}</Label>
          <Input
            type="text"
            placeholder={t('placeholders.lastname')}
            {...register('director.lastname', {
              required: 'Nom requis',minLength: {
                value: 2,
                message: 'Le prénom doit contenir au moins 2 caractères',
              },
              maxLength: {
                value: 100,
                message: 'Le prénom doit contenir moins de 100 caractères',
              },

            })}
            className={errors.director?.lastname ? 'border-red-500' : ''}
          />
          {errors.director?.lastname && (
            <ErrorMessage message={errors.director.lastname.message} />
          )}
        </div>
        {/* EMAIL */}
        <div className="space-y-2">
          <Label>{t('sections.director.email')}</Label>
          <Input
            type="email"
            placeholder={t('placeholders.email')}
            {...register('director.email', {
              required: "Email requis",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'veuillez renseigner un email valide',
              },
            })}
            className={errors.director?.email ? 'border-red-500' : ''}
          />
          {errors.director?.email && (
            <ErrorMessage message={errors.director.email.message} />
          )}
        </div>

        {/* PAYS (Nouveau) */}
        <div className="space-y-2">
          <Label>{t('sections.director.country')}</Label>
          <Input
            type="text"
            placeholder="FRANCE"
            {...register('director.country', {
              required: 'Pays requis', 
              maxLength: { 
                value: 100,
                message: 'Le pays saisi doit contenir moins de 100 caractères',
              },
            })}
            className={errors.director?.country ? 'border-red-500' : ''}
          />
          {errors.director?.country && (
            <ErrorMessage message={errors.director.country.message} />
          )}
        </div>

        {/* VILLE (Nouveau) */}
        <div className="space-y-2">
          <Label>{t('sections.director.city')}</Label>
          <Input
            type="text"
            placeholder="MARSEILLE"
            {...register('director.city',{
            
              maxLength: {
                value: 100,
                message: 'Le pays saisi doit contenir moins de 100 caractères',
              },
            })}
          />
        </div>

        {/* JOB (Nouveau) */}
        <div className="space-y-2">
          <Label>{t('sections.director.job')}</Label>
          <Input
            type="text"
            placeholder="ARTISTE 3D"
            {...register('director.job',
              {
              maxLength: {
                value: 100,
                message: 'Le métier saisi doit contenir moins de 100 caractères',
              },
            })}
          />

        </div>

        {/* GENRE */}
        <div className="space-y-2">
          <Label>{t('sections.director.gender')}</Label>
          <div className="relative">
            <select
              {...register('director.gender')}
              className="bg-mars-light text-mars-dark focus:border-primary w-full cursor-pointer appearance-none rounded-2xl border border-transparent px-6 py-4 text-sm font-bold uppercase transition-all focus:bg-white focus:outline-none"
            >
              <option value="M">
                {t('sections.director.gender_options.m')}
              </option>
              <option value="F">
                {t('sections.director.gender_options.f')}
              </option>
              <option value="O">
                {t('sections.director.gender_options.o')}
              </option>
            </select>
            <div className="pointer-events-none absolute top-1/2 right-6 -translate-y-1/2 text-slate-400">
              <ChevronRight className="h-4 w-4 rotate-90" />
            </div>
          </div>
        </div>

        {/* DATE NAISSANCE */}
        <div className="space-y-2">
          <Label>{t('sections.director.birthdate')}</Label>
          <Input
            type="date"
            {...register('director.birthdate', {
              required: ' date de naissance requise',
            })}
            className={errors.director?.birthdate ? 'border-red-500' : ''}
          />
          {errors.director?.birthdate && (
            <ErrorMessage message={errors.director.birthdate.message} />
          )}
        </div>

        {/* TELEPHONE */}
        <div className="space-y-2">
          <Label>{t('sections.director.phone')}</Label>
          <Input
            type="tel"
            placeholder={t('placeholders.phone')}
            {...register('director.phone', {
              required: 'téléphone requis',
            })}
            className={errors.director?.phone ? 'border-red-500' : ''}
          />
          {errors.director?.phone && (
            <ErrorMessage message={errors.director.phone.message} />
          )}
        </div>
      </div>

      {/* SOCIALS */}
      <div className="mt-8 grid gap-6 border-t border-slate-100 pt-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="group relative">
          <div className="group-focus-within:text-primary absolute top-1/2 left-4 -translate-y-1/2 text-slate-300 transition-colors">
            <Facebook className="h-4 w-4" />
          </div>
          <Input
            type="text"
            placeholder={t('placeholders.social_fb')}
            className="pl-12"
            {...register('director.social.facebook', { 
              })}
          />
        </div>
        <div className="group relative">
          <div className="group-focus-within:text-accent absolute top-1/2 left-4 -translate-y-1/2 text-slate-300 transition-colors">
            <Instagram className="h-4 w-4" />
          </div>
          <Input
            type="text"
            placeholder={t('placeholders.social_insta')}
            className="pl-12"
            {...register('director.social.instagram', { 
              })}
          />
        </div>
        <div className="group relative">
          <div className="group-focus-within:text-primary absolute top-1/2 left-4 -translate-y-1/2 text-slate-300 transition-colors">
            <Twitter className="h-4 w-4" />
          </div>
          <Input
            type="text"
            placeholder={t('placeholders.social_x')}
            className="pl-12"
            {...register('director.social.twitter', { 
              
              })}
          />
        </div>
        <div className="group relative">
          <div className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-red-600">
            <Youtube className="h-4 w-4" />
          </div>
          <Input
            type="text"
            placeholder={t('placeholders.social_yt')}
            className="pl-12"
            {...register('director.social.youtube', { 
              
              })}
          />
        </div>
      </div>
    </section>
  )
}

export default DirectorSection;
