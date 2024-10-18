import { configureStore } from "@reduxjs/toolkit";
import nowPlayingReducer from "./nowPlayingMovieSlice";
import popularMovieReducer from "./popularMovieSlice";
import modalReducer from '../store/modalSlice';
import loginReducer from '../store/loginSlice';
import userReducer from '../store/userSlice';

export const store = configureStore({
    reducer: {
        nowPlaying: nowPlayingReducer,
        popularMovieList: popularMovieReducer,
        modal: modalReducer,
        login: loginReducer,
        user: userReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;