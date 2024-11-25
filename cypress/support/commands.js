import 'cypress-real-events';

Cypress.Commands.add('login', (username, password) => {
  cy.get('input[name="email"]').type(username);
  cy.get('input[name="passwordLogin"]').type(password);
  cy.get('[data-test="loginButton"]').click();
  cy.url({ timeout: 10000 }).should('eq', 'https://app.kadromierz.pl/trial');
});


Cypress.Commands.add('setupAndWaitLoginRequests', () => {
  // Obsługuje nieuchwycone wyjątki
  cy.on('uncaught:exception', (err, runnable, promise) => {
    if (promise) {
      return false; // Ignoruj błąd, jeśli jest to promise
    }
  });

  // Przed testem dodaj interceptor dla wszystkich requestów
  cy.intercept('**/*').as('allRequests');

  // Poczekaj na zakończenie wszystkich requestów
  cy.wait('@allRequests', { timeout: 100000 });

  // Kontynuujemy test po całkowitym zniknięciu loadera
  cy.get('.dashboardTopBar').should('be.visible');

  // Przechwytujemy request do milestones
  cy.intercept('GET', '**/api.kadromierz.pl/milestones').as('milestones');

  // Czekamy na odpowiedź z tym konkretnym statusem
  cy.wait('@milestones')
    .its('response.statusCode')
    .should('eq', 304);
});



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