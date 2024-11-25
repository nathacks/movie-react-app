import drino from 'drino';
import { API_KEY, BACKEND_URL } from '../../../../app.config';

interface DrinoHookConfig {
    prefix?: string;
    delay?: number;
    setLoading?: (value: boolean) => void
    disableLoading?: boolean;
}

export function useDrino(config: DrinoHookConfig = {}) {
    const { prefix } = config;

    return drino.create({
        baseUrl: BACKEND_URL,
        requestsConfig: {
            prefix: prefix ?? '/api',
            queryParams: { api_key: API_KEY, language: 'fr-FR', include_adult: false }
        },

    });
}
