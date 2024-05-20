import {Category} from "./categoriesEnum";

export interface DetailedUserData {
  id: number;
  userName: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  category: Category;
  subCategory?: string
}

export function createDefaultDetailedUserData(): DetailedUserData {
  return {
    id: -1,
    userName: '',
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    category: Category.Private,
  };
}
