import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PokemonsService } from '../../services/pokemons.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input() public name!: string;
  @Input() public detailUrl!: string;

  private readonly pokemonService = inject(PokemonsService);

  public imageUrl!: string;
  public id!: string;

  ngOnInit() {
    this.id = this.getIdFromUrl(this.detailUrl);
    this.imageUrl = this.pokemonService.getImageUrl(this.id);
  }

  private getIdFromUrl(url: string) {
    const urlAsArray = url.split('/');

    if (urlAsArray.length > 2 && urlAsArray[urlAsArray.length - 2]) {
      const id = urlAsArray[urlAsArray.length - 2];
      return id;
    }
    return '';
  }
}
