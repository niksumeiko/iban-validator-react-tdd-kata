import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import {
    Button,
    FocusPageLayout,
    FormField,
    HeroTitle,
    MagnifyingGlassIcon,
    PositiveList,
    TextInput,
} from '../../../design-system';
import { useValidationAdapterFactory } from '../../api/ValidationApiProvider';
import { createIbanValidationViewModel } from './ValidationViewModelService';

export const ValidationPage = () => {
    const createIbanValidationApiAdapter = useValidationAdapterFactory();
    const [formValues, setFormValues] = useState({ iban: '' });
    const [iban, setIban] = useState(formValues.iban);
    const { data } = useQuery(
        ['validation', iban],
        createIbanValidationApiAdapter(iban),
        {
            enabled: Boolean(iban),
            retry: false,
        },
    );
    const model = createIbanValidationViewModel(data);

    return (
        <FocusPageLayout>
            <HeroTitle title="IBAN Validator" />
            <form
                onSubmit={(event) => {
                    setIban(formValues.iban);
                    event.preventDefault();
                }}
                autoComplete="off"
            >
                <FormField
                    button={
                        <Button type="submit">
                            <MagnifyingGlassIcon />
                        </Button>
                    }
                >
                    <TextInput
                        data-test="iban-entry"
                        placeholder="Type IBAN…"
                        onChange={(event) => {
                            setFormValues({ iban: event.target.value });
                        }}
                    />
                </FormField>
            </form>
            {model.isValidationAvailable && (
                <PositiveList items={model.validationResults} />
            )}
        </FocusPageLayout>
    );
};
