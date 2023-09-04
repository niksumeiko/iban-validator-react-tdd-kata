import type { ChangeEvent, FormEvent } from 'react';
import { useCallback, useState } from 'react';

import { useIban } from './useIban';
import { createIbanValidationViewModel } from './ValidationViewModelService';

export function useIbanValidation() {
    const [formValues, setFormValues] = useState({ iban: '' });
    const [iban, setIban] = useState(formValues.iban);
    const { data, error } = useIban(iban);
    const model = createIbanValidationViewModel(data, error);

    const onIbanSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            setIban(formValues.iban);
            event.preventDefault();
        },
        [formValues.iban],
    );

    const onIbanChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setFormValues({ iban: event.target.value });
    }, []);

    return {
        ...model,
        onIbanSubmit,
        onIbanChange,
    };
}
