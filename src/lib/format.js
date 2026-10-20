export const CURRENCY_RATES = {
  INR: { symbol: '₹', rate: 1, precision: 0 },
  USD: { symbol: '$', rate: 0.012, precision: 2 },
  EUR: { symbol: '€', rate: 0.011, precision: 2 },
  GBP: { symbol: '£', rate: 0.0095, precision: 2 }
};

export function formatPrice(amountInINR, currency = 'INR') {
  const cfg = CURRENCY_RATES[currency] || CURRENCY_RATES.INR;
  const converted = amountInINR * cfg.rate;
  if (cfg.precision === 0) {
    return `${cfg.symbol}${Math.round(converted).toLocaleString('en-IN')}`;
  }
  return `${cfg.symbol}${converted.toFixed(cfg.precision)}`;
}

export function formatRating(rating, count) {
  return `${rating.toFixed(1)} · ${count} reviews`;
}
