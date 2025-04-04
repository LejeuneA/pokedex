import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MyPokemonsComponent } from './pages/my-pokemons/my-pokemons.component';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { authGuard } from './guards/auth.guard';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';

export const routes: Routes = [
  {
    path: 'my-pokemons',
    component: MyPokemonsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'pokemon-list',
    component: PokemonListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'pokemon-details/:id',
    component: PokemonDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginPageComponent },
  { path: '**', redirectTo: 'login' },
];
