describe('Test logowania', () => {
    beforeEach(() => {
        // Odwiedź stronę logowania przed każdym testem
        cy.visit('https://app.kadromierz.pl/');
        cy.get('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();
        cy.get('input[name="email"]').type('stefanmocia.mocia@gmail.com');
        cy.get('input[name="passwordLogin"]').type('ZadanieRekrutacyjne987!@#');
        cy.get('[data-test="loginButton"]').click();
        cy.url({ timeout: 10000 }).should('eq', 'https://app.kadromierz.pl/trial');
        cy.get('.k-sideBar').should('exist');
    });
    it('Powinno sprawdzać walidację pól formularza - komunikat + kolorowanie pól', () => {
      



    });

    it('Powinno pokazać błąd w przypadku nieprawidłowego adresu e-mail - zakładka "Podstawowe"', () => {
        


    });

    it('Powinno dodać wszystkie lokalizację pracownika - zakładka "Lokalizacje"', () => {
       


    });

    it('Powinno usunąć wszystkie lokalizację pracownika - zakładka "Lokalizacje"', () => {
       


    });

    it('Powinno dodać wszystkie stanowiska pracownika - zakładka "Stanowiska i stawki"', () => {
       


    });

    it('Powinno usunąć wszystkie stanowiska pracownika - zakładka "Stanowiska i stawki"', () => {
       


    });

    it('Powinno dodać pracownika', () => {
       


    });

});