describe('Test logowania', () => {
    beforeEach(() => {
        // Odwiedź stronę logowania przed każdym testem
        cy.visit('https://app.kadromierz.pl/');
        cy.get('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();
    });


    // do poprawy ostatni wiersz testu - sprawdzamy bo złym widoku
    it('Powinno zalogować użytkownika z poprawnymi danymi', () => {
        // Wprowadzenie poprawnego e-maila
        cy.get('input[name="email"]').type('stefanmocia.mocia@gmail.com');

        // Wprowadzenie poprawnego hasła
        cy.get('input[name="passwordLogin"]').type('ZadanieRekrutacyjne987!@#');

        // Kliknięcie przycisku logowania
        cy.get('[data-test="loginButton"]').click();

        // Oczekiwanie, że użytkownik zostanie przekierowany na stronę główną
        cy.url({ timeout: 10000 }).should('eq', 'https://app.kadromierz.pl/trial');

        // // Sprawdzenie, czy na stronie głównej pojawia się element wskazujący na zalogowanie
        cy.get('.k-sideBar').should('exist');
    });

    it('Powinno pokazać błąd przy niepoprawnych danych logowania', () => {
        // Wprowadzenie niepoprawnego e-maila
        cy.get('input[name="email"]').type('niepoprawny@wp.com');

        // Wprowadzenie niepoprawnego hasła
        cy.get('input[name="passwordLogin"]').type('niepoprawny');

        // Kliknięcie przycisku logowania
        cy.get('[data-test="loginButton"]').click();

        // Sprawdzenie, czy pojawia się komunikat o błędzie
        cy.get('.top-right').should('contain.text', 'Błąd podczas logowania');
    });


    //do poprawy (w cypress prezentujemy pop-up, w realizach nie ma takiego przypadku. Do zbadania)
    it('Powinno wymagać wprowadzenia danych logowania', () => {
        // Kliknięcie przycisku logowania bez wypełniania pól
        cy.get('[data-test="loginButton"]').click();

        // Sprawdzenie, czy pola e-mail i hasło wskazują na błąd
        cy.wait(5000);
        cy.get('input[name="email"]').siblings('.kmd-textInput__error').should('contain.text', 'Proszę podać adres email');
        cy.get('input[name="passwordLogin"]').siblings('.kmd-textInput__error').should('contain.text', 'Proszę podać hasło');
    });
});
