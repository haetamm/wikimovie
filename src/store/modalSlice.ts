import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
    id: number | null
    type: string,
    isOpen: boolean,
}

const initialState: ModalState = {
    id: null,
    type: "",
    isOpen: false
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state, action: PayloadAction<ModalState>) {
            state.id = action.payload.id;
            state.type = action.payload.type;
            state.isOpen = true
        },
        closeModal(state) {
            state.isOpen = false,
            state.type = ""
        }
    }
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;