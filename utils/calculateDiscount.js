export const calculateDiscount = (discountType, price, discount) => {
  let result;

  if (discountType === "static") {
    result = price - discount;
  } else {
    const discountAmount = (price * discount) / 100;
    result = price - discountAmount;
  }

  return Number.isInteger(result) ? result : result.toFixed(2);
};
