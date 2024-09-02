import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PokeScreenComponent } from './poke-screen.component';
import { PokeAPIService } from '../services/pokeapi.service';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonInterface } from '../interface/pokemon.interface';
import { PokemonListResponse } from '../interface/pokemon-list-response';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('PokeScreenComponent', () => {
  let component: PokeScreenComponent;
  let fixture: ComponentFixture<PokeScreenComponent>;
  let pokeApiService: jasmine.SpyObj<PokeAPIService>;

  beforeEach(async () => {
    const pokeApiServiceSpy = jasmine.createSpyObj('PokeAPIService', ['getPokemons', 'getPokemon']);

    await TestBed.configureTestingModule({
      imports: [
        PokeScreenComponent,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatGridListModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatIconModule,
        MatButtonModule,
        CommonModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PokeAPIService, useValue: pokeApiServiceSpy },
      ]
    }).compileComponents();

    pokeApiService = TestBed.inject(PokeAPIService) as jasmine.SpyObj<PokeAPIService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemons on initialization', async () => {
    const mockPokemons: PokemonListResponse = {
      results: [
        {
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
          name: ''
        },
        {
          url: 'https://pokeapi.co/api/v2/pokemon/2/',
          name: ''
        }
      ],
      count: 2,
      next: null,
      previous: null
    };

    const mockPokemonData: PokemonInterface = {
      abilities: [
        {
          ability: {
            name: 'overgrow',
            url: 'https://pokeapi.co/api/v2/ability/1/'
          },
          is_hidden: false,
          slot: 1
        }
      ],
      base_experience: 64,
      cries: {
        latest: 'https://pokeapi.co/api/v2/cry/latest/',
        legacy: 'https://pokeapi.co/api/v2/cry/legacy/'
      },
      forms: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon-form/1/'
        }
      ],
      game_indices: [
        {
          game_index: 1,
          version: {
            name: 'red',
            url: 'https://pokeapi.co/api/v2/version/1/'
          }
        }
      ],
      height: 7,
      held_items: [
        {
          item: {
            name: 'berry',
            url: 'https://pokeapi.co/api/v2/item/1/'
          },
          version_details: [
            {
              rarity: 5,
              version: {
                name: 'red',
                url: 'https://pokeapi.co/api/v2/version/1/'
              }
            }
          ]
        }
      ],
      id: 1,
      is_default: true,
      location_area_encounters: 'https://pokeapi.co/api/v2/encounter-area/1/',
      moves: [
        {
          move: {
            name: 'tackle',
            url: 'https://pokeapi.co/api/v2/move/1/'
          },
          version_group_details: [
            {
              level_learned_at: 1,
              move_learn_method: {
                name: 'level-up',
                url: 'https://pokeapi.co/api/v2/move-learn-method/1/'
              },
              version_group: {
                name: 'red-blue',
                url: 'https://pokeapi.co/api/v2/version-group/1/'
              }
            }
          ]
        }
      ],
      name: 'bulbasaur',
      order: 1,
      past_abilities: [],
      past_types: [],
      species: {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
      },
      sprites: {
        back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
        back_female: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/1.png',
        back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',
        back_shiny_female: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/1.png',
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        front_female: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/front/female/1.png',
        front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/front/shiny/1.png',
        front_shiny_female: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/front/shiny/female/1.png',
        other: {
          dream_world: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.png'
          }
        }
      },
      types: [
        {
          slot: 1,
          type: {
            name: 'normal',
            url: 'https://pokeapi.co/api/v2/type/1/'
          }
        }
      ],
      weight: 40
    };

    pokeApiService.getPokemons.and.returnValue(of(mockPokemons));
    pokeApiService.getPokemon.and.returnValue(of(mockPokemonData));

    await component.loadPokemons();

    expect(pokeApiService.getPokemons).toHaveBeenCalled();
    expect(pokeApiService.getPokemon).toHaveBeenCalled();
    expect(component.pokemonList.length).toBe(2);
    expect(component.totalPokemons).toBe(2);
  });

  it('should search for a specific pokemon', async () => {
    const mockPokemon: PokemonInterface = {
      abilities: [
        {
          ability: {
            name: 'overgrow',
            url: 'https://pokeapi.co/api/v2/ability/1/'
          },
          is_hidden: false,
          slot: 1
        }
      ],
      base_experience: 64,
      cries: {
        latest: 'https://pokeapi.co/api/v2/cry/latest/',
        legacy: 'https://pokeapi.co/api/v2/cry/legacy/'
      },
      forms: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon-form/1/'
        }
      ],
      game_indices: [
        {
          game_index: 1,
          version: {
            name: 'red',
            url: 'https://pokeapi.co/api/v2/version/1/'
          }
        }
      ],
      height: 7,
      held_items: [
        {
          item: {
            name: 'berry',
            url: 'https://pokeapi.co/api/v2/item/1/'
          },
          version_details: [
            {
              rarity: 5,
              version: {
                name: 'red',
                url: 'https://pokeapi.co/api/v2/version/1/'
              }
            }
          ]
        }
      ],
      id: 1,
      is_default: true,
      location_area_encounters: 'https://pokeapi.co/api/v2/encounter-area/1/',
      moves: [
        {
          move: {
            name: 'tackle',
            url: 'https://pokeapi.co/api/v2/move/1/'
          },
          version_group_details: [
            {
              level_learned_at: 1,
              move_learn_method: {
                name: 'level-up',
                url: 'https://pokeapi.co/api/v2/move-learn-method/1/'
              },
              version_group: {
                name: 'red-blue',
                url: 'https://pokeapi.co/api/v2/version-group/1/'
              }
            }
          ]
        }
      ],
      name: 'bulbasaur',
      order: 1,
      past_abilities: [],
      past_types: [],
      species: {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
      },
      sprites: {
        back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
        back_female: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/1.png',
        back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',
        back_shiny_female: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/1.png',
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        front_female: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/front/female/1.png',
        front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/front/shiny/1.png',
        front_shiny_female: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/front/shiny/female/1.png',
        other: {
          dream_world: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.png'
          }
        }
      },
      types: [
        {
          slot: 1,
          type: {
            name: 'normal',
            url: 'https://pokeapi.co/api/v2/type/1/'
          }
        }
      ],
      weight: 40
    };

    pokeApiService.getPokemon.and.returnValue(of(mockPokemon));
    component.searchValue = '1';
    component.onSearch();

    fixture.detectChanges();

    expect(pokeApiService.getPokemon).toHaveBeenCalledWith('1');
    expect(component.pokemonList.length).toBe(1);
    expect(component.pokemonList[0].name).toBe('bulbasaur');
  });

  it('should clear search and load all pokemons', async () => {
    component.searchValue = '1';
    component.clearSearch();

    fixture.detectChanges();

    expect(component.searchValue).toBe('');
    expect(pokeApiService.getPokemons).toHaveBeenCalled();
  });
});
