Feature: Validate International Bank Account Number (IBAN)

  I want to know the IBAN details

  Scenario: Validate IBAN
    Given I open a validation page
    When I provide an IBAN
    Then I see validation details
