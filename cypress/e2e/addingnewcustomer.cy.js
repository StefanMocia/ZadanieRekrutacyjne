describe('Test adding a new employee', () => {
    beforeEach(() => {
        // Visit the login page before each test
        cy.visit('https://app.kadromierz.pl/');
        cy.get('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();
        cy.fixture('users').then((users) => {
            cy.login(users.validUser.username, users.validUser.password);
        });
    });

    it('Should check the display of the add employee window', () => {

        // Handle uncaught threads
        cy.setupAndWaitLoginRequests();

        // Only after receiving a response do we perform the next steps
        cy.get('.k-sideBar')
            .should('be.visible')
            .trigger('mouseover');

        // Entering the menu element (Application mismatch for tests - attempt to .realHover() doesn't work due to browser currency)
        cy.get('.k-sideBar__menu > section:nth-child(2) > li:nth-child(3) > a:nth-child(1)').click({ force: true });

        // Checks the visibility of the new employee window
        cy.get('[data-test="showAddEmployeeModal"]').click();
        cy.get('.mdModal__container').should('be.visible');
    });

    it('Should require employee data input', () => {
        // Handle uncaught threads
        cy.setupAndWaitLoginRequests();

        // Only after receiving a response do we perform the next steps
        cy.get('.k-sideBar')
            .should('be.visible')
            .trigger('mouseover');
        cy.get('.k-sideBar__menu > section:nth-child(2) > li:nth-child(3) > a:nth-child(1)').click({ force: true });

        // Checks the visibility of the new employee window
        cy.get('[data-test="showAddEmployeeModal"]').click();
        cy.get('.mdModal__container').should('be.visible');

        // Checks the button and validation requirements
        cy.get('[data-test="confirmButton"]').click();
        cy.get('[data-test="errorMessage"]').should('contain.text', 'Uzupełnij brakujące dane w sekcjach profilu pracownika oznaczonych kolorem czerwonym.');
    });

    it('Should add all employee locations - "Locations" tab', () => {
        // Handle uncaught threads
        cy.setupAndWaitLoginRequests();

        // Only after receiving a response do we perform the next steps
        cy.get('.k-sideBar')
            .should('be.visible')
            .trigger('mouseover');
        cy.get('.k-sideBar__menu > section:nth-child(2) > li:nth-child(3) > a:nth-child(1)').click({ force: true });

        // Checks the visibility of the new employee window
        cy.get('[data-test="showAddEmployeeModal"]').click();
        cy.get('.mdModal__container').should('be.visible');

        // Go to the location tab and select all
        cy.get('[data-test="locationsTab"]').click();
        cy.get('[data-test="addAllLocations"]').click();
        cy.get('.selectedOptions__item').should('exist');
    });

    it('Should remove all employee locations - "Locations" tab', () => {
        // Handle uncaught threads
        cy.setupAndWaitLoginRequests();

        // Only after receiving a response do we perform the next steps
        cy.get('.k-sideBar')
            .should('be.visible')
            .trigger('mouseover');
        cy.get('.k-sideBar__menu > section:nth-child(2) > li:nth-child(3) > a:nth-child(1)').click({ force: true });

        // Checks the visibility of the new employee window
        cy.get('[data-test="showAddEmployeeModal"]').click();
        cy.get('.mdModal__container').should('be.visible');

        // Go to the location tab and select all
        cy.get('[data-test="locationsTab"]').click();
        cy.get('[data-test="addAllLocations"]').click();
        cy.get('.selectedOptions__item').should('exist');

        // Go to the location tab and remove all
        cy.get('[data-test="locationsTab"]').click();
        cy.get('[data-test="deleteAllLocations"]').click();
        cy.get('.selectedOptions__item').should('not.exist');
    });

    it('Should add the first position from the list - "Positions and rates" tab', () => {
        // Handle uncaught threads
        cy.setupAndWaitLoginRequests();

        // Only after receiving a response do we perform the next steps
        cy.get('.k-sideBar')
            .should('be.visible')
            .trigger('mouseover');
        cy.get('.k-sideBar__menu > section:nth-child(2) > li:nth-child(3) > a:nth-child(1)').click({ force: true });

        // Checks the visibility of the new employee window
        cy.get('[data-test="showAddEmployeeModal"]').click();
        cy.get('.mdModal__container').should('be.visible');

        // Go to the positions and rates tab
        cy.get('[data-test="contractsTab"]').click();

        // Select the first position from the list
        cy.get('[data-test="jobTitlesSelect"]').click();
        cy.get('.mdMultiSelect__dropdown__item').click();
        cy.get('.selectedOptions__item').should('exist')
    });

    it('Should remove the selected position - "Positions and rates" tab', () => {
        // Handle uncaught threads
        cy.setupAndWaitLoginRequests();

        // Only after receiving a response do we perform the next steps
        cy.get('.k-sideBar')
            .should('be.visible')
            .trigger('mouseover');
        cy.get('.k-sideBar__menu > section:nth-child(2) > li:nth-child(3) > a:nth-child(1)').click({ force: true });

        // Checks the visibility of the new employee window
        cy.get('[data-test="showAddEmployeeModal"]').click();
        cy.get('.mdModal__container').should('be.visible');

        // Go to the positions and rates tab
        cy.get('[data-test="contractsTab"]').click();
        cy.get('[data-test="jobTitlesSelect"]').click();

        // Add all positions
        cy.get('[data-test="addAllJobTitles"]').click();
        cy.get('.selectedOptions__item').should('exist')
        cy.get('[data-test="deleteTerm-Obsługa klienta"] > .material-icons').click();
        cy.get('.selectedOptions__item').should('not.exist')
        //
    });

    it('Should add an employee', () => {
        // Handle uncaught threads
        cy.setupAndWaitLoginRequests();

        // Only after receiving a response do we perform the next steps
        cy.get('.k-sideBar')
            .should('be.visible')
            .trigger('mouseover');
        cy.get('.k-sideBar__menu > section:nth-child(2) > li:nth-child(3) > a:nth-child(1)').click({ force: true });

        // Checks the visibility of the new employee window
        cy.get('[data-test="showAddEmployeeModal"]').click();
        cy.get('.mdModal__container').should('be.visible');

        // Fill in data in the "Basic" tab
        cy.fixture('users').then((users) => {
            cy.get('[data-test="name-input"]').type(users.worker.name);
            cy.get('[data-test="lastName-input"]').type(users.worker.surname);
        });

        // Fill in data in the "Location" tab
        cy.get('[data-test="locationsTab"]').click();
        cy.get('[data-test="addAllLocations"]').click();
        cy.get('.selectedOptions__item').should('exist');

        // Fill in data in the "Positions and rates" tab
        cy.get('[data-test="contractsTab"]').click();
        cy.get('[data-test="addAllJobTitles"]').click();
        cy.get('.selectedOptions__item').should('exist');

        // Save the new employee
        cy.get('[data-test="confirmButton"]').click();
        cy.fixture('users').then((users) => {
            // Enter the input for the new employee's data
            cy.get('#search-word')
                .click()
                .type((users.worker.name + " " + users.worker.surname));

            // Verify if the employee has been added to the employee table
            cy.get('.kadroGrid__contentContainer').contains(users.worker.name + " " + users.worker.surname).should('exist');
        });
    });
});