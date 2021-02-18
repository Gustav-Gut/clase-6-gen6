import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../interfaces/character';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  public listCharacter: number[] = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  getRandomCharacters() {
    for (let index = 0; index < 12; index++) {
      this.listCharacter[index] = Math.floor(Math.random() * 671);
    }
  }

  getAllCharacters(): Observable<Character[]> {
    this.getRandomCharacters();
    return this.httpClient.get<Character[]>(environment.endpointCharacter + this.listCharacter);
  }

  getCharacterById(id: any): Observable<Character> {
    return this.httpClient.get<Character>(environment.endpointCharacter + id);
  }
}
