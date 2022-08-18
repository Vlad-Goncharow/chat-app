import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {
  profile: {},
}

export const ProfileUserReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload
    },
  }
})

export const {
  setProfile,
} = ProfileUserReducer.actions

export default ProfileUserReducer.reducer