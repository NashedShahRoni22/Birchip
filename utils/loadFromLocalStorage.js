export const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem("foodCart");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return [];
  }
};
