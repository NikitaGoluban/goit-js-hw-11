import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
} from './js/render-functions';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', handleImageSearch);

function handleImageSearch(e) {
  e.preventDefault();
  const inputValue = e.currentTarget.elements['search-text'].value.trim();

  if (inputValue === '') {
    iziToast.error({
      position: 'topRight',
      message: 'Please enter your request in the search field!',
      messageColor: 'black',
      messageSize: '16',
      backgroundColor: 'yellow',
      closeOnClick: true,
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(inputValue)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.warning({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#ffffff',
          messageSize: '16',
          backgroundColor: '#EF4040',
          progressBarColor: '#B51B1B',
          position: 'topRight',
          closeOnClick: true,
        });
        return;
      }
      createGallery(data.hits);
    })
    .catch(() => {
      iziToast.error({
        position: 'topRight',
        message: 'Sorry, something went wrong...Try later',
        messageColor: 'black',
        messageSize: '18',
        backgroundColor: 'yellow',
        closeOnClick: true,
      });
    })
    .finally(() => {
      hideLoader();
    });

  formEl.reset();
}
