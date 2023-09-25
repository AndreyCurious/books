import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal.js"

export default configureStore({
	reducer: {
		modalData: modalReducer
	}
})