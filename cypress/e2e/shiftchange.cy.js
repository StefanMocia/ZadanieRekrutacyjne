describe('Tests for schedule changes for a selected employee', () => {
    beforeEach(() => {
        // Visit the login page before each test
        cy.visit('https://app.kadromierz.pl/');
        cy.get('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();
        cy.fixture('users').then((users) => {
            cy.login(users.validUser.username, users.validUser.password);
        });
    });

    it('Should check the display of work schedule', () => {
        //Handling uncaught threads
        cy.setupAndWaitLoginRequests();

        //Only after receiving a response, execute the next steps
        cy.get('.k-sideBar')
            .should('be.visible')
            .trigger('mouseover');

        //Entering the menu element (Application mismatch for tests - attempt .realHover() doesn't work due to browser currency)
        cy.get('li.k-sideBarMenu__item:nth-child(4) > a:nth-child(1)').click({ force: true });

        //Checking the visibility of the work schedule
        cy.get('.k-tableWrapper').should('exist');
    });

    it('Should check selected dates from the calendar', () => {
        //Handling uncaught threads
        cy.setupAndWaitLoginRequests();

        //Only after receiving a response, we execute the next steps
        cy.get('.k-sideBar')
            .should('be.visible')
            .trigger('mouseover');

        //Entering the menu element (Application mismatch for tests - attempt .realHover() doesn't work due to browser currency)
        cy.get('li.k-sideBarMenu__item:nth-child(4) > a:nth-child(1)').click({ force: true });

        //Entering the calendar window
        cy.get('.k-topBarCalendar__dateText').click();

        //Selecting a day range in the calendar
        cy.get('div:nth-child(1) > .rdrMonthName').should('be.visible').then(function checkMonth() {
            let repetiontime = 0;
            const maxrep = 4;

            function checkMonth() {
                if (repetiontime >= maxrep) return;

                cy.get('div:nth-child(1) > .rdrMonthName').then(($month) => {
                    const actualDate = $month.text();

                    if (actualDate !== 'wrzesień 2024') {
                        repetiontime++;
                        cy.get('.rdrPprevButton')
                            .click()
                            .then(() => {
                                cy.get('div:nth-child(1) > .rdrMonthName')
                                    .should('not.have.text', actualDate)
                                    .then(checkMonth);
                            });
                    }
                });
            }
            checkMonth();
        });

        //Yes, I know this is not the perfect solution... but when time is running out..
        //Selecting a specific date from the previously indicated month 
        cy.get('div.rdrMonth:nth-child(1) > div:nth-child(3) > button:nth-child(10)').contains('4').click();
        cy.get('div.rdrMonth:nth-child(1) > div:nth-child(3) > button:nth-child(11)').contains('5').click();

        //Closing the window
        cy.get('.kpopover > :nth-child(2) > .material-icons').click();

        // Open schedule in specific day
        cy.get('tr.scheduleTable__row:nth-child(1) > td:nth-child(2) > div:nth-child(2)').click();
        cy.get('div.mdModal__container--medium:nth-child(1) > div:nth-child(2)').should('be.visible');

        //Type date and accept changes
        cy.get('.k-textInput').type('10:00-00:00');
        cy.get('[data-test="confirmButton"]').click();

        //Expect a schedule
        cy.get('.k-scheduleBlock__dropArea').should('exist');


        // To be continued...........
    });
});