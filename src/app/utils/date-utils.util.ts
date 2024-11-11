// Utility function to calculate relative time string
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  if (diffInHours < 1) {
    return 'less than an hour ago';
  } else if (diffInHours === 1) {
    return 'about an hour ago';
  } else if (diffInHours <= 24) {
    return `about ${diffInHours} hours ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `about ${diffInDays} days ago...`;
  }
}
