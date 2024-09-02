import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokeDescriptionComponent } from './poke-description.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PokemonInterface } from '../interface/pokemon.interface';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('PokeDescriptionComponent', () => {
  let component: PokeDescriptionComponent;
  let fixture: ComponentFixture<PokeDescriptionComponent>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => '1'
      }
    },
    queryParams: of({})
  };

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


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatCardModule,
        MatDividerModule,
        MatGridListModule,
        MatProgressBarModule,
        MatIconModule,
        MatButtonModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeDescriptionComponent);
    component = fixture.componentInstance;
    component.selectedPokemon = mockPokemon;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct Pokémon name', () => {
    const compiled = fixture.nativeElement;
    const pokeNameElement = compiled.querySelector('.poke-name');
    expect(pokeNameElement.textContent.trim()).toBe('Bulbasaur');
  });

  it('should display the correct Pokémon ID', () => {
    const compiled = fixture.nativeElement;
    const pokeIdElement = compiled.querySelector('.hp span');
    expect(pokeIdElement.textContent.trim()).toContain('1');
  });

  it('should render the Pokémon image', () => {
    const compiled = fixture.nativeElement;
    const imgElement = compiled.querySelector('img');
    expect(imgElement.src).toContain('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.png');
  });

  it('should display the correct Pokémon types', () => {
    const compiled = fixture.nativeElement;
    const typeElements = compiled.querySelectorAll('.types span');
    expect(typeElements.length).toBe(1);
    expect(typeElements[0].textContent.trim()).toBe('normal');
  });

  it('should display the correct Pokémon weight and height', () => {
    const compiled = fixture.nativeElement;
    const stats = compiled.querySelectorAll('.stats div h3');
    const weight = stats[0];
    const height = stats[1];

    expect(weight.textContent.trim()).toBe('40');
    expect(height.textContent.trim()).toBe('7');
  });
});
