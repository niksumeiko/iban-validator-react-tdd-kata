import type { Dispatch, FC, ReactNode } from 'react';
import * as React from 'react';
import { useState } from 'react';

export type ProviderWithValue<T = any> = {
    Provider: FC<{ value: T; children: ReactNode }>;
    defaultValue: T;
};
type ProviderFC<T> = FC<{
    children: ReactNode;
    value: ContextValue<T>;
}>;

export type GenericContextProviderBuilder<T> = (value: T) => ProviderWithValue<T>;

type ContextValue<T> = {
    value: T;
    setValue: Dispatch<React.SetStateAction<T>>;
    resetValue: () => void;
};
type CreateGenericContextType<T> = {
    useContext: () => ContextValue<T>;
    createContextProvider: GenericContextProviderBuilder<T>;
};

type ReadonlyContextValue<T> = {
    value: T;
};
type CreateReadonlyGenericContextType<T> = {
    useContext: () => ReadonlyContextValue<T>;
    createContextProvider: GenericContextProviderBuilder<T>;
};

type CreateContextOptions = {
    optional?: boolean;
    writable?: boolean;
    // improves errors
    contextName?: string;
};

const getUnsupportedSetValue = (contextName: string) => () => {
    throw new Error(`Setting value to context '${contextName}' is not supported`);
};

const getUnsupportedResetValue = (contextName: string) => () => {
    throw new Error(`Resetting value of context '${contextName}' is not supported`);
};

function getProvider<T>(
    Provider: ProviderFC<T>,
    writable: boolean | undefined,
    contextName: string,
): FC<{ value: T; children: ReactNode }> {
    if (!writable) {
        return ({ value, children }) => (
            <Provider
                value={{
                    value,
                    setValue: getUnsupportedSetValue(contextName),
                    resetValue: getUnsupportedResetValue(contextName),
                }}
            >
                {children}
            </Provider>
        );
    }
    return ({ value, children }) => {
        const [stateValue, setStateValue] = useState(value);
        return (
            <Provider
                value={{
                    value: stateValue,
                    setValue: setStateValue,
                    resetValue: () => setStateValue(value),
                }}
            >
                {children}
            </Provider>
        );
    };
}

/**
 * Creates React context and returns builder for provider (so it can be used in multi-context and hook to access to provider value).
 *
 * If the context is not set, error will be thrown upon acessing it using the exposed hook. (unless context was marked as optional).
 *
 * @param opts - options
 */
export const buildContext = <T,>(
    opts?: CreateContextOptions,
): CreateGenericContextType<T> => {
    const ctxName = opts?.contextName || 'unknown';
    // Create a context with a generic parameter or undefined
    const genericContext = React.createContext<ContextValue<T | undefined>>({
        value: undefined,
        setValue: getUnsupportedSetValue(ctxName),
        resetValue: getUnsupportedResetValue(ctxName),
    });

    // Check if the value provided to the context is defined or throw an error
    const useGenericContext = (): ContextValue<T> => {
        const contextValue = React.useContext(genericContext);
        if (opts?.optional) {
            return contextValue as ContextValue<T>;
        }
        if (!contextValue) {
            throw new Error(
                `Context value '${ctxName}' must be set and within a Provider`,
            );
        }
        return contextValue as ContextValue<T>;
    };

    const createContextProvider = (value: T): ProviderWithValue<T> => ({
        defaultValue: value,
        // we will pretend that provider is just component that accepts value prop
        Provider: getProvider<T>(
            genericContext.Provider as FC<{ value: ContextValue<T> }>,
            opts?.writable,
            ctxName,
        ),
    });

    return { useContext: useGenericContext, createContextProvider };
};

export const createOptionalGenericContext = <T,>(
    contextName?: string,
): CreateGenericContextType<T | undefined> =>
    buildContext<T | undefined>({ optional: true, contextName });

export const createGenericContext = <T,>(
    contextName?: string,
): CreateReadonlyGenericContextType<T> => buildContext<T>({ contextName });

export const createWritableGenericContext = <T,>(
    contextName?: string,
): CreateGenericContextType<T> => buildContext<T>({ writable: true, contextName });
