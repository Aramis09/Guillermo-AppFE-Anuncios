export const isCategorySelected = (list: string[], category: string) => {
  if (!list.includes(category)) return false;
  return true;
};
