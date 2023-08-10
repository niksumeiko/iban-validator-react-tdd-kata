import { ValidationPage } from '../ValidationPage';

describe('iban validation', () => {
    describe('failed iban validation', () => {
        it('see error feedback when iban is missing', () => {
            cy.mount(<ValidationPage />);

            cy.get('form button[type="submit"]').click();

            cy.contains('Please provide the IBAN').should('be.visible');
        });

        it('see error feedback when iban is invalid', () => {
            cy.intercept('GET', '**/validate**', {
                statusCode: 400,
            });
            cy.mount(<ValidationPage />);

            cy.get('form [data-test="iban-entry"]').type('LV64HABA0551018676991{enter}');

            cy.contains('This IBAN is invalid').should('be.visible');
        });
    });
});
