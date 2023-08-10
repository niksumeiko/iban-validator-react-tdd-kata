import { useState } from 'react';

import type { FormValues } from './ValidationFormService';
import { formatIban } from '../../domain/IbanService';
import { getValidationResults } from './ValidationResultsService';
import { useIban } from './useIban';
import { useCountry } from './useCountry';

export function useValidationPage() {
    const [iban, setIban] = useState('');
    const { isLoading, isSuccess, isError, data: result } = useIban(iban);
    const { data } = useCountry(result?.bank?.address?.country ?? '');

    const validate = (values: FormValues) => {
        setIban(values.iban);
    };

    return {
        validate,
        isValidating: isLoading,
        isAvailable: isSuccess,
        isInvalid: isError,
        formatted: formatIban(iban),
        results: getValidationResults(result),
        currency: data?.currency,
    };
}
