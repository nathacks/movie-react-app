import i18n from 'i18next';
import { create, StoreApi, UseBoundStore } from 'zustand';
import * as RNLocalize from 'react-native-localize';
import { Language } from '../models/language.model.ts';

interface LanguageStoreSlice {
    selectedLocale: string;
    selectedLanguage: string;
    isLanguageLoading: boolean;
    setLanguage: (language: Language) => Promise<void>;
}

export type LanguageStore = UseBoundStore<StoreApi<LanguageStoreSlice>>

export const languages: Record<string, Language> = {
    en: { locale: 'en-US', lang: 'en' },
    fr: { locale: 'fr-FR', lang: 'fr' },
};

const selectedLanguage = RNLocalize.getLocales()[0].languageCode
const selectedLocale = RNLocalize.getLocales()[0].languageTag

export const useLanguageStore: LanguageStore = create<LanguageStoreSlice>((set) => ({
    selectedLocale,
    selectedLanguage,
    isLanguageLoading: false,
    setLanguage: async ({ lang, locale }: Language) => {
        set({ isLanguageLoading: true });
        await i18n.changeLanguage(lang);
        set({ selectedLanguage: lang, selectedLocale: locale, isLanguageLoading: false });
    },
}))




