import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'That the client noo :(';
  users: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('https://localhost:7279/api/users').subscribe({
      next: data =>  this.users = data,
      error: error => console.error(error)
    })
  }
}
