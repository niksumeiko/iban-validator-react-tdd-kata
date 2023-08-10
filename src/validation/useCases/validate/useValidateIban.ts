import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { FormValues } from './ValidationFormService';
import { createIbanValidationRequest } from '../../api/IbanValidationService';
import { formatIban } from '../../domain/IbanService';
import { getValidationStates } from './ValidationStatesService';

interface HookResult {
    validate(values: FormValues): void;
    isValidating: boolean;
    isValidationResultAvailable: boolean;
    isInvalid: boolean;
    formatted: string;
    states: string[];
}

export function useValidateIban(): HookResult {
    const [iban, setIban] = useState('');
    const result = useQuery(['validation', iban], createIbanValidationRequest({ iban }), {
        enabled: Boolean(iban),
        retry: false,
    });

    const validate = (values: FormValues) => {
        setIban(values.iban);
    };

    return {
        validate,
        isValidating: result.isLoading,
        isValidationResultAvailable: result.isSuccess,
        isInvalid: result.isError,
        formatted: formatIban(iban),
        states: getValidationStates(result.data),
    };
}
