/// <reference types="cypress" />

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
    }
  }
}

export {};

Cypress.Commands.add("login", () => {
  const USER_EMAIL = Cypress.env("USER_EMAIL");
  const USER_PASSWORD = Cypress.env("USER_PASSWORD");

  if (!USER_EMAIL || !USER_PASSWORD) {
    throw new Error("USER_EMAIL or USER_PASSWORD not defined");
  }

  cy.session("nextauth-session", () => {
    cy.visit("/sign-in");
    cy.get('input[name="email"]').type(USER_EMAIL);
    cy.get('input[name="password"]').type(USER_PASSWORD);
    cy.get('button[type="submit"]').click();

    cy.url().should("not.include", "/sign-in");
  });
});
