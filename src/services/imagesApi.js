import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';
const apiKey = '16763452-f17d9c1e6c077c804b5291364';
export const perPage = 12;

export const fetchImagesWithQuery = (searchQuery, page = 1) => {
  return axios(
    `/?q=${searchQuery}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  ).then(response => {
    return response.data;
  });
};
