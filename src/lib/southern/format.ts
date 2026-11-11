export type Currency = "INR" | "USD" | "EUR" | "GBP";

export const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number; precision: number }> = {
  INR: { symbol: "₹", rate: 1, precision: 0 },
  USD: { symbol: "$", rate: 0.012, precision: 2 },
  EUR: { symbol: "€", rate: 0.011, precision: 2 },
  GBP: { symbol: "£", rate: 0.0095, precision: 2 },
};

export const CURRENCIES = Object.keys(CURRENCY_RATES) as Currency[];

export function isCurrency(value: unknown): value is Currency {
  return typeof value === "string" && value in CURRENCY_RATES;
}

export function formatPrice(amountInINR: number, currency: Currency = "INR"): string {
  const cfg = CURRENCY_RATES[currency] ?? CURRENCY_RATES.INR;
  const converted = amountInINR * cfg.rate;
  if (cfg.precision === 0) {
    return `${cfg.symbol}${Math.round(converted).toLocaleString("en-IN")}`;
  }
  return `${cfg.symbol}${converted.toFixed(cfg.precision)}`;
}

export function formatRating(rating: number, count: number): string {
  return `${rating.toFixed(1)} · ${count} reviews`;
}

/** Free pan-India delivery threshold, in INR. */
export const FREE_SHIPPING_THRESHOLD = 3000;
