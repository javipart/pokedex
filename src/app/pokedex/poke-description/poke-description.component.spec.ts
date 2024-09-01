import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeDescriptionComponent } from './poke-description.component';

describe('PokeDescriptionComponent', () => {
  let component: PokeDescriptionComponent;
  let fixture: ComponentFixture<PokeDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokeDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
