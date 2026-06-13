import React, { createContext, useReducer, useCallback } from 'react';

export const AppContext = createContext();

const initialState = {
  streamList: [],
  cart: [],
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_STREAM':
      return {
        ...state,
        streamList: [...state.streamList, action.payload],
      };
    case 'REMOVE_STREAM':
      return {
        ...state,
        streamList: state.streamList.filter(item => item.id !== action.payload),
      };
    case 'CLEAR_STREAMS':
      return {
        ...state,
        streamList: [],
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = useCallback(() => ({
    state,
    dispatch,
  }), [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};