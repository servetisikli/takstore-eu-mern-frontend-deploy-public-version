import React, { createContext, useReducer, useEffect } from "react";

const CART_STORAGE_KEY = "shopping_cart";

// 🚀 **Action Types**
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const CLEAR_CART = "CLEAR_CART";

// 🛒 **Başlangıç Durumu**
const getInitialState = () => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : { items: [], total: 0 };
  } catch (error) {
    return { items: [], total: 0 };
  }
};

// ⚡ **Reducer Fonksiyonu**
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // Ürün zaten sepetteyse miktarı artır
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: state.total + action.payload.price * action.payload.quantity,
        };
      }

      // Ürün sepette yoksa ekle
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price * action.payload.quantity,
      };

    case REMOVE_ITEM:
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!itemToRemove) return state; // Eğer ürün zaten yoksa değişiklik yapma

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
        total: state.total - itemToRemove.price * itemToRemove.quantity,
      };

    case UPDATE_QUANTITY:
      const updatedCartItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      const newTotal = updatedCartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        ...state,
        items: updatedCartItems,
        total: newTotal,
      };

    case CLEAR_CART:
      return { items: [], total: 0 };

    default:
      return state;
  }
};

// 🎯 **Context Oluşturma**
const CartContext = createContext();

// 🎯 **Provider Bileşeni**
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, getInitialState());

  // 🛠️ **Local Storage Güncellemesi**
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // **🛒 Sepet Fonksiyonları**
  const addItem = (item) => dispatch({ type: ADD_ITEM, payload: item });
  const removeItem = (id) => dispatch({ type: REMOVE_ITEM, payload: { id } });
  const updateQuantity = (id, quantity) =>
    dispatch({ type: UPDATE_QUANTITY, payload: { id, quantity } });
  const clearCart = () => dispatch({ type: CLEAR_CART });

  // 🔥 **Ekstra Fonksiyonlar**
  const getCartTotal = () => state.total;
  const getItemCount = () =>
    state.items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
