describe("Product Sorting alphabetically or by price", () => {
  beforeEach(() => {
    cy.login("standard_user", "secret_sauce");
  });

  it("Sort products by names from A to Z", () => {
    cy.sortingAToZ();
  });

  it("Sort products by names from Z to A", () => {
    cy.sortingZToA();
  });

  it("Sort products by prices from lowest to highest", () => {
    cy.sortingLowestToHighest();
  });

  it("Sort products by prices from highest to lowest", () => {
    cy.sortingHighestToLowest();
  });
});
