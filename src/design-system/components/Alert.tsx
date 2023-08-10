import type { PropsWithChildren } from 'react';

interface Props {
    variant: keyof typeof classNameByVariant;
}

const classNameByVariant = {
    error: 'rounded bg-red-100 py-2 px-4 mt-2',
    info: 'rounded border-s-4 border-blue-300/40 bg-sky-50 p-4',
};

export const Alert = ({ children, variant }: PropsWithChildren<Props>) => (
    <div role="alert" className={classNameByVariant[variant]}>
        {children}
    </div>
);
