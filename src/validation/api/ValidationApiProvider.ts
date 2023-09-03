import type { ValidationResponse } from './ValidationApiService';
import { createGenericContext } from '../../common/context';

type Adapter = () => Promise<ValidationResponse>;

type Factory = (iban: string) => Adapter;

export const { useContext, createContextProvider: provideValidation } =
    createGenericContext<Factory>();

export function useValidationAdapterFactory() {
    return useContext().value;
}
