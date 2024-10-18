import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utilities/api-default";
import Cookies from 'js-cookie';
import { toast } from "sonner";
import axios from "axios";

interface LoginState {
    loading: boolean;
    error: string | null;
}

const initialState: LoginState = {
    loading: false,
    error: null
}

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (formData: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const {data: requstToken } = await axiosInstance.get('/authentication/token/new');
      const { request_token } = requstToken;

      const formDataUpdate = {
          ...formData,
          request_token: request_token
      }
      const {data: response} = await axiosInstance.post('/authentication/token/validate_with_login', formDataUpdate);
      const { request_token: token } = response;
      
      const tokenData = {
          request_token : token
      }
      const { data: responseSession } = await axiosInstance.post('/authentication/session/new', tokenData);
      const { session_id } = responseSession;

      Cookies.set('session_id', session_id, { expires: 10080 });
      toast.success(`Selamat datang ${formData.username}`);
      
      return session_id;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);
  
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
  
export default loginSlice.reducer;