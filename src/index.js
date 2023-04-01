import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/'; 
const API_KEY = '?key=34921015-82cb8e104c87b6309f3f6f395';
const FILTER = `&image_type=photo&orientation=horizontal&safesearch=true`;

const searchFormEl = document.querySelector('#search-form');
searchFormEl.addEventListener('submit', onFormSubmit);

const galleryEl = document.querySelector('.gallery');

let enteredToSearch = '';

function onFormSubmit(event) {
    event.preventDefault();
    const {
        elements: { searchQuery },
    } = event.target;
    
    enteredToSearch = searchQuery.value;
    Notiflix.Notify.info(enteredToSearch);
    return enteredToSearch
}
// function fetchImage(enteredToSearch) {
//     return fetch(`${BASE_URL}${API_KEY}&q=${enteredToSearch}${FILTER}`).then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     });
// }
// fetchImage(enteredToSearch)
// .then(response => {
//   console.log('Знайдено співпадінь:', response.length);
//     renderImageCard(response);
// })
// .catch(error => {
//   if (error.message === '404') {
//     Notiflix.Notify.failure('Oops, there is no images', {position: 'center-center'});
//     console.warn(`За вашим запитом картинки не знайдено`);
//   } else {
//     console.log(`Виникла помилка при спробі запиту`);
//   }
// });

// function renderImageCard(images) {
//     const markupCard = images
//       .map(({ largeImageURL, tags, likes, views, comments, downloads}) => {
//         return `
//         <div class="photo-card">
//         <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
//         <div class="info">
//           <p class="info-item">
//             <b>${likes}</b>
//           </p>
//           <p class="info-item">
//             <b>${views}</b>
//           </p>
//           <p class="info-item">
//             <b>${comments}</b>
//           </p>
//           <p class="info-item">
//             <b>${downloads}</b>
//           </p>
//         </div>
//       </div>
//           `;
//       })
//       .join('');
//       galleryEl.innerHTML = markupCard;
//   }