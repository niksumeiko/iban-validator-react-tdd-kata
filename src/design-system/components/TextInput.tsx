import type { ComponentProps } from 'react';

export const TextInput = (props: ComponentProps<'input'>) => {
    return (
        <input
            {...props}
            className="grow px-3 py-2 text-gray-700 text-md sm:text-xl placeholder-gray-500 bg-white outline-none border-none focus:ring-transparent focus:placeholder-transparent"
        />
    );
};
