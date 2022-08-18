import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {
  serverUsers:[],
  serverUsersIsLoading: true,
}

export const ServerUsersReducer = createSlice({
  name: 'serverUsers',
  initialState,
  reducers: {
    setServerUsers: (state, action) => {
      state.serverUsersIsLoading = false
      state.serverUsers = action.payload;
    },
    clearServerUsers: (state) => {
      state.serverUsersIsLoading = true
      state.serverUsers = [];
    },

  }
})

export const {
  setServerUsers,
  clearServerUsers,
} = ServerUsersReducer.actions

export default ServerUsersReducer.reducer