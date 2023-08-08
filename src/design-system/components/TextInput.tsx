import type { InputHTMLAttributes, Ref } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    ref: Ref<HTMLInputElement>;
}

export const TextInput = (props: Props) => (
    <input
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        {...props}
    />
);
