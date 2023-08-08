/// <reference types="../../node_modules/cypress/types/cypress-npm-api" />
/// <reference types="../../node_modules/cypress/types/net-stubbing" />
/// <reference types="../../node_modules/cypress/types/cypress" />
/// <reference types="../../node_modules/cypress/types/cypress-global-vars" />
/// <reference types="../../node_modules/cypress/types/cypress-type-helpers" />
import type { ReactNode } from 'react';
import React from 'react';
import type { MountReturn } from 'cypress/react18';
import { mount } from 'cypress/react18';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '../../src/index.css';
import './commands';

Cypress.Commands.add('mount', (element, options, rerenderKey) => {
    const queryClient = new QueryClient();

    return mount(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>
        </React.StrictMode>,
        options,
        rerenderKey,
    );
});

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            mount: (
                element: ReactNode,
                options?: Partial<{ log: boolean }>,
                rerenderKey?: string,
            ) => Chainable<MountReturn>;
        }
    }
}
