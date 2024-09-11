export function formatNumber(n: number, decimalPlace: number) {
    return n.toLocaleString("en-US", {
      minimumFractionDigits: decimalPlace,
      maximumFractionDigits: decimalPlace,
    });
  }
  