import { useQuery } from '@tanstack/react-query';

import { useCountryAdapterFactory } from '../../adapters/CountryAdapterProvider';

export function useCountry(countryCode: string) {
    const createCountryAdapter = useCountryAdapterFactory();

    return useQuery(['country', countryCode], createCountryAdapter({ countryCode }), {
        enabled: Boolean(countryCode),
        retry: false,
    });
}
