import drino from 'drino';
import { useLanguageStore } from '../../../store/languageStore.ts';

import { API_KEY } from 'react-native-dotenv'

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
        requestsConfig: {
            queryParams: { api_key: API_KEY, language: selectedLocale, region: selectedLanguage }
        },
    });
}
