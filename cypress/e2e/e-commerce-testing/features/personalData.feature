Feature: Test Personal Data input when using checkout

    Scenario:Input all of the necessary personal data
        Given I login successfully to the webshop
        When I choose product and click on add to cart button
        And I click on the cart icon
        And I click on the checkout button
        And I enter first name Mario
        And I enter last name Nizic
        And I enter zip code 71000
        And I click on the continue button
        Then I should be able to see the product I have ordered

    Scenario Outline: Omit some of the necessary personal data
        Given I login successfully to the webshop
        When I choose product and click on add to cart button
        And I click on the cart icon
        And I click on the checkout button
        And I enter first name <firstName>
        And I enter last name <lastName>
        And I enter zip code <zipCode>
        And I click on the continue button
        Then I should receive error message <errorMessage>

        Examples:
            | firstName   | lastName    | zipCode     | errorMessage                     |
            | Mario       | {backspace} | {backspace} | "Error: Last Name is required"   |
            | {backspace} | Nizic       | {backspace} | "Error: First Name is required"  |
            | {backspace} | {backspace} | 71000       | "Error: First Name is required"  |
            | {backspace} | {backspace} | {backspace} | "Error: First Name is required"  |
            | Mario       | Nizic       | {backspace} | "Error: Postal Code is required" |
            | {backspace} | Nizic       | 71000       | "Error: First Name is required"  |
            | Mario       | {backspace} | 71000       | "Error: Last Name is required"   |