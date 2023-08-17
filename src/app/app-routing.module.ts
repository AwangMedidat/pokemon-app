import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListsComponent } from './components/pokemon-lists/pokemon-lists.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { ComparePokemonComponent } from './components/compare-pokemon/compare-pokemon.component';

const routes: Routes = [
  {path: '', component: PokemonListsComponent},
  {path: 'detail/:name', component: PokemonDetailComponent},
  {path: 'compare', component: ComparePokemonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
