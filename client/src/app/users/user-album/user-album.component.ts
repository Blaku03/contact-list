import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environmentDev} from "../../../environment/environment.development";
import {BasicUserData} from "../../_models/basicUserData";
import {AccountService} from "../../_services/account.service";
import {Router} from "@angular/router";
import {map} from "rxjs";

@Component({
  selector: 'app-user-album',
  templateUrl: './user-album.component.html',
  styleUrls: ['./user-album.component.css']
})
export class UserAlbumComponent implements OnInit {

  baseUrl = environmentDev.apiUrl;
  allUsers: BasicUserData[] = [];

  constructor(private http: HttpClient, public accountService: AccountService, private router: Router) {
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.http.get(this.baseUrl + 'users').subscribe(users => {
      this.allUsers = users as BasicUserData[];
    });
  }

  viewUser(userName: string) {
    this.router.navigate(['/users/view/', userName]);
  }

  editUser(userName: string) {
    this.router.navigate(['/users/edit/', userName]);
  }

  addNewUser() {
    this.router.navigate(['/register']);
  }

  removeUser(id: number) {
    this.http.delete(this.baseUrl + 'users/' + id).subscribe(() => {
      this.getAllUsers();
    });
  }
}
