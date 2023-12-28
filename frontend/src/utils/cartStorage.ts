import { addTicketToCart, removeTicketFromCart, setCart, clearCart, setTickets, CartState } from '@features/cart/cartSlice';
import { TicketResponse } from '@services/api';
import store from '../store';

// updates the local storage to match redux state
const updateCartLocalStorage = () => {
  // Save item to localStorage  
  const cart = store.getState().cart;
  localStorage.setItem('cart', JSON.stringify(cart));
}

// loads cart data from localStorage into redux
export const initialiseCartDataFromStorage = (): void => {
  // Fetch data from localStorage on page load
  const storedCartData = localStorage.getItem('cart');

  // If valid data exists, update redux store
  if (storedCartData) {
    const cartData = JSON.parse(storedCartData);
    store.dispatch(setCart(cartData));
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
    default:
      break;
  }

  updateCartLocalStorage();
};


// deletes entire cart contents
export const clearAllFromCart = (): void => {
  store.dispatch(clearCart());

  updateCartLocalStorage();
}


// update the entire contents of a field in the cart (using key), or the cart itself (using key=all)
export const updateAllItemsInCart = (key: 'all' | 'tickets', items: CartState | TicketResponse['data'][]) => {
  // Save item to redux
  switch (key) {
    case 'all':
      store.dispatch(setCart(items as CartState));
      break;
    case 'tickets':
      store.dispatch(setTickets(items as TicketResponse['data'][]));
      break;
    default:
      break;
  }

  updateCartLocalStorage();
}
