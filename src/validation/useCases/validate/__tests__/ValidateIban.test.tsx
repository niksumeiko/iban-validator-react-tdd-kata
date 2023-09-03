import { ContextProvider } from '../../../../common/context';
import { provideValidation } from '../../../api/ValidationApiProvider';
import { ValidationPage } from '../ValidationPage';

describe('iban validation', () => {
    it('see error when iban is invalid', () => {
        const fakeApiAdapter = () => Promise.reject(new Error());
        cy.mount(
            <ContextProvider providers={[provideValidation(() => fakeApiAdapter)]}>
                <ValidationPage />
            </ContextProvider>,
        );

        cy.get('form [data-test="iban-entry"]').type('LV64HABA0551018676991');
        cy.get('form button[type="submit"]').click();

        cy.contains('This IBAN is invalid').should('be.visible');
    });
});
