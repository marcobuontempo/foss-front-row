import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'src/store'

export interface AuthState {
  isAuthorised: boolean;
  role: 'user' | 'admin' | null;
  userid: string | null;
}

const initialState: AuthState = {
  isAuthorised: false,
  role: null,
  userid: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorised: (state, action) => {
      state.isAuthorised = true;
      state.role = action.payload.role;
      state.userid = action.payload.userid;
    },
    setUnauthorised: (state) => {
      return initialState;
    },
  }
})

export const { setAuthorised, setUnauthorised } = authSlice.actions

export const selectIsAuthorised = (state: RootState) => state.auth.isAuthorised;
export const selectRole = (state: RootState) => state.auth.role;
export const selectUserId = (state: RootState) => state.auth.userid;

export default authSlice.reducer