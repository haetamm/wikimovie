import { configureStore } from "@reduxjs/toolkit";
import nowPlayingReducer from "./nowPlayingMovieSlice";
import popularMovieReducer from "./popularMovieSlice";
import modalReducer from '../store/modalSlice';

export const store = configureStore({
    reducer: {
        nowPlaying: nowPlayingReducer,
        popularMovieList: popularMovieReducer,
        modal: modalReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;