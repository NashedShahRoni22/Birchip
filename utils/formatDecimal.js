export const formatDecimal = (number) => {
  if (typeof number !== "number" || isNaN(number)) {
    return "Invalid number";
  }

  return Number.isInteger(number) ? number : number.toFixed(2);
};
