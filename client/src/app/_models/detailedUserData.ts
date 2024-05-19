import {Category} from "./categoriesEnum";

export interface DetailedUserData {
  userName: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  category: Category;
  subCategory?: string
}

