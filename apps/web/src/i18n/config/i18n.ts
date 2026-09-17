import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from './locales/en/translation.json';
import slTranslation from './locales/sl/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    "en-GB": {
      translation: enTranslation
    },
    "sl": {
      translation: slTranslation
    },
  },
  lng: "en-GB",
  fallbackLng: "en-GB",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;