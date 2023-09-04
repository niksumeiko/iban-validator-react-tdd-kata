import {
    Button,
    FocusPageLayout,
    FormField,
    HeroTitle,
    MagnifyingGlassIcon,
    PositiveList,
    TextInput,
} from '../../../design-system';
import { useIbanValidation } from './useIbanValidation';

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
                <FormField
                    error={validationError}
                    button={
                        <Button type="submit">
                            <MagnifyingGlassIcon />
                        </Button>
                    }
                >
                    <TextInput
                        data-test="iban-entry"
                        placeholder="Type IBAN…"
                        onChange={onIbanChange}
                    />
                </FormField>
            </form>
            {isValidationAvailable && <PositiveList items={validationResults} />}
        </FocusPageLayout>
    );
};
