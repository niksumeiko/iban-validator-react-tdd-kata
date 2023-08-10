import type { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ValidationPage } from './validation/useCases/validate/ValidationPage';
import { ContextProvider } from './common/context';
import { providerCountryAdapter } from './validation/adapters/CountryAdapterProvider';
import { createCountryAdapter } from './validation/adapters/CountryAdapterService';

const queryClient = new QueryClient();

export const App: FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ContextProvider providers={[providerCountryAdapter(createCountryAdapter)]}>
                <ValidationPage />
            </ContextProvider>
        </QueryClientProvider>
    );
};
