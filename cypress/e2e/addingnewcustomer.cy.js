describe('Test dodawania nowego pracownika', () => {
    beforeEach(() => {
        // Odwiedź stronę logowania przed każdym testem
        cy.visit('https://app.kadromierz.pl/');
        cy.get('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();
        cy.fixture('users').then((users) => {
            cy.login(users.validUser.username, users.validUser.password);
        });
    });

    it('Powinno sprawdzać wyświetlanie okna dodawania pracownika', () => {

        //Obsługa niewychwyconych wątków
        cy.setupAndWaitLoginRequests();

        //Dopiero po otrzymaniu odpowiedzi wykonujemy kolejne kroki
        cy.get('.k-sideBar')
            .should('be.visible')
            .trigger('mouseover');

        //Wchodzenie w element z menu (Niedopasowanie aplikacji pod testy - próba .realHover() nie działa ze względu na aktualność przeglądarek)
        cy.get('.k-sideBar__menu > section:nth-child(2) > li:nth-child(3) > a:nth-child(1)').click({ force: true });

        //Sprawdza widoczność okna nowego pracownika
        cy.get('[data-test="showAddEmployeeModal"]').click();
        cy.get('.mdModal__container').should('be.visible');
    });

    it('Powinno wymagać wprowadzenia danych pracownika', () => {
        //Obsługa niewychwyconych wątków
        cy.setupAndWaitLoginRequests();

        //Dopiero po otrzymaniu odpowiedzi wykonujemy kolejne kroki
        cy.get('.k-sideBar')
            .should('be.visible')
            .trigger('mouseover');
        cy.get('.k-sideBar__menu > section:nth-child(2) > li:nth-child(3) > a:nth-child(1)').click({ force: true });

        //Sprawdza widoczność okna nowego pracownika
        cy.get('[data-test="showAddEmployeeModal"]').click();
        cy.get('.mdModal__container').should('be.visible');

        //Sprawdza przycisk i wymagania walidacyjne
        cy.get('[data-test="confirmButton"]').click();
        cy.get('[data-test="errorMessage"]').should('contain.text', 'Uzupełnij brakujące dane w sekcjach profilu pracownika oznaczonych kolorem czerwonym.');
    });

    it('Powinno dodawać wszystkie lokalizację pracownika - zakładka "Lokalizacje"', () => {
        //Obsługa niewychwyconych wątków
        cy.setupAndWaitLoginRequests();

        //Dopiero po otrzymaniu odpowiedzi wykonujemy kolejne kroki
        cy.get('.k-sideBar')
            .should('be.visible')
            .trigger('mouseover');
        cy.get('.k-sideBar__menu > section:nth-child(2) > li:nth-child(3) > a:nth-child(1)').click({ force: true });

        //Sprawdza widoczność okna nowego pracownika
        cy.get('[data-test="showAddEmployeeModal"]').click();
        cy.get('.mdModal__container').should('be.visible');

        //Przejście do zakładki lokalizacja i wybranie wszystkich
        cy.get('[data-test="locationsTab"]').click();
        cy.get('[data-test="addAllLocations"]').click();
        cy.get('.selectedOptions__item').should('exist');
    });

    it('Powinno usuwać wszystkie lokalizację pracownika - zakładka "Lokalizacje"', () => {
        //Obsługa niewychwyconych wątków
        cy.setupAndWaitLoginRequests();

        //Dopiero po otrzymaniu odpowiedzi wykonujemy kolejne kroki
        cy.get('.k-sideBar')
            .should('be.visible')
            .trigger('mouseover');
        cy.get('.k-sideBar__menu > section:nth-child(2) > li:nth-child(3) > a:nth-child(1)').click({ force: true });

        //Sprawdza widoczność okna nowego pracownika
        cy.get('[data-test="showAddEmployeeModal"]').click();
        cy.get('.mdModal__container').should('be.visible');

        //Przejście do zakładki lokalizacja i wybranie wszystkich
        cy.get('[data-test="locationsTab"]').click();
        cy.get('[data-test="addAllLocations"]').click();
        cy.get('.selectedOptions__item').should('exist');

        //Przejście do zakładki lokalizacja i usunięcie wszystkich
        cy.get('[data-test="locationsTab"]').click();
        cy.get('[data-test="deleteAllLocations"]').click();
        cy.get('.selectedOptions__item').should('not.exist');
    });

    it('Powinno dodawać pierwsze stanowisko z listy - zakładka "Stanowiska i stawki"', () => {
        //Obsługa niewychwyconych wątków
        cy.setupAndWaitLoginRequests();

        //Dopiero po otrzymaniu odpowiedzi wykonujemy kolejne kroki
        cy.get('.k-sideBar')
            .should('be.visible')
            .trigger('mouseover');
        cy.get('.k-sideBar__menu > section:nth-child(2) > li:nth-child(3) > a:nth-child(1)').click({ force: true });

        //Sprawdza widoczność okna nowego pracownika
        cy.get('[data-test="showAddEmployeeModal"]').click();
        cy.get('.mdModal__container').should('be.visible');

        //Przejście do zakładki stanowiska i stawki
        cy.get('[data-test="contractsTab"]').click();

        //Wybranie pierwszego stanowiska z listy
        cy.get('[data-test="jobTitlesSelect"]').click();
        cy.get('.mdMultiSelect__dropdown__item').click();
        cy.get('.selectedOptions__item').should('exist')
    });

    it('Powinno usuwać wybrane stanowisko - zakładka "Stanowiska i stawki"', () => {
        //Obsługa niewychwyconych wątków
        cy.setupAndWaitLoginRequests();

        //Dopiero po otrzymaniu odpowiedzi wykonujemy kolejne kroki
        cy.get('.k-sideBar')
            .should('be.visible')
            .trigger('mouseover');
        cy.get('.k-sideBar__menu > section:nth-child(2) > li:nth-child(3) > a:nth-child(1)').click({ force: true });

        //Sprawdza widoczność okna nowego pracownika
        cy.get('[data-test="showAddEmployeeModal"]').click();
        cy.get('.mdModal__container').should('be.visible');

        //Przejście do zakładki stanowiska i stawki
        cy.get('[data-test="contractsTab"]').click();
        cy.get('[data-test="jobTitlesSelect"]').click();

        //Dodanie wszystkich stanowisk
        cy.get('[data-test="addAllJobTitles"]').click();
        cy.get('.selectedOptions__item').should('exist')
        cy.get('[data-test="deleteTerm-Obsługa klienta"] > .material-icons').click();
        cy.get('.selectedOptions__item').should('not.exist')
        //
    });

    it('Powinno dodać pracownika', () => {
        //Obsługa niewychwyconych wątków
        cy.setupAndWaitLoginRequests();

        //Dopiero po otrzymaniu odpowiedzi wykonujemy kolejne kroki
        cy.get('.k-sideBar')
            .should('be.visible')
            .trigger('mouseover');
        cy.get('.k-sideBar__menu > section:nth-child(2) > li:nth-child(3) > a:nth-child(1)').click({ force: true });

        //Sprawdza widoczność okna nowego pracownika
        cy.get('[data-test="showAddEmployeeModal"]').click();
        cy.get('.mdModal__container').should('be.visible');

        //Uzupełnia dane w zakładce "Podstawowe"
        cy.fixture('users').then((users) => {
            cy.get('[data-test="name-input"]').type(users.worker.name);
            cy.get('[data-test="lastName-input"]').type(users.worker.surname);
        });

        //Uzupełnia dane w zakładce "Lokalizacja"
        cy.get('[data-test="locationsTab"]').click();
        cy.get('[data-test="addAllLocations"]').click();
        cy.get('.selectedOptions__item').should('exist');

        //Uzupełnia dane w zakładce "Stanowiska i stawki"
        cy.get('[data-test="contractsTab"]').click();
        cy.get('[data-test="addAllJobTitles"]').click();
        cy.get('.selectedOptions__item').should('exist');

        //Zapisuje nowego pracownika
        cy.get('[data-test="confirmButton"]').click();
        cy.fixture('users').then((users) => {
            //Wejście w input po danych nowego pracownika
            cy.get('#search-word')
                .click()
                .type((users.worker.name + " " + users.worker.surname));

            //Weryfikuje czy pracownik dodał dodany do tabeli pracowników
            cy.get('.kadroGrid__contentContainer').contains(users.worker.name + " " + users.worker.surname).should('exist');
        });
    });
});






