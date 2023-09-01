import type { ValidationResponse } from '../../api/ValidationApiService';

export function createIbanValidationViewModel(validation?: ValidationResponse) {
    const results = [];

    if (validation) {
        results.push('Valid IBAN');
    }

    if (
        typeof validation?.bank?.trustScore === 'number' &&
        validation?.bank?.trustScore > 7
    ) {
        results.push('Trusted bank');
    }

    if (validation?.flags.includes('INSTANT')) {
        results.push('Accepts instant payments');
    }

    if (validation?.flags.includes('POSITIVE_HISTORY')) {
        results.push('Positive operation history');
    }

    if (validation && !validation?.flags.includes('SECURITY_CLAIMS')) {
        results.push('No security claims');
    }

    if (validation?.flags.includes('PSD2')) {
        results.push('Complies with Payment Services Directive (PSD2)');
    }

    return {
        validationResults: results,
        isValidationAvailable: Boolean(validation),
    };
}
