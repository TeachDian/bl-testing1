// Helper function to convert a decimal to a fraction string (e.g., 0.5 -> 1/2)
export function convertToFraction(decimal: number): string {
  const gcd = (a: number, b: number): number => {
    return b ? gcd(b, a % b) : a;
  };

  const len = decimal.toString().length - 2;
  const denominator = Math.pow(10, len);
  const numerator = decimal * denominator;
  const divisor = gcd(numerator, denominator);

  return `${numerator / divisor}/${denominator / divisor}`;
}
