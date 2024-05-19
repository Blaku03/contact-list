import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environmentDev} from "../../../environment/environment.development";
import {basicUserData} from "../../_models/basicUserData";
import {AccountService} from "../../_services/account.service";

@Component({
  selector: 'app-user-album',
  templateUrl: './user-album.component.html',
  styleUrls: ['./user-album.component.css']
})
export class UserAlbumComponent implements OnInit {

  baseUrl = environmentDev.apiUrl;
  allUsers: basicUserData[] = [];

  constructor(private http: HttpClient, public accountService: AccountService) {
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.http.get(this.baseUrl + 'users').subscribe(users => {
      this.allUsers = users as basicUserData[];
    });
  }
}
