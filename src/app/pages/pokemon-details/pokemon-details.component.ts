import { Component, inject, OnInit } from "@angular/core";
import { PokemonsService } from "../../services/pokemons.service";
import { ActivatedRoute } from "@angular/router";
import { AsyncPipe, TitleCasePipe } from "@angular/common";
import { PokemonDetailsDto } from "../../models/pokemon-details-dto.interface";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatChipsModule } from "@angular/material/chips";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@Component({
  selector: "app-pokemon-details",
  standalone: true,
  imports: [
    AsyncPipe,
    TitleCasePipe,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  templateUrl: "./pokemon-details.component.html",
  styleUrls: ["./pokemon-details.component.scss"],
})
export class PokemonDetailsComponent implements OnInit {
  private readonly pokemonService = inject(PokemonsService);
  private readonly route = inject(ActivatedRoute);

  public pokemonId = this.route.snapshot.params?.["id"];
  public pokemonDetails$ = this.pokemonService.getDetails(this.pokemonId);

  ngOnInit(): void {
    console.log("Pokemon ID:", this.pokemonId);
  }

  getStatColor(value: number): string {
    if (value >= 80) return "primary";
    if (value >= 50) return "accent";
    return "warn";
  }
}
