// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (username, password) => {
  cy.visit("/");
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"').type(password);
  cy.get('[data-test="login-button"]').click();
  cy.get(".app_logo").should("be.visible");
});

Cypress.Commands.add("checkErrorMessage", () => {
  cy.get('[data-test="error"]').should(
    "have.text",
    "Epic sadface: Username and password do not match any user in this service"
  );
});

Cypress.Commands.add("enterPersonalData", (firstName, lastName, postalCode) => {
  cy.get('[data-test="firstName"]').type(firstName);
  cy.get('[data-test="lastName"]').type(lastName);
  cy.get('[data-test="postalCode"]').type(postalCode);
  cy.get('[data-test="continue"]').click();
});

Cypress.Commands.add("chooseProduct", () => {
  cy.login("standard_user", "secret_sauce");
  cy.contains(".inventory_item", "Sauce Labs Fleece Jacket")
    .find('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
    .should("have.text", "Add to cart")
    .click();
  cy.get(".shopping_cart_badge").should("be.visible").click();
  cy.get(".cart_item").should("have.length", 1);
  cy.get("#checkout").click();
});

Cypress.Commands.add("typeFirstName", () => {
  cy.get('[data-test="firstName"]').type(data.first_name);
});

Cypress.Commands.add("typeLastName", () => {
  cy.get('[data-test="lastName"]').type(data.last_name);
});

Cypress.Commands.add("typePostalCode", () => {
  cy.get('[data-test="postalCode"]').type(data.postal_code);
});

Cypress.Commands.add("clickContinue", () => {
  cy.get('[data-test="continue"]').click();
});

Cypress.Commands.add("checkErrorMessageText", ($selector, textToLocate) => {
  cy.get($selector).contains(textToLocate);
});

Cypress.Commands.add("loginWithoutPassword", (username) => {
  cy.visit("/");
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type("{backspace}");
  cy.get('[data-test="login-button"]').click();
  cy.get('[data-test="error"]').should(
    "have.text",
    "Epic sadface: Password is required"
  );
});

Cypress.Commands.add("loginWithoutUsername", (password) => {
  cy.visit("/");
  cy.get('[data-test="username"]').type("{backspace}");
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
  cy.get('[data-test="error"]').should(
    "have.text",
    "Epic sadface: Username is required"
  );
});

Cypress.Commands.add("loginWithoutUsernameAndPassword", () => {
  cy.visit("/");
  cy.get('[data-test="username"]').type("{backspace}");
  cy.get('[data-test="password"]').type("{backspace}");
  cy.get('[data-test="login-button"]').click();
  cy.get('[data-test="error"]').should(
    "have.text",
    "Epic sadface: Username is required"
  );
});

Cypress.Commands.add("completeCheckout", () => {
  cy.get(".title").should("have.text", "Checkout: Overview");
  cy.get('[data-test="finish"]').click();
  cy.get(".pony_express").should("be.visible");
  cy.get('[data-test="back-to-products"]').click();
  cy.get(".title").should("have.text", "Products");
});

Cypress.Commands.add("removeProduct", () => {
  cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]')
    .as("removeProduct")
    .then(($el) => {
      cy.get("@removeProduct").click();
      expect($el.text()).to.contain("Remove");
    })
    .then(() => {
      cy.get(".shopping_cart_link").should(
        "not.have.class",
        "shopping_cart_badge"
      );
    });
});

Cypress.Commands.add("removeProductInCheckout", () => {
  cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  cy.get(".shopping_cart_badge").should("be.visible").click();
  cy.get(".cart_list")
    .as("productList")
    .find(".inventory_item_name")
    .contains("Sauce Labs Bolt T-Shirt")
    .then(() => {
      cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
      cy.get("@productList").should("not.have.class", 'inventory_item_name"');
    });
});

Cypress.Commands.add("sortingAToZ", () => {
  cy.get('[data-test="product_sort_container"]')
    .select("az")
    .should("have.value", "az");
  cy.get(".inventory_item_name").should("have.length", 6);
  cy.get(".inventory_item_name").eq(0).contains("Sauce Labs Backpack");
  cy.get(".inventory_item_name").eq(1).contains("Sauce Labs Bike Light");
  cy.get(".inventory_item_name").eq(2).contains("Sauce Labs Bolt T-Shirt");
  cy.get(".inventory_item_name").eq(3).contains("Sauce Labs Fleece Jacket");
  cy.get(".inventory_item_name").eq(4).contains("Sauce Labs Onesie");
  cy.get(".inventory_item_name")
    .eq(5)
    .contains("Test.allTheThings() T-Shirt (Red)");
});

Cypress.Commands.add("sortingZToA", () => {
  cy.get('[data-test="product_sort_container"]').as("select").select("za");
  cy.get("@select").should("have.value", "za");
  cy.get(".inventory_item_name").should("have.length", 6);
  cy.get(".inventory_item_name")
    .eq(0)
    .contains("Test.allTheThings() T-Shirt (Red)");
  cy.get(".inventory_item_name").eq(1).contains("Sauce Labs Onesie");
  cy.get(".inventory_item_name").eq(2).contains("Sauce Labs Fleece Jacket");
  cy.get(".inventory_item_name").eq(3).contains("Sauce Labs Bolt T-Shirt");
  cy.get(".inventory_item_name").eq(4).contains("Sauce Labs Bike Light");
  cy.get(".inventory_item_name").eq(5).contains("Sauce Labs Backpack");
});

Cypress.Commands.add("sortingLowestToHighest", () => {
  cy.get('[data-test="product_sort_container"]').as("select").select("lohi");
  cy.get("@select").should("have.value", "lohi");
  cy.get(".inventory_item_price").should("have.length", 6);
  cy.get(".inventory_item_price").eq(0).contains("7.99");
  cy.get(".inventory_item_price").eq(1).contains("9.99");
  cy.get(".inventory_item_price").eq(2).contains("15.99");
  cy.get(".inventory_item_price").eq(3).contains("15.99");
  cy.get(".inventory_item_price").eq(4).contains("29.99");
  cy.get(".inventory_item_price").eq(5).contains("49.99");
});

Cypress.Commands.add("sortingHighestToLowest", () => {
  cy.get('[data-test="product_sort_container"]').as("select").select("hilo");
  cy.get("@select").should("have.value", "hilo");
  cy.get(".inventory_item_price").should("have.length", 6);
  cy.get(".inventory_item_price").eq(0).contains("49.99");
  cy.get(".inventory_item_price").eq(1).contains("29.99");
  cy.get(".inventory_item_price").eq(2).contains("15.99");
  cy.get(".inventory_item_price").eq(3).contains("15.99");
  cy.get(".inventory_item_price").eq(4).contains("9.99");
  cy.get(".inventory_item_price").eq(5).contains("7.99");
});
