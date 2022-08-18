import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {
  friendMessages:[]
}

export const FriendChatReducer = createSlice({
  name: 'friendChat',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.friendMessages = action.payload;
    },
  }
})

export const {
  setMessages,
} = FriendChatReducer.actions

export default FriendChatReducer.reducer