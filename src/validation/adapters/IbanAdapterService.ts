import type { Request } from '../../api/ApiService';
import { getValidApiResponse } from '../../api/ApiService';
import type { Iban } from '../domain/IbanService';

export interface ValidationResultDto {
    iban: Iban;
    flags: ('INSTANT' | 'POSITIVE_HISTORY' | 'SECURITY_CLAIMS' | 'PSD2')[];
    bank?: {
        trustScore?: number;
        name?: string;
        address?: {
            street?: string;
            city?: string;
            zip?: string;
            country?: string;
        };
    };
}

interface InputProps {
    iban: Iban;
}

interface Options {
    request?: Request;
}

export function createIbanValidationAdapter({ iban }: InputProps, options?: Options) {
    const request = options?.request ?? window.fetch;

    return async () => {
        const response = await request(`http://localhost:9000/validate?iban=${iban}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return getValidApiResponse<ValidationResultDto>(response);
    };
}
