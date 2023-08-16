import { Component, OnInit } from '@angular/core';
import { AxiosService } from 'src/app/services/axios.service';

@Component({
  selector: 'app-pokemon-lists',
  templateUrl: './pokemon-lists.component.html',
  styleUrls: ['./pokemon-lists.component.css'],
})
export class PokemonListsComponent implements OnInit {
  currentPage: number = 1;
  pageSize: number = 25;
  totalItems: number = 0;
  totalPages: number = 1;
  totalPagesArray: number[] = [];
  data: any[] = [];

  constructor(private pokemonService: AxiosService) {}
  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  loadPage(page: number): void {
    this.pokemonService.getPokemonPage(page, this.pageSize).subscribe(
      (result: any) => {
        this.data = result.data;
        this.totalItems = result.totalItems;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.generateTotalPagesArray();
        this.data.forEach((pokemon: any) => {
          this.pokemonService
            .getPokemonDetail(pokemon.name)
            .then((pokemonData: any) => {
              pokemon.image = pokemonData.data.sprites.other.dream_world.front_default;
            });
        });
      },
      (error: any) => {
        console.error('Error loading page:', error);
      }
    );
  }

  generateTotalPagesArray(): void {
    this.totalPagesArray = Array.from(
      { length: this.totalPages },
      (_, i) => i + 1
    );
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPage(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPage(this.currentPage);
    }
  }

  capitalizeFirstLetter(name: string): string {
    return this.pokemonService.capitalizeFirstLetter(name)
  }

}
