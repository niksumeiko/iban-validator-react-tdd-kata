import type { ValidationResponse } from '../../api/ValidationApiService';

function hasTrustedBank(bank: ValidationResponse['bank']): boolean {
    if (typeof bank?.trustScore !== 'number') {
        return false;
    }

    return bank.trustScore > 7;
}

export function createIbanValidationViewModel(validation?: ValidationResponse) {
    if (!validation) {
        return {
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
        validationResults: results,
        isValidationAvailable: Boolean(validation),
    };
}
