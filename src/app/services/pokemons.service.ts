import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PokemonListDto } from '../models/pokemon-list-dto.interface';
import { Observable, of, catchError } from 'rxjs'; // Import 'of' from 'rxjs'
import { PokemonDetailsDto } from '../models/pokemon-details-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  /** Fetches a list of Pokémon. */
  public getList(url?: string): Observable<PokemonListDto> {
    return this.http
      .get<PokemonListDto>(url ? url : this.baseUrl)
      .pipe(
        catchError(
          this.handleError<PokemonListDto>('getList', { count: 0, results: [] })
        )
      );
  }

  /** Fetches details of a specific Pokémon by ID or name. */
  public getDetails(pokemonId: string): Observable<PokemonDetailsDto> {
    return this.http
      .get<PokemonDetailsDto>(`${this.baseUrl}/${pokemonId}`)
      .pipe(
        catchError(
          this.handleError<PokemonDetailsDto>(
            'getDetails',
            {} as PokemonDetailsDto
          )
        )
      );
  }

  /** Constructs the URL for a Pokémon's sprite image based on its ID. */
  public getImageUrl(pokemonId: string): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  }

  /** Handles HTTP errors. */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Return an empty result to keep the app running
      return of(result as T); // Use 'of' to create an observable
    };
  }
}
