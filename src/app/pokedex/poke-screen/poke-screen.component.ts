import { Component, Input, OnInit } from '@angular/core';
import { PokemonInterface } from '../interface/pokemon.interface';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { PokeAPIService } from '../services/pokeapi.service';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { firstValueFrom } from 'rxjs';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PokeDescriptionComponent } from '../poke-description/poke-description.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-poke-screen',
  templateUrl: './poke-screen.component.html',
  styleUrl: './poke-screen.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatGridTile,
    CommonModule,
    MatDivider,
    MatProgressBar,
    MatIconModule,
    MatButtonModule,
    PokeDescriptionComponent,
    MatPaginatorModule
  ]
})
export class PokeScreenComponent implements OnInit {
  pokemonList: PokemonInterface[] = [];
  searchValue: string = '';
  isLoading: boolean = false;
  cols: number = 4;
  totalPokemons: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;

  typeColor: any = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
  };

  constructor(private pokeApiService: PokeAPIService) { }

  ngOnInit(): void {
    this.updateLayout();
    this.loadPokemons();
    window.addEventListener('resize', this.updateLayout.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.updateLayout.bind(this));
  }

  updateLayout(): void {
    this.cols = window.innerWidth < 600 ? 1 : 4;
  }

  async loadPokemons(limit: number = 10, offset: number = 0): Promise<void> {
    try {
      this.isLoading = true;
      const response = await firstValueFrom(this.pokeApiService.getPokemons(limit, offset));
      const pokemonList = await Promise.all(
        response.results.map(async (item) => {
          const pokemonId = item.url.split('/').slice(-2, -1)[0];
          return await firstValueFrom(this.pokeApiService.getPokemon(pokemonId));
        })
      );
      this.pokemonList = pokemonList.filter((pokemon): pokemon is PokemonInterface => pokemon !== undefined);
      this.totalPokemons = response.count;
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error('Error loading pokemons', error);
    }
  }

  onPageChange(event: PageEvent): void {
    const offset = event.pageIndex * event.pageSize;
    this.pageSize = event.pageSize;
    this.loadPokemons(this.pageSize, offset);
  }

  clearSearch(): void {
    this.searchValue = '';
    this.cols = 4;
    this.loadPokemons();
  }

  onSearch(): void {
    if (this.searchValue) {
      this.pokeApiService.getPokemon(this.searchValue).subscribe(pokemon => {
        this.pokemonList = [pokemon];
        this.totalPokemons = 1;
        this.cols = 1
      });
    } else {
      this.loadPokemons(this.pageSize, this.pageIndex * this.pageSize);
    }
  }

  getBackground(pokemon: PokemonInterface) {
    const type = pokemon.types[0]?.type.name;
    return `radial-gradient(circle at 50% 0%, ${this.typeColor[type]} 36%, #ffffff 36%)`;
  }

  getBackgroundType(type: string) {
    return this.typeColor[type];
  }

  @Input() selectedPokemon!: PokemonInterface;
}
