import { createSlice } from '@reduxjs/toolkit'
import { UserDetailsResponse } from '@services/api';
import type { RootState } from 'src/store'

const initialUserDetailsState: UserDetailsResponse['data'] = {
  _id: "",
  firstname: "",
  lastname: "",
  dob: "",
  email: "",
  phone: "",
  address: "",
}

// Create slices for each section
const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: initialUserDetailsState,
  reducers: {
    setUserDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUserDetails: () => {
      return initialUserDetailsState;
    },
  },
});

export const { setUserDetails, clearUserDetails } = userDetailsSlice.actions;

export const selectUserDetails = (state: RootState) => state.userDetails;

export default userDetailsSlice.reducer;