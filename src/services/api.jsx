import axios from 'axios';

const API_KEY = '298589f984d848298640908e988a6c00';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = (category, page = 1) => {
  return axios.get(`${BASE_URL}/top-headlines?country=in`, {
    params: {
      apiKey: API_KEY,
      category,
      page,
    },
  });
};
