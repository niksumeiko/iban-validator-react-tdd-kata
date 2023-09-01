import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('I open a validation page', () => {
    cy.visit('/');
});

When('I provide an IBAN', () => {
    cy.get('form [data-test="iban-entry"]').type('AT0309000000000019176655{enter}');
});

Then('I see validation details', () => {
    cy.contains('Valid IBAN').should('be.visible');
    cy.contains('Trusted bank').should('be.visible');
    cy.contains('Accepts instant payments').should('be.visible');
    cy.contains('Positive operation history').should('be.visible');
    cy.contains('No security claims').should('be.visible');
    cy.contains('Complies with Payment Services Directive (PSD2)').should('be.visible');
});
