import type { FC, ReactNode } from 'react';
import { memo, useMemo } from 'react';

import type { ProviderWithValue } from './createGenericContext';

interface Props {
    providers: ContextProviderType[];
    children: ReactNode;
}

type FCWithChildren = FC<{ children: ReactNode }>;

export type ContextProviderType = ProviderWithValue | FCWithChildren;

const ContextWrapper: FCWithChildren = memo(({ children }) => <>{children}</>);

const composeProviders = (wrappers: ContextProviderType[]): FCWithChildren => {
    return wrappers.reduce<FCWithChildren>((Acc, Context): FCWithChildren => {
        const ContextWithValue = Context as ProviderWithValue;
        if (ContextWithValue?.defaultValue) {
            return (props) => (
                <ContextWithValue.Provider value={ContextWithValue.defaultValue}>
                    <Acc {...props} />
                </ContextWithValue.Provider>
            );
        }

        const ContextFC = Context as FCWithChildren;
        return (props) => (
            <ContextFC>
                <Acc {...props} />
            </ContextFC>
        );
    }, ContextWrapper);
};

/**
 * Provides wrapper for providers, so they can be configured in 'flat' manner, and we
 * can avoid unnecessary nesting.
 */
export const ContextProvider: FC<Props> = memo(({ providers, children }) => {
    const ComposedProviders = useMemo(() => composeProviders(providers), [providers]);

    return <ComposedProviders>{children}</ComposedProviders>;
});
