import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserDetailsResponse } from '@services/api';
import type { RootState } from 'src/store'

const initialState: UserDetailsResponse['data'] = {
  _id: "",
  firstname: "",
  lastname: "",
  dob: "",
  email: "",
  phone: "",
  address: "",
}

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserDetailsResponse['data']>) => {
      return { ...state, ...action.payload };
    },
    clearUserDetails: () => initialState,
  },
});

export const { setUserDetails, clearUserDetails } = userDetailsSlice.actions;

export const selectUserDetails = (state: RootState) => state.userDetails;

export default userDetailsSlice.reducer;