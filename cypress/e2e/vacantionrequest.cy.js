describe('Test logowania', () => {
    beforeEach(() => {
        // Odwiedź stronę logowania przed każdym testem
        cy.visit('https://app.kadromierz.pl/');
        cy.get('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();
    });
});