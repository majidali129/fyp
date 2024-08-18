export const formateNumber = (input: number) => {
  return new Intl.NumberFormat().format(input);
};

export const formateNumberInK = (input: number) => {
  return Math.abs(input) > 999
    ? Math.sign(input) * +(Math.abs(input) / 1000).toFixed(1) + "k"
    : Math.sign(input) * Math.abs(input);
};
