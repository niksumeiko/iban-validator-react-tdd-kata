import type { PropsWithChildren, ReactNode } from 'react';

import { Alert } from './Alert';

type Props = {
    button?: ReactNode;
    error?: ReactNode;
};

export const FormField = ({ button, children, error }: PropsWithChildren<Props>) => {
    return (
        <>
            <div className="flex flex-row p-1.5 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                {children}
                {button}
            </div>
            {error && <Alert variant="error">{error}</Alert>}
        </>
    );
};
