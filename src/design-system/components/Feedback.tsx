import type { PropsWithChildren } from 'react';

export const Feedback = ({ children }: PropsWithChildren) => (
    <div className="h-screen flex items-center justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
            <h2 className="mt-5 text-2xl font-semibold leading-9 tracking-tight text-green-600">
                {children}
            </h2>
        </div>
    </div>
);
