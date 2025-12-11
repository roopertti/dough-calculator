export function formatWeight(grams: number): string {
  // Round to 1 decimal place for display
  return grams.toFixed(1);
}

export function formatPercentage(percentage: number): string {
  return `${percentage}%`;
}

export function formatTemperature(fahrenheit: number): string {
  return `${fahrenheit}°F`;
}

export function calculateBakerPercentage(ingredientWeight: number, flourWeight: number): string {
  const percentage = (ingredientWeight / flourWeight) * 100;
  return formatPercentage(Math.round(percentage * 10) / 10);
}
