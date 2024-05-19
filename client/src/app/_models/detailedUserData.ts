import {Category} from "./categoriesEnum";

export interface DetailedUserData {
  userName: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  birthDate: Date;
  category: Category;
  subcategory?: string
}

