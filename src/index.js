import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './search_images-api';

const ref = {
    form: document.getElementById('search-form'),
    input: document.querySelector('input'),
};

ref.form.addEventListener('submit', addImagesFetch);

 async function addImagesFetch(e) {
    e.preventDefault();

    try {
        const inputValue = ref.input.value;
        const resultFetch = await fetchImages(inputValue)
        
        if (resultFetch.total === 0) {
            onError()
            return;
        }
        console.log(resultFetch);
    } catch {onError()}
}

function onError() {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.", {
            position: 'center-center',
        });
};