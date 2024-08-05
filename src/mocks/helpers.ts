// Function to generate a random string of given length
export function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let j = 0; j < length; j++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
/* eslint-disable @typescript-eslint/indent */

export function getRandomDate(): string {
  return new Date().toJSON(); // Date.now();
}

export function getRandomInt(max: number, min = 0): number {
  return Math.floor(Math.random() * max) + min;
}

/* eslint-disable @typescript-eslint/naming-convention, camelcase */
