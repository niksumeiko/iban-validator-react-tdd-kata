import { useController } from 'react-hook-form';

import { Alert } from '../../../design-system';

export const IbanInput = () => {
    const {
        field,
        fieldState: { error },
    } = useController({ name: 'iban' });

    return (
        <>
            <div className="flex flex-row p-1.5 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                <input
                    {...field}
                    className="grow px-3 py-2 text-gray-700 text-md sm:text-xl placeholder-gray-500 bg-white outline-none border-none focus:ring-transparent focus:placeholder-transparent"
                    data-test="iban-entry"
                    placeholder="Type IBAN…"
                />
                <button
                    type="submit"
                    className="grow-0 px-4 py-3 text-sm font-medium tracking-wider text-black uppercase transition-colors duration-300 transform bg-transparent border rounded-md hover:bg-sky-50 focus:bg-sky-50 focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </button>
            </div>
            {error && <Alert variant="error">{error.message}</Alert>}
        </>
    );
};
