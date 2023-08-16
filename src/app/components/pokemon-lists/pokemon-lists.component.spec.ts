import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListsComponent } from './pokemon-lists.component';

describe('PokemonListsComponent', () => {
  let component: PokemonListsComponent;
  let fixture: ComponentFixture<PokemonListsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonListsComponent]
    });
    fixture = TestBed.createComponent(PokemonListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
