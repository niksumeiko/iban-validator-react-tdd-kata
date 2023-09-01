import {
    Button,
    FocusPageLayout,
    FormField,
    HeroTitle,
    MagnifyingGlassIcon,
    PositiveList,
    TextInput,
} from '../../../design-system';

export const ValidationPage = () => {
    return (
        <FocusPageLayout>
            <HeroTitle title="IBAN Validator" />
            <form autoComplete="off">
                <FormField
                    button={
                        <Button type="submit">
                            <MagnifyingGlassIcon />
                        </Button>
                    }
                >
                    <TextInput data-test="iban-entry" placeholder="Type IBAN…" />
                </FormField>
            </form>
            <PositiveList items={['x', 'y', 'z']} />
        </FocusPageLayout>
    );
};
