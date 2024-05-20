import {Component} from '@angular/core';
import {createDefaultUserRegister, UserRegister} from "../_models/userRegister";
import {Router} from "@angular/router";
import {AccountService} from "../_services/account.service";
import {BusinessSubcategories, Category} from "../_models/categoriesEnum";
import {UserFormDataService} from "../_services/user-form-data.service";

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

  constructor(public accountService: AccountService, private router: Router, private userFormDataService: UserFormDataService) {
  }

  validForm(): boolean {
    return this.userFormDataService.validForm(this.loginErrors, this.userCreds);
  }

  // Function to disable non-numeric keys
  onKeyDown(event: KeyboardEvent) {
    this.userFormDataService.onKeyDown(event);
  }

  selectCategory(category: string) {
    return this.userFormDataService.selectCategory(category, this.userCreds);
  }

  selectSubcategory(subcategory: string) {
    this.userCreds.subCategory = subcategory;
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
