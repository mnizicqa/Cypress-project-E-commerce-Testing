describe("Problem User Behavior", () => {
  beforeEach(() => {
    cy.login("problem_user", "secret_sauce");
    cy.get(".app_logo").should("be.visible");
  });

  it("Problem User Sorting", () => {
    cy.get("[data-test='product_sort_container']").select("za");
    cy.sortingZToA();
    cy.screenshot();
  });

  it("Problem User Add To Cart", () => {
    cy.contains(".inventory_item", "Sauce Labs Fleece Jacket")
      .find('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
      .should("have.text", "Add to cart")
      .click();
    cy.get(".shopping_cart_link").should("have.class", "shopping_cart_badge");
    cy.screenshot();
  });
});
