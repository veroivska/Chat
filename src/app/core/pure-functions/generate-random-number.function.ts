export function generateRandomNumber(max: number = 15, min: number = 10): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
