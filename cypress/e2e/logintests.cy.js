describe('Test logowania', () => {
    beforeEach(() => {
        // Odwiedź stronę logowania przed każdym testem
        cy.visit('https://app.kadromierz.pl/');
        cy.get('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();
    });



    it('Powinno zalogować użytkownika z poprawnymi danymi', () => {
        cy.fixture('users').then((users) => {
            // Wprowadzenie poprawnego e-maila
            cy.get('input[name="email"]').type(users.validUser.username);

            // Wprowadzenie poprawnego hasła
            cy.get('input[name="passwordLogin"]').type(users.validUser.password);
        });
        // Kliknięcie przycisku logowania
        cy.get('[data-test="loginButton"]').click();

        // Oczekiwanie, że użytkownik zostanie przekierowany na stronę główną
        cy.url({ timeout: 10000 }).should('eq', 'https://app.kadromierz.pl/trial');

        //Obsługa niewychwyconych wątków
        cy.setupAndWaitLoginRequests();

        // Sprawdzenie, czy na stronie głównej pojawia się element wskazujący na zalogowanie
        cy.get('.dashboardTopBar').should('exist');
    });

    it('Powinno pokazać błąd przy niepoprawnych danych logowania', () => {
        cy.fixture('users').then((users) => {
            // Wprowadzenie niepoprawnego e-maila
            cy.get('input[name="email"]').type(users.invalidUser.username);

            // Wprowadzenie niepoprawnego hasła
            cy.get('input[name="passwordLogin"]').type(users.invalidUser.password);
        });
        // Kliknięcie przycisku logowania
        cy.get('[data-test="loginButton"]').click();

        // Sprawdzenie, czy pojawia się komunikat o błędzie
        cy.get('.top-right').should('contain.text', 'Błąd podczas logowania');
    });


    // Błąd dewelopementu - sprawdzić widoki, dlaczego wyświetla się awaria systemu?
    it('Powinno wymagać wprowadzenia danych logowania', () => {
        // Kliknięcie przycisku logowania bez wypełniania pól
        cy.get('[data-test="loginButton"]').click();

        // Sprawdzenie, czy pola e-mail i hasło wskazują na błąd
        cy.wait(5000);
        cy.get('input[name="email"]').siblings('.kmd-textInput__error').should('contain.text', 'Proszę podać adres email');
        cy.get('input[name="passwordLogin"]').siblings('.kmd-textInput__error').should('contain.text', 'Proszę podać hasło');
    });
});
