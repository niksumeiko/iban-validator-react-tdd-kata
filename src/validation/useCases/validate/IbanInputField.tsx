import type { ChangeEvent } from 'react';

import {
    Button,
    FormField,
    MagnifyingGlassIcon,
    TextInput,
} from '../../../design-system';

type Props = {
    error?: string;
    onChange(event: ChangeEvent<HTMLInputElement>): void;
};

export const IbanInputField = ({ error, onChange }: Props) => (
    <FormField
        error={error}
        button={
            <Button type="submit">
                <MagnifyingGlassIcon />
            </Button>
        }
    >
        <TextInput data-test="iban-entry" placeholder="Type IBAN…" onChange={onChange} />
    </FormField>
);
