import { createGenericContext } from '../../common/context';

export interface CountryResult {
    currency?: {
        code: string;
    };
}

type Adapter = () => Promise<CountryResult>;
export type CountryAdapterFactory = (props: { countryCode: string }) => Adapter;

export const { useContext, createContextProvider: providerCountryAdapter } =
    createGenericContext<CountryAdapterFactory>();

export function useCountryAdapterFactory() {
    return useContext().value;
}
