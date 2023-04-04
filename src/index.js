import Notiflix from 'notiflix';
import NewsApiService from './js/fetchImage';
import renderImageCard from './js/renderImageCard';

const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');
const submitBtnEl = document.querySelector('button[type="submit"]');
loadMoreBtnEl.classList.add('is-hidden');

const newsApiService = new NewsApiService();

searchFormEl.addEventListener('submit', onFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMore);

function onFormSubmit(event) {
  event.preventDefault();
  newsApiService.query = event.currentTarget.elements.searchQuery.value.trim();
  if (newsApiService.query === '') {
    hideLoadMoreBtn(data);
    galleryEl.innerHTML = '';
    Notiflix.Notify.info('Enter your search data', {
      position: 'center-center',
      clickToClose: true,
    });
    return;
  }
  newsApiService.resetPage();
  newsApiService
    .fetchImages()
    .then(data => {
      if (data.hits.length === 0) {
        galleryEl.innerHTML = '';
        hideLoadMoreBtn(data);
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query. Please try again. 🤦‍♂️🤔🤪`,
          { position: 'center-center', clickToClose: true }
        );
        return;
      }
      clearGalleryContainer();
      appendImageCard(data.hits);
      loadMoreBtnEl.classList.remove('is-hidden');
    })
    .catch(error => {
      Notiflix.Notify.warning(
        `Something went wrong during the request. Check your internet connection`,
        { position: 'center-center', clickToClose: true }
      );
    });
}

function onLoadMore() {
  newsApiService.fetchImages().then(data => {
    hideLoadMoreBtn(data);
    appendImageCard(data.hits);
  }).catch(error => {
    Notiflix.Notify.warning(
      `Something went wrong during the request. Check your internet connection`,
      { position: 'center-center', clickToClose: true }
    );
  });
}

function appendImageCard(images) {
  galleryEl.insertAdjacentHTML('beforeend', renderImageCard(images));
}

function clearGalleryContainer() {
  galleryEl.innerHTML = '';
}

// function disabledsubmitBtn (){
//   console.log(submitBtnEl);
//   submitBtnEl.disabled = true;
// }

function hideLoadMoreBtn(data) {
  if (data.hits.length < newsApiService.per_page) {
    loadMoreBtnEl.classList.add('is-hidden');
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results.`,
      {
        clickToClose: true,
      }
    );
  }
}

// console.log(data.hits.length < newsApiService.per_page);
// console.log(newsApiService.per_page);
// console.log(data.hits.length);
// console.log(`data.totalHits:`, data.totalHits);
// console.log(`per_page:`, newsApiService.per_page);
// console.log(`Поточна сторінка:`, newsApiService.page);
// console.log(`Відповідь на запит (data):`, data);
// console.log(`Результатів пошуку на сторінці:`, newsApiService.per_page);
// console.log(`Екземпляр класу:`, newsApiService);
