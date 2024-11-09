export function generateRandomShortUrl(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  let letterCount = 0;
  let numberCount = 0;

  while (result.length < 5) {
    const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));

    // Ensure we have a combination of at least three letters and two numbers
    if (/[a-zA-Z]/.test(randomChar) && letterCount < 3) {
      result += randomChar;
      letterCount++;
    } else if (/[0-9]/.test(randomChar) && numberCount < 2) {
      result += randomChar;
      numberCount++;
    } else if (result.length < 5 && letterCount + numberCount >= 3) {
      // Allow any character once base conditions are met
      result += randomChar;
    }
  }

  return result;
}
