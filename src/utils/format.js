export const formatNumber = (input) => {
  const number = Number(input);

  if (isNaN(number)) {
    return "";
  }

  return number.toLocaleString();
};
