import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'src/store'

export interface AuthState {
  isAuthorised: boolean
}

const initialState: AuthState = {
  isAuthorised: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorised: (state) => {
      state.isAuthorised = true;
    },
    setUnauthorised: (state) => {
      state.isAuthorised = false;
    },
  }
})

export const { setAuthorised, setUnauthorised } = authSlice.actions

export const selectIsAuthorised = (state: RootState) => state.auth.isAuthorised

export default authSlice.reducer