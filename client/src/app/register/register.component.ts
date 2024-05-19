import {Component} from '@angular/core';
import {createDefaultUserRegister, UserRegister} from "../_models/userRegister";
import {Router} from "@angular/router";
import {AccountService} from "../_services/account.service";
import {BusinessSubcategories, Category} from "../_models/categoriesEnum";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userCreds: UserRegister = createDefaultUserRegister();
  loginErrors: string[] = [];
  categories = Object.values(Category);
  businessSubcategories = Object.values(BusinessSubcategories)

  constructor(public accountService: AccountService, private router: Router) {
  }

  validForm(): boolean {
    const passwordLength = this.userCreds.password.length;
    let formInvalid = false;
    this.loginErrors = [];

    if (!this.isValidEmail(this.userCreds.email)) {
      this.loginErrors.push('Invalid email');
      formInvalid = true;
    }

    if (passwordLength < 4 || passwordLength > 8) {
      this.loginErrors.push('Password should be between 4 and 8 characters');
      formInvalid = true;
    }

    if (this.userCreds.phoneNumber.length !== 9) {
      this.loginErrors.push('Phone number should be 9 characters');
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

  selectCategory(category: string) {
    this.userCreds.category = category as Category;
    this.userCreds.subcategory = '';
    if (category == Category.Business) {
      this.userCreds.subcategory = BusinessSubcategories.Client;
    }
  }

  selectSubcategory(subcategory: string) {
    this.userCreds.subcategory = subcategory;
  }

  register() {
    if (!this.validForm()) {
      return;
    }
    console.log(this.userCreds);
    this.accountService.register(this.userCreds).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => {
        console.log(err);
        this.loginErrors.push(err.error);
      }
    });
  }

}
