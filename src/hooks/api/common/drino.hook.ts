import drino from 'drino';
import { API_KEY, BACKEND_URL } from '../../../../app.config';
import { useLanguageStore } from '../../../store/languageStore.ts';

interface DrinoHookConfig {
    prefix?: string;
    delay?: number;
    setLoading?: (value: boolean) => void
    disableLoading?: boolean;
}

export function useDrino(config: DrinoHookConfig = {}) {
    const { selectedLocale } = useLanguageStore();

    const { prefix } = config;

    return drino.create({
        baseUrl: BACKEND_URL,
        requestsConfig: {
            prefix: prefix ?? '/api',
            queryParams: { api_key: API_KEY, language: selectedLocale, include_adult: false }
        },

    });
}
