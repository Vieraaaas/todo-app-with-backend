/// <reference types="cypress"/>

describe("Todo App", () => {
  const task1 = "testtask 1";
  const task2 = "testtask 2";

  beforeEach(() => {
    cy.visit("http://localhost:3000");
    //cy.request fetches the data from the backend and prevents issues with asynchronicity
    cy.request("http://localhost:4730/todos/");
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

  it("filters finished tasks", () => {
    cy.contains(`${task1}`).parent().find("input[type=checkbox]").check();
    cy.get("[data-cy=radio-done").click();
    cy.contains(`${task1}`).should("not.be.hidden");
    cy.contains(`${task2}`).should("be.hidden");
  });

  it("filters open tasks", () => {
    cy.get("[data-cy=radio-open").click();
    cy.contains(`${task1}`).should("be.hidden");
    cy.contains(`${task2}`).should("not.be.hidden");
  });

  it("reverts filters", () => {
    cy.get("[data-cy=radio-all").click();
    cy.contains(`${task1}`).should("not.be.hidden");
    cy.contains(`${task2}`).should("not.be.hidden");
  });
});
