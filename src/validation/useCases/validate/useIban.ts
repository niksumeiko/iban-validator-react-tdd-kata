import { useQuery } from '@tanstack/react-query';

import { createIbanValidationAdapter } from '../../adapters/IbanAdapterService';
import type { Iban } from '../../domain/IbanService';

export function useIban(iban: Iban) {
    return useQuery(['validation', iban], createIbanValidationAdapter({ iban }), {
        enabled: Boolean(iban),
        retry: false,
    });
}
