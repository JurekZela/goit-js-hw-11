// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './search_images-api';

let page = 0;
let perPage = 40;
const  lightbox = new SimpleLightbox('.gallery a', {captionsData: 'alt', captionDelay: 250,})

const ref = {
    form: document.getElementById('search-form'),
    input: document.querySelector('input'),
    gallery: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more'),
};

ref.form.addEventListener('submit', addImagesFetch);

 async function addImagesFetch(e) {
    e.preventDefault();
    clearArticlesContainer();

    try {
      page = 1;
        const inputValue = ref.input.value;
        const resultFetch = await fetchImages(inputValue, page);
        if (resultFetch.total <= 0) {
            onError()
            return;
        }
        
        const render = await renderCardImages(resultFetch);
        Notify.success(`Hooray! We found ${resultFetch.totalHits} images.`);
        ref.loadMore.style.display = 'block';

        ref.gallery.insertAdjacentHTML('beforeend', render);
        lightbox.refresh();
    } catch {onError()}
};

function clearArticlesContainer() {
  ref.gallery.innerHTML = '';
};

function onError() {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.", {
            position: 'center-center',
        });
        ref.loadMore.style.display = 'none';
};

async function renderCardImages({ hits }) {
    return hits.map(hit => {
      const  { webformatURL, largeImageURL, tags, likes, views, comments, downloads} = hit;

      return `<div class="photo-card">
      <a class="open-original-photo"  href="${largeImageURL}"><img src="${webformatURL}" class="gallery__image" alt="${tags}" loading="lazy"></a>
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
    }).join('');
};

ref.loadMore.addEventListener('click', pageRenderCard)


async function  pageRenderCard() {

  try {
    const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });

    page +=1;
    const inputValue = ref.input.value;
    const renderNextPage = await fetchImages(inputValue, page);
    const render = await renderCardImages(renderNextPage);
    reachedEndResult(renderNextPage)
     ref.gallery.insertAdjacentHTML('beforeend',  render);

     lightbox.refresh();
  } catch  {
    Notify.info("We're sorry, but you've reached the end of search results.", {position: 'center-bottom', timeout: 1000});
  }
};

function reachedEndResult(name) {
  let totalPages = Math.ceil(name.totalHits / perPage);
if (page >= totalPages) {
  Notify.info("We're sorry, but you've reached the end of search results.", {position: 'center-bottom', timeout: 3000});
  ref.loadMore.style.display = 'none';
  return
};
return
}