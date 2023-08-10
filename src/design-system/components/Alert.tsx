import type { PropsWithChildren } from 'react';

interface Props {
    variant: 'error';
}

export const Alert = ({ children }: PropsWithChildren<Props>) => (
    <div role="alert" className="rounded bg-red-100 py-2 px-4 mt-2">
        {children}
    </div>
);
