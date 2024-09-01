import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonInterface } from '../interface/pokemon.interface';
import { PokemonListResponse } from '../interface/pokemon-list-response';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) { }

  getPokemon(pokemon:string): Observable<PokemonInterface> {
    return this.http.get<PokemonInterface>(`${this.apiUrl}/${pokemon}`);
  }

  getPokemons(limit: number = 10, offset: number = 0): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  }
}