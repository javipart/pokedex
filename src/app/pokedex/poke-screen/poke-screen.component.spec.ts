import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PokeScreenComponent } from './poke-screen.component';
import { PokeAPIService } from '../services/pokeapi.service';
import { of } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { PokemonInterface } from '../interface/pokemon.interface';

describe('PokeScreenComponent', () => {
  let component: PokeScreenComponent;
  let fixture: ComponentFixture<PokeScreenComponent>;
  let pokeAPIService: jasmine.SpyObj<PokeAPIService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('PokeAPIService', ['getPokemons', 'getPokemon']);

    TestBed.configureTestingModule({
      imports: [
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatGridListModule,
        FormsModule
      ],
      declarations: [PokeScreenComponent],
      providers: [{ provide: PokeAPIService, useValue: spy }]
    }).compileComponents();

    pokeAPIService = TestBed.inject(PokeAPIService) as jasmine.SpyObj<PokeAPIService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemons on init', waitForAsync(() => {
    const mockPokemonResponse = {
      count: 1,
      results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
      next: null,
      previous: null
    };
    const mockPokemonDetail: PokemonInterface = {
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

    pokeAPIService.getPokemons.and.returnValue(of(mockPokemonResponse));
    pokeAPIService.getPokemon.and.returnValue(of(mockPokemonDetail));

    component.loadPokemons();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.pokemonList.length).toBe(1);
      expect(component.pokemonList[0].name).toBe('bulbasaur');
    });
  }));
  it('should search for a specific pokemon', () => {
    const mockPokemonDetail: PokemonInterface = {
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

    pokeAPIService.getPokemon.and.returnValue(of(mockPokemonDetail));

    component.searchValue = '1';
    component.onSearch();

    fixture.detectChanges();

    expect(component.pokemonList.length).toBe(1);
    expect(component.pokemonList[0].name).toBe('bulbasaur');
    expect(component.cols).toBe(1);
  });
  it('should clear the search and reload the pokemon list', waitForAsync(() => {
    const mockPokemonResponse = {
      count: 1,
      results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
      next: null,
      previous: null
    };
    const mockPokemonDetail: PokemonInterface = {
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

    pokeAPIService.getPokemons.and.returnValue(of(mockPokemonResponse));
    pokeAPIService.getPokemon.and.returnValue(of(mockPokemonDetail));

    component.clearSearch();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.pokemonList.length).toBe(1);
      expect(component.searchValue).toBe('');
      expect(component.cols).toBe(4);
    });
  }));

});
