describe('Login Test', () => {
    beforeEach(() => {
        // Visit the login page before each test
        cy.visit('https://app.kadromierz.pl/');
        cy.get('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();
    });


    it('Should log in user with correct credentials', () => {
        cy.fixture('users').then((users) => {
            // Enter correct email
            cy.get('input[name="email"]').type(users.validUser.username);

            // Enter correct password
            cy.get('input[name="passwordLogin"]').type(users.validUser.password);
        });
        // Click login button
        cy.get('[data-test="loginButton"]').click();

        // Expect user to be redirected to the main page
        cy.url({ timeout: 10000 }).should('eq', 'https://app.kadromierz.pl/trial');

        // Handle uncaught threads
        cy.setupAndWaitLoginRequests();

        // Check if an element indicating successful login appears on the main page
        cy.get('.dashboardTopBar').should('exist');
    });

    it('Should show an error with incorrect login credentials', () => {
        cy.fixture('users').then((users) => {
            // Enter incorrect email
            cy.get('input[name="email"]').type(users.invalidUser.username);

            // Enter incorrect password
            cy.get('input[name="passwordLogin"]').type(users.invalidUser.password);
        });
        // Click login button
        cy.get('[data-test="loginButton"]').click();

        // Check if an error message appears
        cy.get('.top-right').should('contain.text', 'Błąd podczas logowania');
    });


    // Development error - check views, why is system failure displayed?
    it('Should require login credentials', () => {
        // Click login button without filling in fields
        cy.get('[data-test="loginButton"]').click();

        // Check if email and password fields indicate an error
        cy.wait(5000);
        cy.get('input[name="email"]').siblings('.kmd-textInput__error').should('contain.text', 'Please enter an email address');
        cy.get('input[name="passwordLogin"]').siblings('.kmd-textInput__error').should('contain.text', 'Please enter a password');
    });
});