import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {
  serverMessages: [],
  serverMessagesIsLoading: true,
}

export const ServerMessagesReducer = createSlice({
  name: 'serverMessages',
  initialState,
  reducers: {
    setServerMessages: (state, action) => {
      state.serverMessagesIsLoading = false
      state.serverMessages = action.payload;
    },
    clearServerMessages: (state) => {
      state.serverMessagesIsLoading = true
      state.serverMessages = [];
    }
  }
})

export const {
  setServerMessages,
  clearServerMessages,
} = ServerMessagesReducer.actions

export default ServerMessagesReducer.reducer