export const formatDate = (isoDate: Date) => {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as const;

  return date.toLocaleDateString('en-US', options);
};
