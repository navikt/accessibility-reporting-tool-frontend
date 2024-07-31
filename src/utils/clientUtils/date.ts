export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('nb-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
