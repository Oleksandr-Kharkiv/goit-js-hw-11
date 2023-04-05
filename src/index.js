import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import NewsApiService from './js/fetchImage';
import renderImageCard from './js/renderImageCard';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const submitBtnEl = document.querySelector('button[type="submit"]');
const searchFormEl = document.querySelector('#search-form');
searchFormEl.addEventListener('submit', onFormSubmit);

const inputEl = document.querySelector('input[name="searchQuery"]');
inputEl.addEventListener('input', debounce(disabledSabmitBtn, 300));

const loadMoreBtnEl = document.querySelector('.load-more');
loadMoreBtnEl.addEventListener('click', onLoadMorePhoto);
loadMoreBtnEl.classList.add('is-hidden');

const newsApiService = new NewsApiService();

function disabledSabmitBtn() {
  if (inputEl.value === newsApiService.query) {
    submitBtnEl.disabled = true;
  } else {
    submitBtnEl.disabled = false;
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  submitBtnEl.disabled = true;
  newsApiService.query = event.currentTarget.elements.searchQuery.value.trim();
  if (newsApiService.query === '') {
    loadMoreBtnEl.classList.add('is-hidden');
    galleryEl.innerHTML = '';
    Notiflix.Notify.info(
      'Enter your search data. 🤦‍♂️🤔🤪 CHANGE THE SEARCH PARAMETERS!!!🤪🤔🤦‍♂️',
      {
        position: 'center-center',
        clickToClose: true,
      }
    );
    return;
  }
  newsApiService.resetPage();
  newsApiService
    .fetchImages()
    .then(data => {
      onLoadMoreBtn(data);
      if (data.hits.length === 0) {
        galleryEl.innerHTML = '';
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query. Please try again. 🤦‍♂️🤔🤪 CHANGE THE SEARCH PARAMETERS!!!🤪🤔🤦‍♂️`,
          { position: 'center-center', messageMaxLength: 125, clickToClose: true }
        );
        return;
      }
      clearGalleryContainer();
      appendImageCard(data.hits);
      if (data.hits.length < newsApiService.per_page) {
        Notiflix.Notify.info(
          `We're sorry, but you've reached the end of search results.`,
          {
            clickToClose: true,
          }
        );
      }
    })
    .catch(error => {
      Notiflix.Notify.warning(
        `Something went wrong during the request. Check your internet connection`,
        { position: 'center-center', clickToClose: true }
      );
    });
  lightbox.refresh();
}

function onLoadMorePhoto() {
  newsApiService
    .fetchImages()
    .then(data => {
      onLoadMoreBtn(data);
      appendImageCard(data.hits);
      if (data.hits.length < newsApiService.per_page) {
        Notiflix.Notify.info(
          `We're sorry, but you've reached the end of search results.`,
          {
            clickToClose: true,
          }
        );
      }
    })
    .catch(error => {
      Notiflix.Notify.warning(
        `Something went wrong during the request. Check your internet connection`,
        { position: 'center-center', clickToClose: true }
      );
    });
  lightbox.refresh();
}

function appendImageCard(images) {
  galleryEl.insertAdjacentHTML('beforeend', renderImageCard(images));
  let lightbox = new SimpleLightbox('.gallery-photo', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
}

function clearGalleryContainer() {
  galleryEl.innerHTML = '';
}

function onLoadMoreBtn(data) {
  if (data.hits.length >= newsApiService.per_page) {
    loadMoreBtnEl.classList.remove('is-hidden');
  } else if (data.hits.length === 0) {
    loadMoreBtnEl.classList.add('is-hidden');
  } else if (data.hits.length < newsApiService.per_page) {
    loadMoreBtnEl.classList.add('is-hidden');
    submitBtnEl.disabled = false;
  }
}
