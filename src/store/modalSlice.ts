import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
    id: number | null,
    type: string,
    isOpen: boolean,
    size: string
}

const initialState: ModalState = {
    id: null,
    type: "",
    isOpen: false,
    size: ""
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state, action: PayloadAction<ModalState>) {
            state.id = action.payload.id;
            state.type = action.payload.type;
            state.isOpen = true,
            state.size = action.payload.size;
        },
        closeModal(state) {
            state.isOpen = false,
            state.type = "",
            state.id = null,
            state.size = ""
        }
    }
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;