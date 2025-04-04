import { Component, inject } from '@angular/core';
import { PokemonsService } from '../../services/pokemons.service';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { AsyncPipe } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCardComponent, AsyncPipe, MatPaginatorModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  private readonly pokemonService = inject(PokemonsService);

  public pokemonList$ = this.pokemonService.getList();
}
