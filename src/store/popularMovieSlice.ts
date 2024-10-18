import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utilities/api-default";
import axios from "axios";

interface PopularMovieState {
  loading: boolean;
  error: string | null;
}
  
const initialState: PopularMovieState = {
  loading: false,
  error: null,
};

export const popularMovieList = createAsyncThunk(
  'popularMovie/popularMovieList',
  async (_, { rejectWithValue }) => {
    try {
      const {data : response1 } = await axiosInstance.get('/movie/popular?language=en-US&page=1');
      const {data : response2 } = await axiosInstance.get('/movie/popular?language=en-US&page=2');
      const { results: movies1 } = response1;
      const { results: movies2 } = response2;
      const resMovie2 = movies2.slice(0, 10);

      const allMovies = [...movies1, ...resMovie2];

      sessionStorage.setItem('popularMovieList', JSON.stringify(allMovies));
      return allMovies.slice(0, 6);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);
  
const popularMovie = createSlice({
  name: 'popularMovie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(popularMovieList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(popularMovieList.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(popularMovieList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
  
export default popularMovie.reducer;