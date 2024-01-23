/// <reference types = "cypress"/>

describe("Login Standard User", () => {
  it("Login with correct credentials", () => {
    cy.login("standard_user", "secret_sauce");
    cy.get(".app_logo").should("be.visible");
  });

  it("Login with wrong username", () => {
    cy.login("test", "secret_sauce");
    cy.checkErrorMessage();
  });

  it("Login with wrong password", () => {
    cy.login("standard_user", "test");
    cy.checkErrorMessage();
  });

  it("Login with wrong username and password", () => {
    cy.login("test", "test");
    cy.checkErrorMessage();
  });

  it("Login without typing password", () => {
    cy.loginWithoutPassword();
  });

  it("Login without typing username", () => {
    cy.loginWithoutUsername();
  });

  it("Login without typing username and password", () => {
    cy.loginWithoutUsernameAndPassword();
  });
});
