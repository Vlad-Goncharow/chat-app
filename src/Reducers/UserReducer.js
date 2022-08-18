import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userIsLoading:true,
  user:null,
}

export const UserReducer = createSlice({
  name:'user',
  initialState,
  reducers:{
    setUser:(state,action) => {
      state.userIsLoading = false;
      state.user = action.payload
    },
    clearUser:(state) => {
      state.userIsLoading = true
      state.user = null
      state.userFId = null
    },
  }
})

export const {setUser,setError,clearUser} = UserReducer.actions

export default UserReducer.reducer