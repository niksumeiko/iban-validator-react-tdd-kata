import type { PropsWithChildren } from 'react';

export const FocusPageLayout = ({ children }: PropsWithChildren) => {
    return (
        // eslint-disable-next-line internal/jsx-no-inline-styles
        <div className="container mx-auto h-screen" style={{ maxWidth: '640px' }}>
            <div className="pt-8 md:pt-16 h-full">
                <div className="py-4 px-10 h-full bg-white rounded-t-md">{children}</div>
            </div>
        </div>
    );
};
