import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AxiosService } from 'src/app/services/axios.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit {
  pokemonName: string = '';
  pokemonDetails: any;
  pokemonAbility: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private pokemonService: AxiosService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.pokemonName = params.get('name') || '';
      this.getPokemonDetail();
    });
  }

  getPokemonDetail(): void {
    this.pokemonService.getPokemonDetail(this.pokemonName).then(
      (details: any) => {
        details.data.abilities.forEach((ability: any) => {
          this.pokemonService.getPokemonAbilities(ability.ability.url).then((urlAbility: any) => {
            this.pokemonAbility.push(urlAbility.data)
          })
        })
        this.pokemonDetails = details;
      },
      (error: any) => {
        console.error('Error fetching Pokémon details:', error);
      }
    );
  }

  capitalizeFirstLetter(name: string): string {
    return this.pokemonService.capitalizeFirstLetter(name)
  }

}
