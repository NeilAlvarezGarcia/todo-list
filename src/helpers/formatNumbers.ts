function formatCurrency(amount = 0, currencySymbol = '$', decimalPlaces = 2) {
  const formattedAmount = amount.toFixed(decimalPlaces).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return `${currencySymbol} ${formattedAmount}`;
}

export { formatCurrency };
