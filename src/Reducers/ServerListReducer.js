import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serverList:[],
  serverListIsLoading:true,
}

export const ServerListReducer = createSlice({
  name: 'serverList',
  initialState,
  reducers:{
    setServersList:(state,action) => {
      state.serverListIsLoading = false
      state.serverList = action.payload
    },
    clearServersList:(state) => {
      state.serverList = []
      state.serverListIsLoading = true
    },
  }
})

export const {
  setServersList,
  clearServersList,
} = ServerListReducer.actions

export default ServerListReducer.reducer