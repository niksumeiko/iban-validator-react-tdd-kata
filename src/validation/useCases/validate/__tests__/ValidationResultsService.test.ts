import { describe, expect, it } from 'vitest';

import { getValidationResults } from '../ValidationResultsService';
import type { ValidationResultDto } from '../../../adapters/IbanAdapterService';

describe('ValidationResultsService', () => {
    describe('states retrieval', () => {
        it('returns empty when validation response is unavailable', () => {
            const response = undefined;

            const result = getValidationResults(response);

            expect(result).toEqual([]);
        });

        it('returns state when validation response is available', () => {
            const response = { iban: 'x', flags: [] };

            const result = getValidationResults(response);

            expect(result.includes('Valid IBAN')).toBe(true);
        });

        it('returns state when bank trust score is over 7', () => {
            const response = {
                iban: 'x',
                flags: [],
                bank: {
                    trustScore: 8,
                },
            };

            const result = getValidationResults(response);

            expect(result.includes('Trusted bank')).toBe(true);
        });

        it('returns state when instant payments are accepted', () => {
            const response: ValidationResultDto = {
                iban: 'x',
                flags: ['INSTANT'],
            };

            const result = getValidationResults(response);

            expect(result.includes('Accepts instant payments')).toBe(true);
        });

        it('returns state when iban has positive operations history', () => {
            const response: ValidationResultDto = {
                iban: 'x',
                flags: ['POSITIVE_HISTORY'],
            };

            const result = getValidationResults(response);

            expect(result.includes('Positive operation history')).toBe(true);
        });

        it('returns state when iban has no security claims', () => {
            const response: ValidationResultDto = {
                iban: 'x',
                flags: [],
            };

            const result = getValidationResults(response);

            expect(result.includes('No security claims')).toBe(true);
        });

        it('returns state when iban complies with PSD2', () => {
            const response: ValidationResultDto = {
                iban: 'x',
                flags: ['PSD2'],
            };

            const result = getValidationResults(response);

            expect(
                result.includes('Complies with Payment Services Directive (PSD2)'),
            ).toBe(true);
        });

        it('returns all states for valid iban', () => {
            const response: ValidationResultDto = {
                iban: 'x',
                flags: ['INSTANT', 'POSITIVE_HISTORY', 'PSD2'],
                bank: { trustScore: 8 },
            };

            const result = getValidationResults(response);

            expect(result).toEqual([
                'Valid IBAN',
                'Trusted bank',
                'Accepts instant payments',
                'Positive operation history',
                'No security claims',
                'Complies with Payment Services Directive (PSD2)',
            ]);
        });
    });
});
