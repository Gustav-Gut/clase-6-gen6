import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { HomeComponent } from './components/home/home.component';
import { PopupComponent } from './components/popup/popup.component';
import { RegisterComponent } from './components/register/register.component';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  { path: 'popupAlert', component: PopupComponent, outlet: 'popup' },
  { path: 'home', component: HomeComponent, canActivate: [LoggedGuard] },
  { path: 'login', component: AuthenticationComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'characters', loadChildren: () => import("./characters/characters.module").then(mod => mod.CharactersModule) },
  { path: '', component: AuthenticationComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
