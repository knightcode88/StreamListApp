import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const useCart = () => {
  const { state, dispatch } = useContext(AppContext);

  const addToCart = (item) => {
    const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      dispatch({
        type: 'UPDATE_CART_QUANTITY',
        payload: { id: item.id, quantity: existingItem.quantity + 1 },
      });
    } else {
      dispatch({
        type: 'ADD_TO_CART',
        payload: { ...item, quantity: 1 },
      });
    }
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      dispatch({
        type: 'UPDATE_CART_QUANTITY',
        payload: { id, quantity },
      });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const cartTotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return {
    cart: state.cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount: state.cart.length,
  };
};