"use client";

import { calculateDiscount } from "@/utils/calculateDiscount";
import { loadFromLocalStorage } from "@/utils/loadFromLocalStorage";
import { saveToLocalStorage } from "@/utils/saveToLocalStorage";
import { createContext, useState, useEffect } from "react";

// Cart Context
export const CartContext = createContext();

// CartProvider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = loadFromLocalStorage();
    setCart(savedCart);
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (!isLoading) {
      saveToLocalStorage(cart);
    }
  }, [cart, isLoading]);

  // Add item to cart
  const addToCart = (food, quantity = 1) => {
    setCart((prevCart) => {
      // Check if item already exists
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === food.id,
      );

      // Calculate actual price with discount
      const actualPrice =
        food.discount > 0
          ? parseFloat(
              calculateDiscount(food.discount_type, food.price, food.discount),
            )
          : food.price;

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity,
        };
        return updatedCart;
      } else {
        // Add new item to cart
        const newItem = {
          ...food,
          actualPrice,
          quantity,
        };
        return [...prevCart, newItem];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (foodId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== foodId));
  };

  // Update item quantity
  const updateQuantity = (foodId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(foodId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === foodId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    }
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Get item quantity
  const getItemQuantity = (foodId) => {
    const item = cart.find((item) => item.id === foodId);
    return item ? item.quantity : 0;
  };

  // Get total items count
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price
  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => {
        return total + item.actualPrice * item.quantity;
      }, 0)
      .toFixed(2);
  };

  // Get cart items (already an array)
  const getCartItems = () => {
    return cart;
  };

  // Check if cart is empty
  const isEmpty = () => {
    return cart.length === 0;
  };

  // Check if item is in cart
  const isInCart = (foodId) => {
    return cart.some((item) => item.id === foodId);
  };

  // Get specific cart item
  const getCartItem = (foodId) => {
    return cart.find((item) => item.id === foodId);
  };

  const value = {
    // State
    cart,
    isLoading,

    // Functions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,

    // Getters
    getItemQuantity,
    getTotalItems,
    getTotalPrice,
    getCartItems,
    getCartItem,
    isEmpty,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
