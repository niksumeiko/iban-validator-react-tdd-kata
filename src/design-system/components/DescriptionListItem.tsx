import type { PropsWithChildren } from 'react';

interface Props {
    label: string;
}

export const DescriptionListItem = ({ children, label }: PropsWithChildren<Props>) => (
    <dl>
        <dt className="pt-2 first:p-0 text-sm text-gray-500">{label}</dt>
        <dd>{children}</dd>
    </dl>
);
