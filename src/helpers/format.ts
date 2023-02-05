const formatterPrice = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});
const formatterNumber = new Intl.NumberFormat();

export const format = {
  price: (value: number) => formatterPrice.format(value),
  number: (value: number) => formatterNumber.format(value),
};
