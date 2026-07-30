export const getSubCategoryLabel = (count: number) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14)
    return `${count} підкатегорій`;
  if (lastDigit === 1) return `${count} підкатегорія`;
  if (lastDigit >= 2 && lastDigit <= 4) return `${count} підкатегорії`;
  return `${count} підкатегорій`;
};