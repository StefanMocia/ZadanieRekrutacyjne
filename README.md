Zadanie Rekrutacyjne - Testy Automatyczne Aplikacji "Kadromierz"

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

Zachęcam do zapoznania się z projektem i pozostawienia uwag. Dziękuję!


Wszystkiego dobrego
Stefan Mocia
























