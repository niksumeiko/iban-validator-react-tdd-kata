import type { ValidationResponse } from '../../api/ValidationApiService';

function hasTrustedBank(bank: ValidationResponse['bank']): boolean {
    if (typeof bank?.trustScore !== 'number') {
        return false;
    }

    return bank.trustScore > 7;
}

function getValidationError(error?: unknown) {
    if (!error) {
        return undefined;
    }

    return 'This IBAN is invalid';
}

export function createIbanValidationViewModel(
    validation?: ValidationResponse,
    error?: unknown,
) {
    const validationError = getValidationError(error);

    if (!validation) {
        return {
            validationError,
            validationResults: [],
            isValidationAvailable: false,
        };
    }

    const results = ['Valid IBAN'];
    const { bank, flags } = validation;

    if (hasTrustedBank(bank)) {
        results.push('Trusted bank');
    }

    if (flags.includes('INSTANT')) {
        results.push('Accepts instant payments');
    }

    if (flags.includes('POSITIVE_HISTORY')) {
        results.push('Positive operation history');
    }

    if (!flags.includes('SECURITY_CLAIMS')) {
        results.push('No security claims');
    }

    if (flags.includes('PSD2')) {
        results.push('Complies with Payment Services Directive (PSD2)');
    }

    return {
        validationError,
        validationResults: results,
        isValidationAvailable: Boolean(validation),
    };
}
