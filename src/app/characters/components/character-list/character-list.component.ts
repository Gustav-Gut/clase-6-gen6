import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../../../services/rick-and-morty.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

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
