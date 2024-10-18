import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utilities/api-default";
import axios from "axios";

interface PlayingMovieState {
  loading: boolean;
  error: string | null;
}
  
const initialState: PlayingMovieState = {
  loading: false,
  error: null,
};

export const nowPlayingMovie = createAsyncThunk(
  'nowPlaying/nowPlayingMovie',
  async (_, { rejectWithValue }) => {
    try {
      const {data : response } = await axiosInstance.get('/movie/now_playing?language=en-US&page=1');
      const { results: movie } = response;
      const result = movie.slice(0, 6);
      sessionStorage.setItem('nowPlaying', JSON.stringify(result));
      return movie.slice(0, 6);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);
  
const nowPlaying = createSlice({
  name: 'nowPlaying',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(nowPlayingMovie.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(nowPlayingMovie.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(nowPlayingMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default nowPlaying.reducer;