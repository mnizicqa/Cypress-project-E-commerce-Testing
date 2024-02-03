import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";

Given("I access sauce demo website", () => {
  cy.visit("/");
});

When("I enter username {word}", (username) => {
  cy.get("#user-name").type(username);
});

And("I enter password {word}", (password) => {
  cy.get("#password").type(password);
});

And("I click on login button", () => {
  cy.get("#login-button").click();
});

Then(
  "I should be redirected to products page and logo should be visible",
  () => {
    cy.url().should("include", "inventory");
    cy.get(".app_logo").should("be.visible");
  }
);

Then("I should receive error message {string}", (message) => {
  cy.get("h3").should("contain", message);
});
