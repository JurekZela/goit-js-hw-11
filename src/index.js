import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './search_images-api';

const ref = {
    form: document.getElementById('search-form'),
    input: document.querySelector('input'),
    gallery: document.querySelector('.gallery'),
};

ref.form.addEventListener('submit', addImagesFetch);

 async function addImagesFetch(e) {
    e.preventDefault();
    ref.gallery.innerHTML = '';

    try {
        const inputValue = ref.input.value;
        const resultFetch = await fetchImages(inputValue);
        if (resultFetch.total <= 0) {
            onError()
            return;
        }
        const render = await renderCardImages(resultFetch);
        return ref.gallery.insertAdjacentHTML('beforeend', render);
    } catch {onError()}
};

function onError() {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.", {
            position: 'center-center',
        });
};

async function renderCardImages(name) {
    return name.hits
    .map(hit => {
        const  { webformatURL, largeImageURL, tags, likes, views, comments, downloads} = hit;

      return `<div class="photo-card">
      <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${downloads}</b>
        </p>
      </div>
    </div>`;
    })
    .join('');
};