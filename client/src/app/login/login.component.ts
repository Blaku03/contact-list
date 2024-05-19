import {Component} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {Router} from "@angular/router";
import {UserLogin} from "../_models/userLogin";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userCreds: UserLogin;
  loginError: string = '';

  constructor(public accountService: AccountService, private router: Router) {
    this.userCreds = {userName: '', password: ''};
  }

  login() {
    this.accountService.login(this.userCreds).subscribe({
      next: () => this.router.navigateByUrl('/users'),
      error: (err) => {
        this.loginError = err
        this.userCreds.password = '';
        this.userCreds.userName = '';
      }
    });
  }
}
