import type { ComponentProps } from 'react';

export const Button = (props: ComponentProps<'button'>) => (
    <button
        {...props}
        className="grow-0 px-4 py-3 text-sm font-medium tracking-wider text-black uppercase transition-colors duration-300 transform bg-transparent border rounded-md hover:bg-sky-50 focus:bg-sky-50 focus:outline-none"
    >
        {props.children}
    </button>
);
