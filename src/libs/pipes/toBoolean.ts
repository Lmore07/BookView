import { RolEnum } from "../interfaces/user.interface";

export const toBoolean = (value: string | null): boolean | undefined => {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
};

export const toRolEnum = (value: string | null): RolEnum | undefined => {
  if (value === RolEnum.CREATOR) return RolEnum.CREATOR;
  if (value === RolEnum.READER) return RolEnum.READER;
  return undefined;
};
