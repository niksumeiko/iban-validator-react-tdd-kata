import { describe, expect, it } from 'vitest';

import { createIbanValidationViewModel } from '../ValidationViewModelService';

describe('validation view model retrieval', () => {
    describe('validation availability', () => {
        it('returns availability when validation is unavailable', () => {
            const validation = undefined;

            const result = createIbanValidationViewModel(validation);

            expect(result.isValidationAvailable).toBe(false);
        });

        it('returns availability when validation is available', () => {
            const validation = { iban: 'x', flags: ['INSTANT'] };

            const result = createIbanValidationViewModel(validation);

            expect(result.isValidationAvailable).toBe(true);
        });
    });
});
