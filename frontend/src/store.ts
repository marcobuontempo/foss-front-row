import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import userDetailsReducer from './features/user/userDetailsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    userDetails: userDetailsReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;