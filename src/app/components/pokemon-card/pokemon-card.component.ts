import { Component, inject, Input, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { PokemonsService } from "../../services/pokemons.service";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { UserService } from "../../services/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CommonModule } from "@angular/common"; // Add this import

@Component({
  selector: "app-pokemon-card",
  standalone: true,
  imports: [
    CommonModule, // Add this to imports
    MatCardModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: "./pokemon-card.component.html",
  styleUrl: "./pokemon-card.component.scss",
})
export class PokemonCardComponent implements OnInit {
  @Input() public name!: string;
  @Input() public detailUrl!: string;

  private readonly pokemonService = inject(PokemonsService);
  private readonly userService = inject(UserService);
  private readonly snackBar = inject(MatSnackBar);

  public imageUrl!: string;
  public id!: string;
  public isFavorite = false;

  ngOnInit() {
    this.id = this.getIdFromUrl(this.detailUrl);
    this.imageUrl = this.pokemonService.getImageUrl(this.id);
    this.checkIfFavorite();
  }

  private getIdFromUrl(url: string) {
    const urlAsArray = url.split("/");
    if (urlAsArray.length > 2 && urlAsArray[urlAsArray.length - 2]) {
      const id = urlAsArray[urlAsArray.length - 2];
      return id;
    }
    return "";
  }

  private checkIfFavorite() {
    this.isFavorite = this.userService.isPokemonFavorite(this.id);
  }

  public toggleFavorite() {
    if (!this.userService.isUserLoggedIn()) {
      this.snackBar.open("Please log in to favorite Pokémon", "Close", {
        duration: 3000,
      });
      return;
    }

    if (this.isFavorite) {
      this.userService.removeFavoritePokemon(this.id);
      this.snackBar.open("Removed from favorites", "Close", {
        duration: 2000,
      });
    } else {
      this.userService.addFavoritePokemon(this.id, this.name);
      this.snackBar.open("Added to favorites", "Close", {
        duration: 2000,
      });
    }
    this.isFavorite = !this.isFavorite;
  }
}
