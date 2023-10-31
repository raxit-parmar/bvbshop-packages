import { fetch } from '../Utils';

export const cookieConsent = async ({ payload, apiInstance = null }): Promise<any> => {
    return await fetch(`/settings/cookieConsent`, {
        method: 'POST',
        body: payload,
        cache: true,
        apiInstance
    });
};
