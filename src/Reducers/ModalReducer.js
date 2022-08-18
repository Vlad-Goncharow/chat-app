import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {
  modalIsOpen: false,
  modalText: '',
}

export const ModalReducer = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modalIsOpen = true
      state.modalText = action.payload;
    },
    closeModal: (state) => {
      state.modalIsOpen = false
      state.modalText = '';
    },
  }
})

export const {
  openModal,
  closeModal,
} = ModalReducer.actions

export default ModalReducer.reducer