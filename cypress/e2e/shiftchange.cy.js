describe('Testy zmian grafiku dla wybranego pracownika', () => {
    beforeEach(() => {
        // Odwiedź stronę logowania przed każdym testem
        cy.visit('https://app.kadromierz.pl/');
        cy.get('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();
        cy.fixture('users').then((users) => {
            cy.login(users.validUser.username, users.validUser.password);
        });
    });

    // it('Powinno sprawdzać wyświetlanie grafiku  pracy ', () => {
    //     //Obsługa niewychwyconych wątków
    //     cy.setupAndWaitLoginRequests();

    //     //Dopiero po otrzymaniu odpowiedzi wykonuje kolejne kroki
    //     cy.get('.k-sideBar')
    //         .should('be.visible')
    //         .trigger('mouseover');

    //     //Wchodzenie w element z menu (Niedopasowanie aplikacji pod testy - próba .realHover() nie działa ze względu na aktualność przeglądarek)
    //     cy.get('li.k-sideBarMenu__item:nth-child(4) > a:nth-child(1)').click({ force: true });

    //     //Sprawdzanie widoczności grafiku pracy
    //     cy.get('.k-tableWrapper').should('exist');
    // });

    it('Powinno sprawdzać wybrane daty z kalendarza', () => {
        //Obsługa niewychwyconych wątków
        cy.setupAndWaitLoginRequests();

        //Dopiero po otrzymaniu odpowiedzi wykonujemy kolejne kroki
        cy.get('.k-sideBar')
            .should('be.visible')
            .trigger('mouseover');

        //Wchodzenie w element z menu (Niedopasowanie aplikacji pod testy - próba .realHover() nie działa ze względu na aktualność przeglądarek)
        cy.get('li.k-sideBarMenu__item:nth-child(4) > a:nth-child(1)').click({ force: true });

        //Wchodzenie w okno kalendarza 
        cy.get('.k-topBarCalendar__dateText').click();

        //Zaznaczenie przedziału dniowego w kalendarzu
        cy.get('div:nth-child(1) > .rdrMonthName').should('be.visible').then(function checkMonth() {
            let licznikProb = 0;
            const maxProb = 4;

            function sprawdzMiesiac() {
                if (licznikProb >= maxProb) return;

                cy.get('div:nth-child(1) > .rdrMonthName').then(($month) => {
                    const aktualnaData = $month.text();
                    cy.log('Sprawdzam miesiąc:', aktualnaData);

                    if (aktualnaData !== 'wrzesień 2024') {
                        licznikProb++;
                        cy.get('.rdrPprevButton')
                            .click()
                            .then(() => {
                                cy.get('div:nth-child(1) > .rdrMonthName')
                                    .should('not.have.text', aktualnaData)
                                    .then(sprawdzMiesiac);
                            });
                    }
                });
            }
            sprawdzMiesiac();
        });
        //Wybranie konkretnej daty z wcześniej wskazanego miesiąca
        cy.get('div.rdrMonth:nth-child(1) > div:nth-child(3) > button:nth-child(10)').contains('4').click();
        cy.get('div.rdrMonth:nth-child(1) > div:nth-child(3) > button:nth-child(11)').contains('5').click();

        //Zamykanie okna
        cy.get('.kpopover > :nth-child(2) > .material-icons').click();


        // cy.get('.rdrMonthName').should('be.visible');

        //Zaznaczenie konkretnej daty
        // cy.get('.rdrMonths > :nth-child(1)').contains('4').click();

        //Zapisanie przedziału
    });
});