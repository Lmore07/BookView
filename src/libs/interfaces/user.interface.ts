export interface UserRegister {
  names: string;
  lastNames: string;
  birthday: Date;
  email: string;
  password: string;
  role: string;
}

export interface LoginI {
  email: string;
  password: string;
}

export interface DataLogin {
  email: string;
  id: number;
  role: RolEnum;
}

export enum RolEnum {
  READER = "READER",
  CREATOR = "CREATOR",
  ADMIN = "ADMIN",
}

export interface UserInfo {
  mail: string;
  profilePicture?: any;
  Person: Person;
}

export interface Person {
  names: string;
  lastNames: string;
  birthday: string;
}
