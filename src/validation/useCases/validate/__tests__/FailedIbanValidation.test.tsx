import { ValidationPage } from '../ValidationPage';

describe('Failed iban validation', () => {
    it('see error feedback when iban is missing', () => {
        cy.mount(<ValidationPage />);

        cy.get('form button[type="submit"]').click();

        cy.contains('Please provide the IBAN').should('be.visible');
    });
});
