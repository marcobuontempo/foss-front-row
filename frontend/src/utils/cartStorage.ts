import { addTicketToCart, removeTicketFromCart, updateEntireCart } from '@features/cart/cartSlice';
import { TicketResponse } from '@services/api';
import store from '../store';


export const initialiseCartDataFromStorage = (): void => {
  // Fetch data from localStorage on page load
  const storedCartData = localStorage.getItem('cart');

  // If valid data exists, update redux store
  if (storedCartData) {
    const cartData = JSON.parse(storedCartData);
    store.dispatch(updateEntireCart(cartData));
  }
}

// specified arguments are for future-proofing. e.g. can add different 'keys', 'types', etc. if required
export const addOrRemoveItemToCart = (key: 'tickets', action: 'add' | 'remove', item: TicketResponse['data']): void => {
  // Save item to redux
  switch (key) {
    case 'tickets':
      action === 'add' && store.dispatch(addTicketToCart(item));
      action === 'remove' && store.dispatch(removeTicketFromCart(item._id));
      break;
  }

  // Save item to localStorage  
  const cart = store.getState().cart;
  localStorage.setItem('cart', JSON.stringify(cart));
};