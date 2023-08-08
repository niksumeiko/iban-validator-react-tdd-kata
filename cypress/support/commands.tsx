/// <reference types="../../node_modules/cypress/types/cypress-npm-api" />
/// <reference types="../../node_modules/cypress/types/net-stubbing" />
/// <reference types="../../node_modules/cypress/types/cypress" />
/// <reference types="../../node_modules/cypress/types/cypress-global-vars" />
/// <reference types="../../node_modules/cypress/types/cypress-type-helpers" />
import type { ReactNode } from 'react';
import React from 'react';
import type { MountReturn } from 'cypress/react18';
import { mount as cyMount } from 'cypress/react18';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('mount', (element, options, rerenderKey) => {
    const queryClient = new QueryClient();

    return cyMount(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>
        </React.StrictMode>,
        options,
        rerenderKey,
    );
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            // login(email: string, password: string): Chainable<void>;
            mount: (
                element: ReactNode,
                options?: Partial<{ log: boolean }>,
                rerenderKey?: string,
            ) => Chainable<MountReturn>;
            // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
            // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
            // visit(
            //     originalFn: CommandOriginalFn,
            //     url: string,
            //     options: Partial<VisitOptions>,
            // ): Chainable<Element>;
        }
    }
}
