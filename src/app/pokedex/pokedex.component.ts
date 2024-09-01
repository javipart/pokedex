import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokeDescriptionComponent } from './poke-description/poke-description.component';
import { PokeScreenComponent } from './poke-screen/poke-screen.component';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss',
  standalone: true,
  imports: [RouterOutlet, PokeDescriptionComponent, PokeScreenComponent]
})
export class PokedexComponent {
}
