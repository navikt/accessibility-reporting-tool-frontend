export const formatDate = (date: string) => {
  const [datePart, timePart] = date.split(' ');

  const [year, month, day] = datePart.split('.');
  const [hour, minute, second] = timePart.split(':');

  return new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hour),
    parseInt(minute),
    parseInt(second),
  ).toLocaleDateString('nb-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
