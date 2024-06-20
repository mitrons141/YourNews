import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '298589f984d848298640908e988a6c00';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchArticles = createAsyncThunk(
  'news/fetchArticles',
  async ({ category, page }) => {
    const response = await axios.get(`${BASE_URL}/top-headlines?country=in`, {
      params: {
        apiKey: API_KEY,
        category,
        page,
      },
    });
    return response.data;
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
