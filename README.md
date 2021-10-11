## PROJEKT KALENDARZA W REACT JS 

Poniższy projekt zawiera w pełni działający kalendarz jednoroczny. Kalendarz został zbudowany przy użyciu narzędzi React JS. W kalendarzu nie użyłem żadnych bibliotek zewnętrznych. Wszystkie komponenty i funkcje zbudowałem od „zera”. Kalendarz nie zawiera warstwy back-endowej, ale pozwala przechowywać dane w localstorage przeglądarki.

– warstwa wizualna kalendarza została ograniczona do minimum. Głównym celem pracy nad kalendarzem było stworzenie jego mechaniki nie zaś stylistyki czy UX.
– wersja produkcyjna kalendarza dostępna jest pod linkiem [https://ins.stronazen.pl/]

 ## PODSTAWOWE FUNKCJONALNOŚCI

- kalendarz pokazuje aktualną temperaturę dla danego dnia. Informacje pobierane są z API jednego z serwisów pogodowych.

- podstawowym widokiem jest widok dnia. Ładowany jest aktualny dzień. Moduł dnia pozwala dodawać nowe wydarzenia wraz z godzinami ich realizacji. Każde z    wydarzeń można edytować lub usunąć. Wydarzenia są sortowane zgodnie z godziną ich wykonania.

- widok dnia pozwala za pomocą klawiszy przewijać do następnych lub poprzednich dni i zarządzać ich wydarzeniami. Ostatni lub pierwszy dzień miesiąca pozwala przejść do kolejnego miesiąca lub dnia.   

- drugim widokiem jest kalendarz miesięczny. Ten wyróżnia dni, w których zaplanowaliśmy zadania oraz podaje ich liczbę wydarzeń w danym dniu. Pozwala poruszać się pomiędzy poszczególnymi miesiącami od stycznia do grudnia bieżącego roku.

- z poziomu widoku kalendarza miesięcznego możemy przejść do dowolnego dnia w danym miesiącu np. celem dokonania jego edycji.

## BUDOWA

- kalendarz składa się z 4 podstawowych komponentów reprezentujących: pełny widok kalendarza dostępny dla użytkownika, komponent kalendarza miesięcznego oraz komponenty widoku dnia i budowy nowego wydarzenia.

- głównym komponentem jest Calendar.js. Za pomocą hooków useState przechowuje wszystkie najważniejsze stany i informacje. Z tego poziomu wartość stanów zmiennych jest dystrybuowana do komponentów wykorzystanych niżej w strukturze. Jednocześnie elementy z niższych poziomów przesyłają aktualizację stanów do głównego komponentu dzięki czemu możliwa jest natychmiastowa aktualizacja wartości w innych komponentach będących dziećmi komponentu głównego, które wykorzystują wartości przechowywane w komponencie głównym.

- generując widok kalendarza, po załadowaniu skryptu, aplikacja sprawdza w pierwszej kolejności czy localstorage przeglądarki zawiera wydarzenia. Jeśli tak są one przekazywane do zmiennej zawierającej aktualny stan wydarzeń w kalendarzu. W przeciwnym razie ładowana jest lista zawierająca 12 pustych obiektów.

- każdy obiekt w liście reprezentuje pojedynczy miesiąc (przypominam, że kalendarz obejmuje aktualny rok).

- informacje w obiektach – miesiącach są porządkowane za pomocą par klucz wartość, gdzie klucz jest odpowiednikiem dnia miesiąca. Wartością klucza – dnia jest zawsze tablica, będąca zbiorem obiektów – wydarzeń dla poszczególnego dnia.

- każdy obiekt – dzień przechowuje takie informacje jak: opis wydarzenia („title:”), czas jego rozpoczęcia i zakończenia oraz numer id. Obiekty dni są sortowane według daty rozpoczęcia.

## INSTALACJA

- kalendarz można uruchomić w środowisku lokalnym. Wystarczy skopiować powyższe repozytorium. Następnie aplikację uruchamiamy z poziomu terminala za pomocą komendy npm start. 
- aplikacja wymaga dodania klucza API serwisu openweathermap.org/api.
