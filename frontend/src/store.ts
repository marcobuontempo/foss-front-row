import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import userDetailsReducer from './features/user/userDetailsSlice'
import cartReducer from './features/cart/cartSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    userDetails: userDetailsReducer,
    cart: cartReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;