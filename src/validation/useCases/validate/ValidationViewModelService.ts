import type { ValidationResponse } from '../../api/ValidationApiService';

export function createIbanValidationViewModel(validation?: ValidationResponse) {
    return {
        isValidationAvailable: Boolean(validation),
    };
}
