import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {
  friendsRequests:[],
  friendsRequestsIsLoading:true
}

export const FriendsRequestsReducer = createSlice({
  name: 'friendsRequests',
  initialState,
  reducers: {
    setFriendsRequests: (state, action) => {
      state.friendsRequestsIsLoading = false
      state.friendsRequests = action.payload;
    },
    clearFriendsRequests:(state) => {
      state.friendsRequestsIsLoading = true
      state.friendsRequests = []
    }
  }
})

export const {
  setFriendsRequests,
  clearFriendsRequests
} = FriendsRequestsReducer.actions

export default FriendsRequestsReducer.reducer
