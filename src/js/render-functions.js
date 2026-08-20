// Importujemy klasę SimpleLightbox. Biblioteka otwiera powiększone zdjęcie
// w oknie modalnym po kliknięciu miniatury w galerii.
import SimpleLightbox from 'simplelightbox';

// Importujemy gotowe style biblioteki. Bez tego okno modalne nie miałoby
// odpowiedniego wyglądu, animacji oraz przycisków sterujących.
import 'simplelightbox/dist/simple-lightbox.min.css';

// Pobieramy z dokumentu element <ul class="gallery">.
// W tym elemencie będą umieszczane wszystkie wygenerowane karty obrazów.
const galleryListEl = document.querySelector('.gallery');

// Pobieramy kontener loadera. Dodawanie lub usuwanie klasy is-hidden
// będzie sterowało jego widocznością.
const loaderEl = document.querySelector('.loader-wrapper');

// Tworzymy jedną instancję SimpleLightbox dla wszystkich linków <a>,
// które znajdują się wewnątrz elementu .gallery.
// Instancję tworzymy tylko raz, a po dodaniu nowych obrazów ją odświeżamy.
const lightbox = new SimpleLightbox('.gallery a', {
  // Podpis pod powiększonym obrazem zostanie pobrany z atrybutu alt obrazka.
  captionsData: 'alt',

  // Podpis pojawi się 250 milisekund po otwarciu obrazu.
  captionDelay: 250,
});

// Funkcja otrzymuje tablicę obiektów obrazów zwróconą przez Pixabay.
// Nie zwraca wyniku — jej zadaniem jest zmodyfikowanie zawartości strony.
export const createGallery = images => {
  // map() przechodzi po każdym obiekcie obrazu i zamienia go na tekst HTML.
  // Wynikiem map() jest tablica tekstów zawierających znaczniki <li>.
  // W każdym obiekcie wykorzystujemy następujące dane:
  // - largeImageURL — adres dużego obrazu otwieranego przez SimpleLightbox,
  // - webformatURL — adres mniejszego obrazu wyświetlanego w galerii,
  // - tags — opis obrazu używany w atrybucie alt,
  // - likes, views, comments i downloads — statystyki obrazu.
  const galleryItemsMarkup = images
    .map(
      // Dla każdego obrazu tworzymy jedną kartę galerii.
      // Template literal (tekst zapisany pomiędzy znakami `) pozwala
      // wstawiać wartości JavaScript za pomocą składni ${...}.
      image => `<li class="gallery-item">
          <a href="${image.largeImageURL}" class="gallery-link">
            <img
              class="gallery-img"
              src="${image.webformatURL}"
              alt="${image.tags}"
              loading="lazy"
            />
          </a>  
          <div class="img-descr-wrapper">
            <p class="img-descr">
              <span class="descr-title">Likes</span>
              <span class="descr-text">${image.likes}</span>
            </p>
            <p class="img-descr">
              <span class="descr-title">Views</span>
              <span class="descr-text">${image.views}</span>
            </p>
            <p class="img-descr">
              <span class="descr-title">Comments</span>
              <span class="descr-text">${image.comments}</span>
            </p>
            <p class="img-descr">
              <span class="descr-title">Downloads</span>
              <span class="descr-text">${image.downloads}</span>
            </p>
          </div>
        </li>`
    )
    // join('') łączy tablicę fragmentów HTML w jeden długi tekst.
    // Pusty separator oznacza, że między kartami nic dodatkowego nie wstawiamy.
    .join('');

  // Dodajemy cały przygotowany HTML do galerii jedną operacją DOM.
  // 'beforeend' oznacza: wstaw zawartość na końcu elementu .gallery.
  galleryListEl.insertAdjacentHTML('beforeend', galleryItemsMarkup);

  // Linki galerii zostały utworzone dopiero przed chwilą, dlatego informujemy
  // SimpleLightbox, że powinien ponownie odczytać elementy pasujące do .gallery a.
  lightbox.refresh();
};

// Funkcja usuwa wszystkie obecne karty obrazów z galerii.
// Jest wywoływana przed rozpoczęciem nowego wyszukiwania, aby wyniki
// poprzedniego zapytania nie mieszały się z nowymi wynikami.
export const clearGallery = () => {
  // Przypisanie pustego tekstu usuwa całą zawartość elementu <ul>.
  galleryListEl.innerHTML = '';
};

// Funkcja pokazuje loader przed wysłaniem zapytania HTTP.
export const showLoader = () => {
  // Usunięcie klasy is-hidden sprawia, że kontener loadera ponownie jest widoczny.
  loaderEl.classList.remove('is-hidden');
};

// Funkcja ukrywa loader po zakończeniu zapytania — zarówno udanego,
// jak i zakończonego błędem.
export const hideLoader = () => {
  // Klasa is-hidden ma w CSS regułę display: none.
  loaderEl.classList.add('is-hidden');
};
