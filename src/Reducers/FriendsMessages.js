import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {
  friendsMessages: [],
  friendsMessagesLoading: true,
}

export const FriendsMessages = createSlice({
  name: 'friendMessages',
  initialState,
  reducers: {
    setFriendsMessages: (state, action) => {
      state.friendsMessagesLoading = false
      state.friendsMessages = action.payload
    },
    clearFriendsMessages: (state) => {
      state.friendsMessages = []
      state.friendsMessagesLoading = true
    },
  }
})

export const {
  setFriendsMessages,
  clearFriendsMessages,
} = FriendsMessages.actions

export default FriendsMessages.reducer