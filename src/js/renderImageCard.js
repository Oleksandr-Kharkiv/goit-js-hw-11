export default function renderImageCard(images) {
    return images.map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          console.log(images);
          return `
          <a  href="${largeImageURL}" class="gallery-photo">
          <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b><br>
              ${likes}
            </p>
            <p class="info-item">
              <b>Views</b><br>
              ${views}
            </p>
            <p class="info-item">
              <b>Comments</b><br>
              ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b><br>
              ${downloads}
            </p>
          </div>
        </div>
          </a>
            `;
        }
      )
      .join('');
  }