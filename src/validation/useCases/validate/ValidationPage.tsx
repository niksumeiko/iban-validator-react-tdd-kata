import { useState } from 'react';

import {
    Button,
    FocusPageLayout,
    FormField,
    HeroTitle,
    MagnifyingGlassIcon,
    PositiveList,
    TextInput,
} from '../../../design-system';
import { createIbanValidationViewModel } from './ValidationViewModelService';
import { useIban } from './useIban';

export const ValidationPage = () => {
    const [formValues, setFormValues] = useState({ iban: '' });
    const [iban, setIban] = useState(formValues.iban);
    const { data, error } = useIban(iban);
    const model = createIbanValidationViewModel(data, error);

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
                    error={model.validationError}
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
