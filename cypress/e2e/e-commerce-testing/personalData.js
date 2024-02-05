describe("Test Personal Data input when using checkout", () => {
  before(() => {
    cy.fixture("personalDataInfo").then((data) => {
      globalThis.data = data;
    });
  });

  beforeEach(() => {
    cy.visit("/");
    cy.chooseProduct();
  });

  it("Input first name only", () => {
    cy.typeFirstName();
    cy.clickContinue();
    cy.checkErrorMessageText("h3", "Error: Last Name is required");
  });

  it("Input last name only", () => {
    cy.typeLastName();
    cy.clickContinue();
    cy.checkErrorMessageText("h3", "First Name is required");
  });

  it("Input postal code only", () => {
    cy.typePostalCode();
    cy.clickContinue();
    cy.checkErrorMessageText("h3", "First Name is required");
  });

  it("No input from the user", () => {
    cy.clickContinue();
    cy.checkErrorMessageText("h3", "First Name is required");
  });

  it("Input first name and last name", () => {
    cy.typeFirstName();
    cy.typeLastName();
    cy.clickContinue();
    cy.checkErrorMessageText("h3", "Error: Postal Code is required");
  });

  it("Input last name and postal code", () => {
    cy.typeLastName();
    cy.typePostalCode();
    cy.clickContinue();
    cy.checkErrorMessageText("h3", "First Name is required");
  });

  it("Input first name and postal code", () => {
    cy.typeFirstName();
    cy.typePostalCode();
    cy.clickContinue();
    cy.checkErrorMessageText("h3", "Error: Last Name is required");
  });
});
