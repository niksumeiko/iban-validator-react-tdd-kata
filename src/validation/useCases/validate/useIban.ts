import { useQuery } from '@tanstack/react-query';

import type { Iban } from '../../domain/IbanService';
import { getValidApiResponse } from '../../../api/ApiService';
import type { ValidationResultDto } from '../../api/IbanValidationApiService';

export function useIban(iban: Iban) {
    return useQuery(
        ['validation', iban],
        async () => {
            const response = await window.fetch(
                `http://localhost:9000/validate?iban=${iban}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            return getValidApiResponse<ValidationResultDto>(response);
        },
        {
            enabled: Boolean(iban),
            retry: false,
        },
    );
}
