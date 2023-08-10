import type { ValidationDto } from '../../api/IbanValidationService';

export function getValidationStates(result?: ValidationDto) {
    if (!result) {
        return [];
    }

    const states = ['Valid IBAN'];
    const { bank = {}, flags } = result;

    if (typeof bank.trustScore === 'number' && bank.trustScore > 7) {
        states.push('Trusted bank');
    }

    if (flags.includes('INSTANT')) {
        states.push('Accepts instant payments');
    }

    if (flags.includes('POSITIVE_HISTORY')) {
        states.push('Positive operation history');
    }

    if (!flags.includes('SECURITY_CLAIMS')) {
        states.push('No security claims');
    }

    if (flags.includes('PSD2')) {
        states.push('Complies with Payment Services Directive (PSD2)');
    }

    return states;
}
