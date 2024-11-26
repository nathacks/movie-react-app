import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useLanguageStore } from '../store/languageStore.ts';
import en from './en';
import fr from './fr';

const resources = {
    en,
    fr,
};

i18n.use(initReactI18next)
    .init({
        resources,
        lng: useLanguageStore.getState().selectedLanguage,
        fallbackLng: 'en',
    });

export default i18n;
