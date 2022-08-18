import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  friendsIsLoading:true,
  friends:[]
}

export const FriendsReducer = createSlice({
  name:'friends',
  initialState,
  reducers:{
    setFriends:(state,action) => {
      state.friendsIsLoading = false
      state.friends = action.payload
    },
    clearFriends:(state)=>{
      state.friendsIsLoading = true
      state.friends = []
    }
  }
})

export const {setFriends,clearFriends} = FriendsReducer.actions

export default FriendsReducer.reducer