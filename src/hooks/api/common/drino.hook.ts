import drino from 'drino';
import { useLanguageStore } from '../../../store/languageStore.ts';

import { API_KEY, MOVIE_DB_URL } from 'react-native-dotenv'

interface DrinoHookConfig {
    prefix?: string;
    delay?: number;
    setLoading?: (value: boolean) => void
    disableLoading?: boolean;
}

export function useDrino(config: DrinoHookConfig = {}) {
    const { selectedLocale, selectedLanguage } = useLanguageStore();

    const {} = config;

    return drino.create({
        baseUrl: MOVIE_DB_URL,
        requestsConfig: {
            queryParams: { api_key: API_KEY, language: selectedLocale, region: selectedLanguage }
        },
    });
}
