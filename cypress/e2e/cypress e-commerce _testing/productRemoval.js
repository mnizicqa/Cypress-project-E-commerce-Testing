/// <reference types = "cypress"/>

describe("Product Remove from cart", () => {
  beforeEach(() => {
    cy.login("standard_user", "secret_sauce");
  });

  it("Successful Product Removal after Add to Cart", () => {
    cy.removeProduct();
  });

  it("Successful Product Removal in the checkout  after Add to Cart", () => {
    cy.removeProductInCheckout();
  });
});
