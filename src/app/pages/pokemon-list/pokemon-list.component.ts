import { Component, inject } from '@angular/core';
import { PokemonsService } from '../../services/pokemons.service';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { AsyncPipe } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, switchMap } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCardComponent, AsyncPipe, MatPaginatorModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  private readonly pokemonService = inject(PokemonsService);

  public readonly paginatorClicked$ = new BehaviorSubject<string | undefined>(
    undefined
  );

  public pokemonList$ = this.paginatorClicked$.pipe(
    switchMap((value) => this.pokemonService.getList(value))
  );

  onPageChange(e: PageEvent, next?: string, previous?: string) {
    if (!e.previousPageIndex || e.previousPageIndex! < e.pageIndex) {
      this.paginatorClicked$.next(next);
    } else {
      this.paginatorClicked$.next(previous);
    }
  }
}
