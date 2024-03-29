import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TicketResponse } from '@services/api';
import type { RootState } from 'src/store';

export interface CartState {
  tickets: TicketResponse['data'][];
}

const initialState: CartState = {
  tickets: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (_state, action: PayloadAction<CartState>) => {
      return action.payload;
    },
    setTickets: (state, action: PayloadAction<TicketResponse['data'][]>) => {
      return {
        ...state,
        tickets: action.payload,
      }
    },
    addTicketToCart: (state, action: PayloadAction<TicketResponse['data']>) => {
      state.tickets.push(action.payload);
    },
    removeTicketFromCart: (state, action: PayloadAction<string>) => {
      state.tickets = state.tickets.filter(ticket => ticket._id !== action.payload);
    },
    clearCart: () => initialState,
  },
});

export const { setCart, setTickets, addTicketToCart, removeTicketFromCart, clearCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;