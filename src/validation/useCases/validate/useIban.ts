import { useQuery } from '@tanstack/react-query';

import { useValidationAdapterFactory } from '../../api/ValidationApiProvider';

export function useIban(iban: string) {
    const createIbanValidationApiAdapter = useValidationAdapterFactory();

    return useQuery(['validation', iban], createIbanValidationApiAdapter(iban), {
        enabled: Boolean(iban),
        retry: false,
    });
}
