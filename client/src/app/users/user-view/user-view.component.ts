import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DetailedUserData} from "../../_models/detailedUserData";
import {HttpClient} from "@angular/common/http";
import {environmentDev} from "../../../environment/environment.development";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  userName: string | null = null;
  userData: DetailedUserData | null = null;
  baseUrl = environmentDev.apiUrl;


  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userName = params.get('id');
      this.getUserData();
    });
  }

  getUserData() {
    this.http.get<DetailedUserData>(this.baseUrl + 'users/' + this.userName).subscribe(data => {
      this.userData = data;
      console.log(this.userData);
    });
  }
}
