export const saveToLocalStorage = (cartItems) => {
  try {
    localStorage.setItem("foodCart", JSON.stringify(cartItems));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};
