import { ValidationPage } from '../ValidationPage';
import type { CountryResult } from '../../../adapters/CountryAdapterProvider';
import { providerCountryAdapter } from '../../../adapters/CountryAdapterProvider';
import { ContextProvider } from '../../../../common/context';

function createFakeCountryAdapterFactory(result: CountryResult = {}) {
    return () => () => {
        return Promise.resolve(result);
    };
}

describe('iban validation', () => {
    it('see currency the iban supports', () => {
        cy.intercept('GET', '**/validate**', {
            body: {
                iban: 'x',
                flags: [],
                bank: {
                    address: { country: 'AT' },
                },
            },
        });
        const fakeFactory = createFakeCountryAdapterFactory({
            currency: { code: 'XYZ' },
        });

        cy.mount(
            <ContextProvider providers={[providerCountryAdapter(fakeFactory)]}>
                <ValidationPage />
            </ContextProvider>,
        );

        cy.get('form [data-test="iban-entry"]').type('AT0309000000000019176655{enter}');

        cy.get('[data-test="iban-currency"]').should('contain.text', 'XYZ');
    });

    describe('failed iban validation', () => {
        it('see error feedback when iban is missing', () => {
            const fakeFactory = createFakeCountryAdapterFactory();
            cy.mount(
                <ContextProvider providers={[providerCountryAdapter(fakeFactory)]}>
                    <ValidationPage />
                </ContextProvider>,
            );

            cy.get('form button[type="submit"]').click();

            cy.contains('Please provide the IBAN').should('be.visible');
        });

        it('see error feedback when iban is invalid', () => {
            cy.intercept('GET', '**/validate**', {
                statusCode: 400,
            });
            const fakeFactory = createFakeCountryAdapterFactory();
            cy.mount(
                <ContextProvider providers={[providerCountryAdapter(fakeFactory)]}>
                    <ValidationPage />
                </ContextProvider>,
            );

            cy.get('form [data-test="iban-entry"]').type('LV64HABA0551018676991{enter}');

            cy.contains('This IBAN is invalid').should('be.visible');
        });
    });
});
