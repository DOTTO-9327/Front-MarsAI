import React, { useState } from 'react'
import { 
  User, Film, Sparkles, Users2, Rocket, ShieldCheck, 
  Facebook, Instagram, Twitter, Youtube, ImageIcon, Zap, 
  Plus, Trash2, ChevronRight, Check
} from 'lucide-react'
import Label from '../components/ui/Label'
import Input from '../components/ui/Input'
import TextArea from '../components/ui/TextArea'

const SubmissionForm = () => {
  const [lang, setLang] = useState('FR')
  const [isHybrid, setIsHybrid] = useState(false)
  const [hasSubs, setHasSubs] = useState(false)

  return (
    <div className="w-full bg-mars-light text-mars-dark font-sans pb-20 selection:bg-primary selection:text-white pt-10">
      
      <div className="max-w-5xl mx-auto px-6 space-y-12 animate-fade-in-up">
        
        {/* --- PAGE HEADER --- */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 text-accent bg-accent/5 px-4 py-1.5 rounded-full border border-accent/10">
            <Rocket className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Appel à Projets 2026</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
            Soumission <br/><span className="text-primary">Officielle</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Aucun compte requis. Remplissez les détails de votre film IA. <br/>
            Un lien d'édition sécurisé vous sera envoyé par email après validation.
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
                <span className="opacity-50 mr-2">01.</span>Profil du Réalisateur
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Identité et coordonnées</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              <Label>Prénom *</Label>
              <Input type="text" placeholder="JEAN" />
            </div>
            <div className="space-y-2">
              <Label>Nom *</Label>
              <Input type="text" placeholder="DUPONT" />
            </div>
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input type="email" placeholder="JEAN@EXEMPLE.COM" />
            </div>
            
            <div className="space-y-2">
              <Label>Genre *</Label>
              <div className="relative">
                <select className="w-full bg-mars-light border border-transparent px-6 py-4 rounded-2xl font-bold text-sm text-mars-dark appearance-none focus:outline-none focus:bg-white focus:border-primary focus:shadow-lg focus:shadow-primary/10 transition-all uppercase cursor-pointer">
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                  <option value="O">Autre</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Date de Naissance *</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Téléphone *</Label>
              <Input type="tel" placeholder="+33 6..." />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 mt-8 border-t border-slate-100">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors"><Facebook className="w-4 h-4" /></div>
              <Input type="text" placeholder="FACEBOOK" className="pl-12" />
            </div>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent transition-colors"><Instagram className="w-4 h-4" /></div>
              <Input type="text" placeholder="INSTAGRAM" className="pl-12" />
            </div>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors"><Twitter className="w-4 h-4" /></div>
              <Input type="text" placeholder="TWITTER / X" className="pl-12" />
            </div>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-600 transition-colors"><Youtube className="w-4 h-4" /></div>
              <Input type="text" placeholder="YOUTUBE" className="pl-12" />
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
                <span className="opacity-50 mr-2">02.</span>Détails de l'œuvre
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Informations artistiques</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label>Titre Original *</Label>
              <Input type="text" placeholder="TITRE EN LANGUE D'ORIGINE" />
            </div>
            <div className="space-y-2">
              <Label>Titre Anglais *</Label>
              <Input type="text" placeholder="INTERNATIONAL TITLE" />
            </div>
            
            <div className="space-y-2">
              <Label>Langue d'origine *</Label>
              <div className="flex gap-4">
                <button type="button" onClick={() => setLang('FR')} className={`flex-1 py-4 rounded-xl border text-[10px] font-black transition-all ${lang === 'FR' ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-mars-light border-slate-200 text-slate-500 hover:bg-slate-200'}`}>FRANÇAIS</button>
                <button type="button" onClick={() => setLang('EN')} className={`flex-1 py-4 rounded-xl border text-[10px] font-black transition-all ${lang === 'EN' ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-mars-light border-slate-200 text-slate-500 hover:bg-slate-200'}`}>ANGLAIS</button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Lien Youtube *</Label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-600 transition-colors"><Youtube className="w-4 h-4" /></div>
                <Input type="url" placeholder="HTTPS://YOUTUBE.COM/WATCH?V=..." className="pl-12 pr-6" />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <div className="flex justify-between">
                <Label>Synopsis Original *</Label>
                <span className="text-[8px] font-bold text-slate-400">0/1000</span>
              </div>
              <TextArea rows={4} placeholder="DÉCRIVEZ VOTRE HISTOIRE..." />
            </div>

            <div className="md:col-span-2 space-y-2">
              <div className="flex justify-between">
                <Label>English Synopsis *</Label>
                <span className="text-[8px] font-bold text-slate-400">0/1000</span>
              </div>
              <TextArea rows={4} placeholder="TRANSLATE YOUR VISION..." />
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
                <span className="opacity-50 mr-2">03.</span>Expertise Technique IA
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Méthodologie et outils</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-4">
              <Label className="text-slate-400">Classification *</Label>
              <div className="flex gap-4">
                <button type="button" onClick={() => setIsHybrid(false)} className={`flex-1 p-6 rounded-2xl border transition-all text-left active:scale-95 ${!isHybrid ? 'bg-primary border-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                  <div className="text-[10px] font-black uppercase mb-1 text-white">Génération 100% IA</div>
                  <div className={`text-[8px] font-bold ${!isHybrid ? 'text-white/70' : 'text-slate-500'}`}>Sans prises réelles</div>
                </button>
                <button type="button" onClick={() => setIsHybrid(true)} className={`flex-1 p-6 rounded-2xl border transition-all text-left active:scale-95 ${isHybrid ? 'bg-primary border-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                  <div className="text-[10px] font-black uppercase mb-1 text-white">Production Hybride</div>
                  <div className={`text-[8px] font-bold ${isHybrid ? 'text-white/70' : 'text-slate-500'}`}>Tournage + IA</div>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-slate-400">Sous-titrage *</Label>
              <div onClick={() => setHasSubs(!hasSubs)} className={`flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all group ${hasSubs ? 'bg-primary/10 border-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${hasSubs ? 'border-primary bg-primary' : 'border-white/20'}`}>
                  {hasSubs && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-[10px] font-black uppercase transition-colors ${hasSubs ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                  Sous-titres intégrés dans la vidéo (Hardcoded)
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-400">Outils IA *</Label>
              {/* On surcharge le style pour le thème sombre */}
              <TextArea rows={4} placeholder="MIDJOURNEY, RUNWAY, PIKA..." className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-primary" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-400">Processus Créatif *</Label>
              <TextArea rows={4} placeholder="DÉCRIVEZ L'INTERACTION HUMAIN-MACHINE..." className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-primary" />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label className="text-slate-400">Affiche du film (Cover) *</Label>
              <div className="w-full h-48 border-2 border-dashed border-white/10 rounded-3xl bg-white/5 flex flex-col items-center justify-center group hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                <ImageIcon className="w-10 h-10 text-white/10 group-hover:text-primary transition-all mb-4" />
                <span className="text-[10px] font-black text-slate-500 group-hover:text-white uppercase tracking-widest">Glisser-déposer ou cliquer pour uploader</span>
                <span className="text-[8px] font-bold text-slate-600 mt-1">JPG / PNG (Max 2Mo)</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 04 : ÉQUIPE
           ========================================================================= */}
        <section className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-10">
            <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center shadow-md">
              <Users2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black uppercase tracking-widest leading-tight">
                <span className="opacity-50 mr-2">04.</span>Composition de l'Équipe
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Générique technique</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-mars-light/50 rounded-4xl border border-slate-100 relative group hover:border-primary/20 transition-colors">
              <div className="space-y-2">
                <Label className="text-[8px]">Prénom</Label>
                {/* Surcharge pour le fond blanc */}
                <Input type="text" defaultValue="JEAN" className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label className="text-[8px]">Nom</Label>
                <Input type="text" defaultValue="VALJEAN" className="bg-white" />
              </div>
              <div className="md:col-span-2 flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label className="text-[8px]">Rôle</Label>
                  <Input type="text" defaultValue="SOUND DESIGN" className="bg-white" />
                </div>
                <div className="flex items-end">
                   <button className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                     <Trash2 className="w-4 h-4" />
                   </button>
                </div>
              </div>
            </div>
            
            <button className="w-full py-5 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Ajouter un collaborateur
            </button>
          </div>
        </section>

        {/* --- VALIDATION & LEGAL --- */}
        <div className="flex flex-col items-center gap-10 pt-8 pb-10">
          <div className="max-w-xl p-8 bg-primary/5 border border-primary/10 rounded-[2.5rem] flex gap-5 items-start">
            <ShieldCheck className="w-8 h-8 text-primary shrink-0 mt-1" />
            <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed tracking-tight">
              En soumettant ce dossier, vous certifiez détenir les droits d'exploitation de l'œuvre et autorisez MARS.A.I à utiliser ces éléments pour la promotion du festival.
            </p>
          </div>

          <button className="w-full md:w-112.5 bg-primary text-white py-7 rounded-[2.2rem] text-sm font-black uppercase tracking-[0.4em] shadow-2xl shadow-primary/30 hover:-translate-y-1 hover:shadow-primary/50 active:scale-95 transition-all flex items-center justify-center gap-4 group cursor-pointer">
            Finaliser mon Inscription
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  )
}

export default SubmissionForm