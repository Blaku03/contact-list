import {Category} from "./categoriesEnum";

export interface UserRegister {
  userName: string;
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  dateOfBirth: string;
  password: string;
  category: Category;
  subCategory?: string;
}

export function createDefaultUserRegister(): UserRegister {
  return {
    userName: '',
    email: '',
    name: '',
    surname: '',
    phoneNumber: '',
    dateOfBirth: '',
    password: '',
    category: Category.Private,
  };
}
