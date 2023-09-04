import type { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ContextProvider } from './common/context';
import { ValidationPage } from './validation/useCases/validate/ValidationPage';
import { provideValidation } from './validation/api/ValidationApiProvider';
import { createIbanValidationApiAdapter } from './validation/api/ValidationApiService';

const queryClient = new QueryClient();

export const App: FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ContextProvider
                providers={[provideValidation(createIbanValidationApiAdapter)]}
            >
                <ValidationPage />
            </ContextProvider>
        </QueryClientProvider>
    );
};
