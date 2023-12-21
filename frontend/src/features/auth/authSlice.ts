import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'src/store'

export interface AuthState {
  isAuthenticated: boolean;
  role: 'user' | 'admin' | null;
  userid: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  role: null,
  userid: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.userid = action.payload.userid;
    },
    setUnauthenticated: () => initialState,
  }
})

export const { setAuthenticated, setUnauthenticated } = authSlice.actions

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectRole = (state: RootState) => state.auth.role;
export const selectUserId = (state: RootState) => state.auth.userid;

export default authSlice.reducer