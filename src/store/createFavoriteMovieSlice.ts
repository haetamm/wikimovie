import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utilities/api-default";
import axios from "axios";
import { toast } from "sonner";

interface CreateFavoriteMovie {
  loading: boolean;
  error: string | null;
}
  
const initialState: CreateFavoriteMovie = {
  loading: false,
  error: null,
};

export const createFavoriteMovie = createAsyncThunk(
  'createFavorite/createFavoriteMovie',
  async ({ session_id, id }: { session_id: string | null, id:  number | null }, { rejectWithValue }) => {
    try {
      const data = {
        media_type: "movie",
        media_id: id,
        favorite: true
      }
      const {data: response} = await axiosInstance.post(`/account/null/favorite?session_id=${session_id}`, data);
      const {status_message} = response;
      toast.success(status_message);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);
  
const createFavorite = createSlice({
  name: 'createFavorite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createFavoriteMovie.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createFavoriteMovie.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createFavoriteMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default createFavorite.reducer;