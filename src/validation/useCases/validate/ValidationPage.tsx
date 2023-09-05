import { FocusPageLayout, HeroTitle, PositiveList } from '../../../design-system';
import { useIbanValidation } from './useIbanValidation';
import { IbanInputField } from './IbanInputField';

export const ValidationPage = () => {
    const {
        isValidationAvailable,
        onIbanChange,
        onIbanSubmit,
        validationError,
        validationResults,
    } = useIbanValidation();

    return (
        <FocusPageLayout>
            <HeroTitle title="IBAN Validator" />
            <form onSubmit={onIbanSubmit} autoComplete="off">
                <IbanInputField error={validationError} onChange={onIbanChange} />
            </form>
            {isValidationAvailable && <PositiveList items={validationResults} />}
        </FocusPageLayout>
    );
};
