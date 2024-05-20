import {Component, OnInit} from '@angular/core';
import {createDefaultDetailedUserData, DetailedUserData} from "../../_models/detailedUserData";
import {environmentDev} from "../../../environment/environment.development";
import {ActivatedRoute} from "@angular/router";
import {UserFormDataService} from "../../_services/user-form-data.service";
import {BusinessSubcategories, Category} from "../../_models/categoriesEnum";
import {AccountService} from "../../_services/account.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  searchQuery: string | null = null;
  userData: DetailedUserData = createDefaultDetailedUserData();
  saveErrors: string[] = [];
  baseUrl = environmentDev.apiUrl;
  categories = Object.values(Category);
  businessSubcategories = Object.values(BusinessSubcategories);

  constructor(private route: ActivatedRoute, private userFormDataService: UserFormDataService, public accountService: AccountService, private http: HttpClient) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.searchQuery = params.get('query');
      this.userFormDataService.getUserData(this.userData, this.searchQuery, this.baseUrl);
    });
  }

  validForm(): boolean {
    return this.userFormDataService.validForm(this.saveErrors, this.userData);
  }

  // Function to disable non-numeric keys
  onKeyDown(event: KeyboardEvent) {
    this.userFormDataService.onKeyDown(event);
  }

  selectCategory(category: string) {
    return this.userFormDataService.selectCategory(category, this.userData);
  }

  selectSubcategory(subcategory: string) {
    this.userData.subCategory = subcategory;
  }

  save() {
    if (!this.validForm()) {
      return;
    }
    console.log("Saving user")
    this.http.put(this.baseUrl + 'users/' + this.userData.id, this.userData).subscribe({
      next: () => {
        this.saveErrors = ['User updated successfully!'];
        this.userFormDataService.getUserData(this.userData, this.searchQuery, this.baseUrl);
      }
    });
  }
}
