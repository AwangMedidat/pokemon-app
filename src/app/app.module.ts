import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListsComponent } from './components/pokemon-lists/pokemon-lists.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { ComparePokemonComponent } from './components/compare-pokemon/compare-pokemon.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListsComponent,
    PokemonDetailComponent,
    HeaderComponent,
    ComparePokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
