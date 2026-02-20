import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import homeFR from './locales/fr/home.json';
import submissionFR from './locales/fr/submission.json';
import homeEN from './locales/en/home.json';
import submissionEN from './locales/en/submission.json';
import galerieFR from './locales/fr/galerie.json';
import galerieEN from './locales/en/galerie.json';
import programEN from './locales/en/program.json';
import programFR from './locales/fr/program.json';

const resources = {
  fr: {
    home: homeFR,         
    submission: submissionFR, 
    galerie: galerieFR,
    program: programFR
  },
  en: {
    home: homeEN,
    submission: submissionEN,
    galerie: galerieEN,
    program: programEN
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    ns: ['home', 'submission', 'galerie', 'program'], 
    defaultNS: 'home',          
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;