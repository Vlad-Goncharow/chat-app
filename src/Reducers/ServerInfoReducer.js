import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {
  serverInfo: {},
  serverInfoIsLoading: true,
}

export const ServerInfoReducer = createSlice({
  name: 'serverInfo',
  initialState,
  reducers: {
    setServerInfo: (state, action) => {
      state.serverInfoIsLoading = false
      state.serverInfo = action.payload;
    },
    clearServerInfo: (state) => {
      state.serverInfoIsLoading = true
      state.serverInfo = {};
    },

  }
})

export const {
  setServerInfo,
  clearServerInfo,
} = ServerInfoReducer.actions

export default ServerInfoReducer.reducer