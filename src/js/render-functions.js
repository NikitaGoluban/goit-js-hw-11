import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryListEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader-wrapper');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const createGallery = images => {
  const galleryItemsMarkup = images
    .map(
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
    .join('');

  galleryListEl.insertAdjacentHTML('beforeend', galleryItemsMarkup);
  lightbox.refresh();
};

export const clearGallery = () => {
  galleryListEl.innerHTML = '';
};

export const showLoader = () => {
  loaderEl.classList.remove('is-hidden');
};

export const hideLoader = () => {
  loaderEl.classList.add('is-hidden');
};
