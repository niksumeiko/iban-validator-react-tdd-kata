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
