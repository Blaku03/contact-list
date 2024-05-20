import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserAlbumComponent} from "./users/user-album/user-album.component";
import {UserViewComponent} from "./users/user-view/user-view.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {authGuard} from "./_guards/auth.guard";
import {UserEditComponent} from "./users/user-edit/user-edit.component";

const routes: Routes = [
  {path: '', component: UserAlbumComponent},
  {path: 'users', component: UserAlbumComponent},
  {path: 'users/view/:query', component: UserViewComponent}, //query can be id or username
  {path: 'users/edit/:query', component: UserEditComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: UserAlbumComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
