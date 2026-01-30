import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // Détecter la langue du navigateur
  .use(initReactI18next) 
  .init({
    debug: true,
    fallbackLng: 'fr', // Langue par défaut
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      fr: {
        translation: {
          hero: {
            badge: "Festival International du Film IA • Juin 2025",
            title_part1: "Imaginez des",
            title_part2: "Futurs souhaitables",
            description1: "Le festival de courts-métrages de 60 secondes réalisés par IA.",
            description2: "Vivez 2 jours d'immersion totale au cœur de Marseille.",
            cta: "Participer maintenant"
          },
          nav: {
            galerie: "Galerie",
            programme: "Programme & Infos",
            jury: "Jury"
          }
        }
      },
      en: {
        translation: {
          hero: {
            badge: "International AI Film Festival • June 2025",
            title_part1: "Imagine",
            title_part2: "Desirable Futures",
            description1: "The 60-second AI-generated short film festival.",
            description2: "Experience 2 days of total immersion in the heart of Marseille.",
            cta: "Participate now"
          },
          nav: {
            galerie: "Gallery",
            programme: "Program & Infos",
            jury: "Jury"
          }
        }
      }
    }
  });

export default i18n;