/// <reference types = "cypress"/>

describe("Product Purchase", () => {
  before(() => {
    cy.fixture("personalDataInfo").then((data) => {
      globalThis.data = data;
    });
  });

  beforeEach(() => {
    cy.visit("/");
    cy.chooseProduct();
  });

  it("Successful Product Purchase", () => {
    cy.enterPersonalData(data.first_name, data.last_name, data.postal_code);
    cy.completeCheckout();
  });
});
