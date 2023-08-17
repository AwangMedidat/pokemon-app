import { Component, OnInit } from '@angular/core';
import { AxiosService } from 'src/app/services/axios.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-compare-pokemon',
  templateUrl: './compare-pokemon.component.html',
  styleUrls: ['./compare-pokemon.component.css'],
})
export class ComparePokemonComponent implements OnInit {
  currentPage: number = 1;
  pageSize: number = 25;
  totalItems: number = 0;
  totalPages: number = 1;
  totalPagesArray: number[] = [];
  data: any[] = [];
  selectedPokemon: any = null;
  chart1: any;
  currentPage2: number = 1;
  pageSize2: number = 25;
  totalItems2: number = 0;
  totalPages2: number = 1;
  totalPagesArray2: number[] = [];
  data2: any[] = [];
  selectedPokemon2: any = null;
  chart2: any;
  isLoading: boolean = true;
  hasError: boolean = false;

  constructor(private pokemonService: AxiosService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadPage(this.currentPage);
    this.loadPage2(this.currentPage2);

    this.chart1 = new Chart('chart1Canvas', {
      type: 'bar',
      data: {
        labels: ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'], // Stat names will go here
        datasets: [
          {
            label: 'Stat Values Pokemon 1',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true,
          },
        },
      },
    });

    this.chart2 = new Chart('chart2Canvas', {
      type: 'bar',
      data: {
        labels: ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'],
        datasets: [
          {
            label: 'Stat Values Pokemon 2',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true,
          },
        },
      },
    });
  }

  updateCharts(selectedPokemon: any, chart: any) {
    const statNames = selectedPokemon.stats.map((stat: any) => stat.stat.name);
    const statValues = selectedPokemon.stats.map((stat: any) => stat.base_stat);
    // chart.data.labels = statNames;
    chart.data.datasets[0].data = statValues;
    chart.update();
  }

  onImageLoad() {
    this.isLoading = false;
    this.hasError = false;
  }

  onImageError() {
    this.isLoading = false;
    this.hasError = true;
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
              pokemon.image =
                pokemonData.data.sprites.other.dream_world.front_default;
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

  toggleStats(pokemon: any) {
    this.pokemonService
      .getPokemonDetail(pokemon.name)
      .then((pokemonData: any) => {
        this.selectedPokemon = pokemon;
        this.selectedPokemon.stats = pokemonData.data.stats;
        this.updateCharts(this.selectedPokemon, this.chart1);
      });
  }

  loadPage2(page: number): void {
    this.pokemonService.getPokemonPage(page, this.pageSize).subscribe(
      (result: any) => {
        this.data2 = result.data;
        this.totalItems2 = result.totalItems;
        this.totalPages2 = Math.ceil(this.totalItems2 / this.pageSize2);
        this.generateTotalPagesArray2();
        this.data2.forEach((pokemon: any) => {
          this.pokemonService
            .getPokemonDetail(pokemon.name)
            .then((pokemonData: any) => {
              pokemon.image =
                pokemonData.data.sprites.other.dream_world.front_default;
            });
        });
      },
      (error: any) => {
        console.error('Error loading page:', error);
      }
    );
  }

  generateTotalPagesArray2(): void {
    this.totalPagesArray2 = Array.from(
      { length: this.totalPages2 },
      (_, i) => i + 1
    );
  }

  nextPage2(): void {
    if (this.currentPage2 < this.totalPages2) {
      this.currentPage2++;
      this.loadPage2(this.currentPage2);
    }
  }

  prevPage2(): void {
    if (this.currentPage2 > 1) {
      this.currentPage2--;
      this.loadPage2(this.currentPage2);
    }
  }

  toggleStats2(pokemon: any) {
    this.pokemonService
      .getPokemonDetail(pokemon.name)
      .then((pokemonData: any) => {
        this.selectedPokemon2 = pokemon;
        this.selectedPokemon2.stats = pokemonData.data.stats;
        this.updateCharts(this.selectedPokemon2, this.chart2);
      });
  }

  capitalizeFirstLetter(name: string): string {
    return this.pokemonService.capitalizeFirstLetter(name);
  }
}
