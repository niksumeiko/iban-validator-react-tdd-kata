import { Fragment } from 'react';

interface Props {
    items: {
        label?: string;
        text: string;
    }[];
}

export const DescriptionList = ({ items }: Props) => (
    <div className="rounded border-s-4 border-blue-300/40 bg-sky-50 p-4">
        <dl>
            {items.map(({ label, text }) => (
                <Fragment key={text}>
                    <dt className="pt-2 first:p-0 text-sm text-gray-500">{label}</dt>
                    <dd>{text}</dd>
                </Fragment>
            ))}
        </dl>
    </div>
);
