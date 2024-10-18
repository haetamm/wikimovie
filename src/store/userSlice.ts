import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

interface UserState {
    session_id: string | null;
}

const session_id = Cookies.get('session_id');

const initialState: UserState = {
    session_id: session_id || null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSessionId(state, action: PayloadAction<UserState>) {
            state.session_id = action.payload.session_id;
        },
        deleteSessionId(state) {
            state.session_id = null
        }
    }
});

export const { setSessionId, deleteSessionId } = userSlice.actions;
export default userSlice.reducer;