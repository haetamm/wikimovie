import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utilities/api-default";
import axios from "axios";

interface FavoriteMovie {
  loading: boolean;
  error: string | null;
}
  
const initialState: FavoriteMovie = {
  loading: false,
  error: null,
};

export const favoriteMovieList = createAsyncThunk(
  'favoriteMovie/favoriteMovieList',
  async (session_id: string | null, { rejectWithValue }) => {
    try {
      const { data: response } = await axiosInstance.get(`/account/null/favorite/movies?language=en-US&page=1&session_id=${session_id}&sort_by=created_at.asc`);
      const { results: movies } = response;
      sessionStorage.setItem('favoriteMovie', JSON.stringify(movies))
      return movies;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);
  
const favoriteMovie = createSlice({
  name: 'favoriteMovie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(favoriteMovieList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(favoriteMovieList.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(favoriteMovieList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default favoriteMovie.reducer;