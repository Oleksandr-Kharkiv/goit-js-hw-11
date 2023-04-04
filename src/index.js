import Notiflix from 'notiflix';
import NewsApiService from './js/fetchImage';
import renderImageCard from './js/renderImageCard';

const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');
const submitBtnEl = document.querySelector('button[type="submit"]');
loadMoreBtnEl.classList.add('[is-hidden]');

// console.log(submitBtnEl);
// submitBtnEl.disabled = true;

const newsApiService = new NewsApiService();

searchFormEl.addEventListener('submit', onFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMore);

function onFormSubmit(event) {
  event.preventDefault();
  newsApiService.query = event.currentTarget.elements.searchQuery.value.trim();
  if (newsApiService.query === '') {
    loadMoreBtnEl.classList.add('is-hidden');
    galleryEl.innerHTML = '';
    Notiflix.Notify.warning('Enter your search data', {
      position: 'center-center',
      clickToClose: true,
    });
    return;
  }
  newsApiService.resetPage();
  newsApiService.fetchImages().then(data => {
    if (data.hits.length === 0) {
      galleryEl.innerHTML = '';
      Notiflix.Notify.failure(
        `Sorry, there are no images matching your search query. Please try again. 🤦‍♂️🤔🤪`,
        { position: 'center-center', clickToClose: true }
      );
      return;
    }
    clearGalleryContainer();
    appendImageCard(data.hits);
    loadMoreBtnEl.classList.remove('is-hidden');
    console.log(data);
  });
}

function onLoadMore() {
  newsApiService.fetchImages().then(data => {
    console.log(data);
    appendImageCard(data.hits);
  });
}

function appendImageCard(images) {
  galleryEl.insertAdjacentHTML('beforeend', renderImageCard(images));
}

function clearGalleryContainer() {
  galleryEl.innerHTML = '';
}
