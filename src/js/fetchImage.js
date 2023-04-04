const API_KEY = '?key=34921015-82cb8e104c87b6309f3f6f395';
const BASE_URL = 'https://pixabay.com/api/';
const FILTER = '&image_type=photo&orientation=horizontal&safesearch=true';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 3;
  }

  fetchImages() {
    const url = `${BASE_URL}${API_KEY}&q=${this.searchQuery}${FILTER}&per_page=${this.per_page}&page=${this.page}`;
    return fetch(url)
    .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
    .then(data => {
      this.incrementPage();
      return data
    })
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
