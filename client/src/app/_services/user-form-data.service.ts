import {Injectable} from "@angular/core";
import {BusinessSubcategories, Category} from "../_models/categoriesEnum";
import {UserRegister} from "../_models/userRegister";
import {DetailedUserData} from "../_models/detailedUserData";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserFormDataService {
  constructor(private http: HttpClient) {
  }

  validForm(loginErrors: string[], userCreds: UserRegister | DetailedUserData): boolean {
    let formInvalid = false;
    loginErrors.length = 0;

    if (!this.isValidEmail(userCreds.email)) {
      loginErrors.push('Invalid email');
      formInvalid = true;
    }

    if ('password' in userCreds) {
      const passwordLength = userCreds.password.length;
      if (passwordLength < 4 || passwordLength > 16) {
        loginErrors.push('Password should be between 4 and 16 characters');
        formInvalid = true;
      }
    }

    if (userCreds.phoneNumber.length !== 9) {
      loginErrors.push('Phone number should be 9 characters');
      formInvalid = true;
    }

    return !formInvalid;
  }

  // Function to disable non-numeric keys
  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
    const isAllowedKey = allowedKeys.includes(event.key);

    // Check if the key is a number
    const isNumeric = /\d/.test(event.key);

    // If the key is not allowed, prevent the default action
    if (!isAllowedKey && !isNumeric) {
      event.preventDefault();
    }
  }

  isValidEmail(email: string): boolean {
    // Could use some complex regex here, but this is good enough for now
    return email.includes('@');
  }

  selectCategory(category: string, userCreds: UserRegister | DetailedUserData) {
    userCreds.category = category as Category;
    userCreds.subCategory = '';
    if (category == Category.Business) {
      userCreds.subCategory = BusinessSubcategories.Client;
    }
  }

  getUserData(userData: DetailedUserData, searchQuery: string | null, baseUrl: string) {
    this.http.get<DetailedUserData>(baseUrl + 'users/' + searchQuery).subscribe(data => {
      Object.assign(userData, data);
    });
  }
}
