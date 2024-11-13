export function getUserFriendlyErrorMessage(error: { status: number; message: string }): string {
  if (error.status === 400) {
    // For any Bad Request error, assume it's related to a duplicate entry
    return 'The short URL already exists. Please use a unique name.';
  } else if (error.status === 404) {
    return 'The requested resource could not be found. Please check the URL.';
  } else if (error.status === 500) {
    return 'An unexpected error occurred on the server. Please try again later.';
  }
  return 'An error occurred while processing your request. Please try again.';
}
