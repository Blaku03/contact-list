import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, map, throwError} from "rxjs";
import {User} from "../_models/user";
import {UserLogin} from "../_models/userLogin";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:7279/api/';
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  login(userCreds: UserLogin) {
    return this.http.post<User>(this.baseUrl + 'account/login', userCreds).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      }),
      catchError(error => {
        console.log(error);
        return throwError('Login attempt was unsuccessful');
      })
    );
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user) => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }


  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
