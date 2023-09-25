import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isOpen: false,
	typeOfForm: null,
	authorStrId: null
};

const modalWindowSlice = createSlice({
	name: 'modalWindow',
	initialState,
	reducers: {
		openWindow(state, { payload }) {
			const { typeOfForm, authorStrId } = payload;
			state.isOpen = true;
			state.typeOfForm = typeOfForm;
			state.authorStrId = authorStrId;
		},
		closeWindow(state) {
			state.isOpen = false;
			state.authorStrId = null;
			state.typeOfForm = null;
		}
	}
})

export const { openWindow, closeWindow } = modalWindowSlice.actions;

export default modalWindowSlice.reducer;