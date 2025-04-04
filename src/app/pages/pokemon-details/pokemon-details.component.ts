import { Component, inject, OnInit } from '@angular/core';
import { PokemonsService } from '../../services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { PokemonDetailsDto } from '../../models/pokemon-details-dto.interface';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  private readonly pokemonService = inject(PokemonsService);
  private readonly route = inject(ActivatedRoute);

  public pokemonId = this.route.snapshot.params?.['id'];
  public pokemonDetails$ = this.pokemonService.getDetails(this.pokemonId);

  ngOnInit(): void {
    console.log('Pokemon ID:', this.pokemonId);
  }
}
