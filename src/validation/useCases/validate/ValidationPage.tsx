import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

import { DescriptionList, FocusPageLayout, HeroTitle } from '../../../design-system';
import { IbanInput } from './IbanInput';
import type { FormValues } from './ValidationFormService';
import { useValidateIban } from './useValidateIban';
import { ValidationStates } from './ValidationStates';

export const ValidationPage = () => {
    const { validate, states, formatted, isValid } = useValidateIban();
    const methods = useForm<FormValues>({
        defaultValues: {
            iban: '',
        },
        resolver: yupResolver(
            object({
                iban: string().required('Please provide the IBAN'),
            }),
        ),
    });

    return (
        <FocusPageLayout>
            <HeroTitle title="IBAN Validator" />
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(validate)} autoComplete="off">
                    <IbanInput />
                </form>
            </FormProvider>
            {isValid && (
                <>
                    <ValidationStates states={states} />
                    <DescriptionList items={[{ label: 'Formatted', text: formatted }]} />
                </>
            )}
        </FocusPageLayout>
    );
};
