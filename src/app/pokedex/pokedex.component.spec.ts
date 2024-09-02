import { TestBed } from '@angular/core/testing';
import { PokedexComponent } from './pokedex.component';
import { PokeScreenComponent } from './poke-screen/poke-screen.component';
import { PokeDescriptionComponent } from './poke-description/poke-description.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PokedexComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PokedexComponent,
        BrowserAnimationsModule
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    }).compileComponents();
  });

  it('should create the PokedexComponent', () => {
    const fixture = TestBed.createComponent(PokedexComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render PokeScreenComponent', () => {
    const fixture = TestBed.createComponent(PokedexComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-poke-screen')).not.toBeNull();
  });
});
