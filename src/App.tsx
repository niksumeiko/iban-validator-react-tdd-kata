import type { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const App: FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            X
        </QueryClientProvider>
    );
};
