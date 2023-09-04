import { describe, expect, it } from 'vitest';

import { createIbanValidationViewModel } from '../ValidationViewModelService';
import type { ValidationResponse } from '../../../api/ValidationApiService';

describe('validation view model retrieval', () => {
    describe('validation availability', () => {
        it('returns availability when validation is unavailable', () => {
            const validation = undefined;

            const result = createIbanValidationViewModel(validation);

            expect(result.isValidationAvailable).toBe(false);
        });

        it('returns availability when validation is available', () => {
            const validation: ValidationResponse = { iban: 'x', flags: ['INSTANT'] };

            const result = createIbanValidationViewModel(validation);

            expect(result.isValidationAvailable).toBe(true);
        });
    });

    describe('validation results', () => {
        it('returns empty when validation is unavailable', () => {
            const validation = undefined;

            const result = createIbanValidationViewModel(validation);

            expect(result.validationResults).toEqual([]);
        });

        it('returns results when validation is available', () => {
            const validation: ValidationResponse = { iban: 'x', flags: [] };

            const result = createIbanValidationViewModel(validation);

            expect(result.validationResults).toContain('Valid IBAN');
        });

        it('returns results when iban belongs to a trusted bank', () => {
            const validation: ValidationResponse = {
                iban: 'x',
                flags: [],
                bank: {
                    trustScore: 8,
                },
            };

            const result = createIbanValidationViewModel(validation);

            expect(result.validationResults).toContain('Trusted bank');
        });

        it('returns results when instant payments are accepted', () => {
            const validation: ValidationResponse = {
                iban: 'x',
                flags: ['INSTANT'],
            };

            const result = createIbanValidationViewModel(validation);

            expect(result.validationResults).toContain('Accepts instant payments');
        });

        it('returns results when iban has positive operations history', () => {
            const validation: ValidationResponse = {
                iban: 'x',
                flags: ['POSITIVE_HISTORY'],
            };

            const result = createIbanValidationViewModel(validation);

            expect(result.validationResults).toContain('Positive operation history');
        });

        it('returns results when iban has no security claims', () => {
            const validation: ValidationResponse = {
                iban: 'x',
                flags: [],
            };

            const result = createIbanValidationViewModel(validation);

            expect(result.validationResults).toContain('No security claims');
        });

        it('returns results when iban complies with PSD2', () => {
            const validation: ValidationResponse = {
                iban: 'x',
                flags: ['PSD2'],
            };

            const result = createIbanValidationViewModel(validation);

            expect(result.validationResults).toContain(
                'Complies with Payment Services Directive (PSD2)',
            );
        });

        it('returns all results for valid iban', () => {
            const validation: ValidationResponse = {
                iban: 'x',
                flags: ['INSTANT', 'POSITIVE_HISTORY', 'PSD2'],
                bank: { trustScore: 8 },
            };

            const result = createIbanValidationViewModel(validation);

            expect(result.validationResults).toEqual([
                'Valid IBAN',
                'Trusted bank',
                'Accepts instant payments',
                'Positive operation history',
                'No security claims',
                'Complies with Payment Services Directive (PSD2)',
            ]);
        });
    });

    describe('validation error', () => {
        it('returns error message when iban is invalid', () => {
            const validation = undefined;
            const error = new Error();

            const result = createIbanValidationViewModel(validation, error);

            expect(result.validationError).toBe('This IBAN is invalid');
        });

        it('returns undefined when iban is valid', () => {
            const validation = { iban: 'x', flags: [] };
            const error = undefined;

            const result = createIbanValidationViewModel(validation, error);

            expect(result.validationError).toBeUndefined();
        });
    });
});
