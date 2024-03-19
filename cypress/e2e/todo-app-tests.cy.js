/// <reference types="cypress"/>

describe("Todo App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("has an input field"),
    () => {
      cy.get("[data-cy=input]").should("exist");
    };
});
