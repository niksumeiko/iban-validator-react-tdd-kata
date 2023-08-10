import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { FormValues } from './ValidationFormService';
import { createIbanValidationRequest } from '../../api/IbanValidationService';
import { formatIban } from '../../domain/IbanService';
import { getValidationStates } from './ValidationStatesService';

interface HookResult {
    validate(values: FormValues): void;
    isLoading: boolean;
    isValid: boolean;
    formatted: string;
    states: string[];
}

export function useValidateIban(): HookResult {
    const [iban, setIban] = useState('');
    const result = useQuery(['validation', iban], createIbanValidationRequest({ iban }), {
        enabled: Boolean(iban),
    });

    const validate = (values: FormValues) => {
        setIban(values.iban);
    };

    return {
        validate,
        isLoading: result.isLoading,
        isValid: result.isSuccess,
        formatted: formatIban(iban),
        states: getValidationStates(result.data),
    };
}
