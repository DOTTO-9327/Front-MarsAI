import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import homeFR from './locales/fr/home.json';
import submissionFR from './locales/fr/submission.json';
import homeEN from './locales/en/home.json';
import submissionEN from './locales/en/submission.json';

const resources = {
  fr: {
    home: homeFR,         
    submission: submissionFR 
  },
  en: {
    home: homeEN,
    submission: submissionEN
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    ns: ['home', 'submission'], 
    defaultNS: 'home',          
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;