import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {createDefaultDetailedUserData, DetailedUserData} from "../../_models/detailedUserData";
import {environmentDev} from "../../../environment/environment.development";
import {UserFormDataService} from "../../_services/user-form-data.service";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  searchQuery: string | null = null;
  userData: DetailedUserData = createDefaultDetailedUserData();
  baseUrl = environmentDev.apiUrl;

  constructor(private route: ActivatedRoute, private userFormDataService: UserFormDataService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.searchQuery = params.get('query');
      this.userFormDataService.getUserData(this.userData, this.searchQuery, this.baseUrl);
    });
  }
}
