import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {
  messages:[],
  messagesIdLoading:true,
}

export const Messages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messagesIdLoading = false
      state.messages = action.payload;
    },
    clearMessages:(state) => {
      state.messagesIdLoading = true
      state.messages = [];
    },
    
  }
})

export const {
  setMessages,
  clearMessages,
} = Messages.actions

export default Messages.reducer