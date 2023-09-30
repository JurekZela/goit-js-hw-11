const ref = {
    form: document.getElementById('search-form'),
};

import { fetchImages } from './search_images-api';

fetchImages()
.then(Images => {
    console.log(Images);
})
.catch(err => {
    console.log(err);
})