///<reference types = "cypress"/>

describe("Error User Behavior", () => {
  beforeEach(() => {
    cy.login("error_user", "secret_sauce");
    cy.get(".app_logo").should("be.visible");
  });

  it("Error User Sorting", () => {
    cy.get("[data-test='product_sort_container']")
      .select("za")
      .then(() => {
        cy.on("window:alert", (str) => {
          expect(str).to.equal(
            "Sorting is broken! This error has been reported to Backtrace."
          );
        });
      });
  });

  it("Error User Remove Add To Cart", () => {
    cy.contains(".inventory_item", "Sauce Labs Fleece Jacket")
      .find('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
      .should("have.text", "Add to cart")
      .click();
  });
});
