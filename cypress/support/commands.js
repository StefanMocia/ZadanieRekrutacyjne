// import 'cypress-real-events';

Cypress.Commands.add('login', (username, password) => {
  cy.get('input[name="email"]').type(username);
  cy.get('input[name="passwordLogin"]').type(password);
  cy.get('[data-test="loginButton"]').click();
  cy.url({ timeout: 10000 }).should('eq', 'https://app.kadromierz.pl/trial');
});


Cypress.Commands.add('setupAndWaitLoginRequests', () => {
  // Handles uncaught exceptions
  cy.on('uncaught:exception', (err, runnable, promise) => {
    if (promise) {
      return false; // Ignore the error if it's a promise
    }
  });

  // Add interceptor for all requests before the test
  cy.intercept('**/*').as('allRequests');

  // Wait for all requests to complete
  cy.wait('@allRequests', { timeout: 100000 });

  // Continue the test after the loader completely disappears
  cy.get('.dashboardTopBar').should('be.visible');

  // Intercept request to milestones
  cy.intercept('GET', '**/api.kadromierz.pl/milestones').as('milestones');

  // Wait for the response with this specific status
  cy.wait('@milestones')
    .its('response.statusCode')
    .should('eq', 304);
});



