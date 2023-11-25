import { formatCurrencyRegex } from './const';

function formatCurrency(amount = 0, currencySymbol = '$', decimalPlaces = 2) {
  const formattedAmount = amount.toFixed(decimalPlaces).replace(formatCurrencyRegex, '$&,');
  return `${currencySymbol} ${formattedAmount}`;
}

export { formatCurrency };
