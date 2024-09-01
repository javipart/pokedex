import { Routes } from "@angular/router";
import { PokeDescriptionComponent } from "./pokedex/poke-description/poke-description.component";
import { PokeScreenComponent } from "./pokedex/poke-screen/poke-screen.component";
import { PokedexComponent } from "./pokedex/pokedex.component";

export const APP_ROUTES: Routes = [
  {
    path: 'pokedex',
    component: PokedexComponent,
  },
  {
    path: 'pokedex/screen',
    component: PokeScreenComponent,
  },
  {
    path: 'pokedex/description',
    component: PokeDescriptionComponent,
  },
  { path: '', redirectTo: '/pokedex', pathMatch: 'full' }
];