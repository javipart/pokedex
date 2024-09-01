import { Component, Input } from '@angular/core';
import { PokemonInterface } from '../interface/pokemon.interface';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-poke-description',
  templateUrl: './poke-description.component.html',
  styleUrls: ['./poke-description.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatGridTile,
    CommonModule,
    MatDivider,
    MatProgressBar,
    MatIconModule,
    MatButtonModule
  ]
})
export class PokeDescriptionComponent {
  @Input() selectedPokemon!: PokemonInterface;

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

  getBackground(pokemon: PokemonInterface) {
    const type = pokemon.types[0]?.type.name;
    return `radial-gradient(circle at 50% 0%, ${this.typeColor[type]} 36%, #ffffff 36%)`;
  }

  getBackgroundType(type: string) {
    return this.typeColor[type];
  }
}
