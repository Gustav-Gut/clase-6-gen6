import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterComponent } from './components/character/character.component';
import { CharactersComponent } from './components/characters/characters.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'characters', component:CharactersComponent},
  {path:'character/:id', component:CharacterComponent},
  {path:'login', redirectTo:'home', pathMatch:'full'},
  {path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
