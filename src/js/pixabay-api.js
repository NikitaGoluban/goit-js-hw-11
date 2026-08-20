// Importujemy bibliotekę Axios, która służy do wykonywania zapytań HTTP.
// Dzięki niej możemy komunikować się z API Pixabay bez używania fetch().
import axios from 'axios';

// Klucz API identyfikuje naszą aplikację podczas wysyłania zapytań do Pixabay.
// Pixabay wymaga przekazania tego klucza w każdym zapytaniu.
// W aplikacji frontendowej klucz będzie widoczny w kodzie wysłanym do przeglądarki.
const API_KEY = '34730863-c268bffb7a5a82490d4aafc58';

// Ustawiamy wspólny adres bazowy dla wszystkich zapytań wykonywanych przez Axios.
// Dzięki temu niżej wystarczy podać pustą ścieżkę w axios.get('').
axios.defaults.baseURL = 'https://pixabay.com/api/';

// Eksportujemy funkcję, aby można było zaimportować ją w pliku main.js.
// Parametr query to tekst wpisany przez użytkownika, np. "cats" albo "red flowers".
export function getImagesByQuery(query) {
  // axios.get() wysyła zapytanie metodą GET.
  // Funkcja natychmiast zwraca Promise, ponieważ odpowiedź z serwera
  // pojawi się dopiero po pewnym czasie.
  return (
    axios
      .get('', {
        // Obiekt params zostanie automatycznie zamieniony przez Axios
        // na parametry adresu URL, np. ?key=...&q=cats&image_type=photo.
        params: {
          // Klucz dostępu wymagany przez Pixabay.
          key: API_KEY,

          // Szukane słowo przekazane do funkcji getImagesByQuery().
          q: query,

          // Ograniczamy wyniki wyłącznie do fotografii.
          image_type: 'photo',

          // Prosimy o obrazy w orientacji poziomej.
          orientation: 'horizontal',

          // Włączamy bezpieczne wyszukiwanie, aby odfiltrować treści dla dorosłych.
          safesearch: true,
        },
      })
      // Po udanym zapytaniu Axios przekazuje do then() cały obiekt odpowiedzi.
      // response.data zawiera dane zwrócone przez Pixabay, między innymi:
      // - total — liczbę wszystkich znalezionych elementów,
      // - totalHits — liczbę dostępnych wyników,
      // - hits — tablicę obiektów reprezentujących obrazy.
      .then(response => {
        // Zwracamy tylko dane API, ponieważ informacje techniczne odpowiedzi Axios
        // (np. status i nagłówki HTTP) nie są potrzebne w main.js.
        // Wartość zwrócona tutaj trafi do kolejnego then() w pliku main.js.
        return response.data;
      })
  );
}
