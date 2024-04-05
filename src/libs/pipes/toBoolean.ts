export const toBoolean = (value: string | null): boolean | undefined => {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
};
