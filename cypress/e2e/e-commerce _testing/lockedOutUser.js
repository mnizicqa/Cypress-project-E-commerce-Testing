///<reference types = "cypress"/>

describe("Locked Out User Behavior", () => {
  it("Locked Out User Login", () => {
    cy.login("locked_out_user", "secret_sauce");
    cy.get("[data-test='error']").contains(
      "Epic sadface: Sorry, this user has been locked out."
    );
    cy.screenshot();
  });
});
