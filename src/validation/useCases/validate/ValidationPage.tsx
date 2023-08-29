import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

import {
    Alert,
    DescriptionListItem,
    FocusPageLayout,
    HeroTitle,
    PositiveList,
} from '../../../design-system';
import { IbanInput } from './IbanInput';
import type { FormValues } from './ValidationFormService';
import { useValidationPage } from './useValidationPage';

export const ValidationPage = () => {
    const model = useValidationPage();
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
                <form onSubmit={methods.handleSubmit(model.validate)} autoComplete="off">
                    <IbanInput />
                    {model.isInvalid && (
                        <Alert variant="error">This IBAN is invalid</Alert>
                    )}
                </form>
            </FormProvider>
            {model.isAvailable && (
                <>
                    <PositiveList items={model.results} />
                    <Alert variant="info">
                        <DescriptionListItem label="Formatted">
                            <code data-test="iban-output">{model.formatted}</code>
                        </DescriptionListItem>
                        {model.currency && (
                            <p data-test="iban-currency">
                                {`+ This IBAN supports ${model.currency.code} currency`}
                            </p>
                        )}
                    </Alert>
                </>
            )}
        </FocusPageLayout>
    );
};
