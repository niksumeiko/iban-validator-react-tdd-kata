import type { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ValidationPage } from './validation/useCases/validate/ValidationPage';

const queryClient = new QueryClient();

export const App: FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ValidationPage />
        </QueryClientProvider>
    );
};
