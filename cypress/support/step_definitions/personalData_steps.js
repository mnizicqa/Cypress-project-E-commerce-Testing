import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";

Given("I login successfully to the webshop", () => {
  cy.login("standard_user", "secret_sauce");
});

When("I choose product and click on add to cart button", () => {
  cy.contains(".inventory_item", "Sauce Labs Fleece Jacket")
    .find('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
    .should("have.text", "Add to cart")
    .click();
});

And("I click on the cart icon", () => {
  cy.get(".shopping_cart_badge").should("be.visible").click();
});

And("I click on the checkout button", () => {
  cy.get("#checkout").click();
});

And("I enter first name {word}", (firstName) => {
  cy.get('[data-test="firstName"]').type(firstName);
});

And("I enter last name {word}", (lastName) => {
  cy.get('[data-test="lastName"]').type(lastName);
});

And("I enter zip code {word}", (zipCode) => {
  cy.get('[data-test="postalCode"]').type(zipCode);
});

And("I click on the continue button", () => {
  cy.get('[data-test="continue"]').click();
});

Then("I should be able to see the product I have ordered", () => {
  cy.get(".cart_item").should("be.visible");
});

Then("I should receive error message {string}", (message) => {
  cy.get("h3").should("contain", message);
});
