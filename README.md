## **Zadanie Rekrutacyjne - Testy Automatyczne Aplikacji "Kadromierz"**

W ramach zadania rekrutacyjnego wykonano trzy testy automatyczne dla aplikacji "Kadromierz", obejmujące następujące scenariusze:

    Logowanie do aplikacji "Kadromierz" jako właściciel konta.
    Dodanie nowego pracownika do konta.
    Dodanie zmiany w grafiku dla wybranego pracownika w dniu 4 września 2024 roku.

Testy zostały zapisane w trzech plikach:

    logintests.cy.js – Test logowania.
    addingnewcustomer.cy.js – Test dodania nowego pracownika.
    shiftchange.cy.js – Test dodania zmiany w grafiku.

Dla każdego z powyższych scenariuszy przygotowano szczegółowe przypadki testowe, które weryfikują poprawność wykonania poszczególnych akcji. Celem było nie tylko sprawdzenie funkcjonalności aplikacji, ale również zaprezentowanie moich metod testowania, procesu tworzenia testów oraz sposobu zarządzania nimi.
Struktura projektu:

    cypress/e2e – zawiera scenariusze testowe.
    cypress/fixtures/users – przechowuje dane testowe w formacie JSON.
    cypress/support/commands – zawiera niestandardowe komendy, które ułatwiają interakcję z aplikacją.
    cypress.config.js – zawiera konfigurację, w tym ustawienie czasu oczekiwania, które zostało zmodyfikowane, aby uwzględnić dynamiczne ładowanie elementów na stronie (co może powodować błędy, jeśli czas oczekiwania nie jest odpowiednio dopasowany).



## **Instrukcja uruchomienia testów Cypress**

1. **Instalacja Node.js**  
   Zainstaluj **Node.js** ze strony:  
   [https://nodejs.org/](https://nodejs.org/)

2. **Inicjalizacja projektu w terminalu**  
   W terminalu przejdź do folderu, w którym chcesz stworzyć projekt, i uruchom:  
   ```bash
   npm init
   ```

3. **Instalacja Cypress**  
   Zainstaluj **Cypress** jako zależność deweloperską w projekcie:  
   ```bash
   npm install cypress
   ```

4. **Zainstalowanie Visual Studio Code**  
   Pobierz i zainstaluj **Visual Studio Code** (VSCode):  
   [https://code.visualstudio.com/](https://code.visualstudio.com/)

5. **Zainstalowanie rozszerzeń w VSCode**  
   Zainstaluj poniższe rozszerzenia w VSCode:
   - **Cypress Snippets**
   - **JavaScript (ES6)**

6. **Uruchomienie Cypress**  
   W terminalu uruchom Cypress za pomocą komendy:  
   ```bash
   npx cypress open
   ```

---

Zachęcam do zapoznania się z projektem i pozostawienia uwag. Dziękuję!

**Wszystkiego dobrego!**  
Stefan Mocia

---
























