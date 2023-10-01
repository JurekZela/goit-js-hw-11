import axios from "axios";
const api_key = axios.defaults.headers.common["x-api-key"] = "live_MXi5doRNd1frIwcTUSayHMbUzMu4g8g8BHMhu0kMWmQAFAOGRfjnD7G5rfdmtWET";

const PIX_API_KEY = "39684416-19726dcb7b6323782764f8c99";
const BASE_URL = 'https://pixabay.com/api/';

async function fetchImages(searchTerm, page) {
    const url = `${BASE_URL}?key=${PIX_API_KEY}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

    const resolve = await fetch(url);
    return await resolve.json();
};

export { fetchImages };