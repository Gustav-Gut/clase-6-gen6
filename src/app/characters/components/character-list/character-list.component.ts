import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/interfaces/character';
import { RickAndMortyService } from '../../../services/rick-and-morty.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  public allCharacters: Character[];

  constructor(
    private rickAndMortyS: RickAndMortyService
  ) {
    rickAndMortyS.getAllCharacters().subscribe(respAllCharacters => {
      this.allCharacters = respAllCharacters;
    });
  }

  ngOnInit() {
    console.log(this.allCharacters);
  }

}
