/// <reference types="cypress"/>

describe("Todo App", () => {
  const task1 = "testtask 1";
  const task2 = "testtask 2";

  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("has an input field", () => {
    cy.get("[data-cy=input]").should("exist");
  });

  it("accepts new tasks", () => {
    cy.get("[data-cy=input]").type(`${task1}{enter}`);
    cy.get("[data-cy=list]").children().last().should("have.text", task1);
    cy.get("[data-cy=input]").type(`${task2}{enter}`);
    cy.get("[data-cy=list]").children().last().should("have.text", task2);
  });
});
