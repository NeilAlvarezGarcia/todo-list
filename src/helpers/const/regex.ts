const formatCurrencyRegex = /\d(?=(\d{3})+\.)/g;

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const passwordRegex = /^.{8,20}$/;

export { formatCurrencyRegex, emailRegex, passwordRegex };
