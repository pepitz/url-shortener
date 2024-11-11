export function encodeUrl(url: string): string {
  try {
    return encodeURI(url);
  } catch (error) {
    console.error('Failed to encode URL:', error);
    return url;
  }
}
