import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../../services/rick-and-morty.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  public allCharacters: any[] = [];

  constructor(
    private rickAndMortyS: RickAndMortyService
  ) {
    this.allCharacters = rickAndMortyS.getAllCharacters();
   }

  ngOnInit() {
    console.log(this.allCharacters);
  }

}
