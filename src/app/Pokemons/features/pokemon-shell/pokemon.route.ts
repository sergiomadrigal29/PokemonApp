import { Routes } from '@angular/router';

const pokemonRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../pokemon-list/pokemon-list.component').then(
        (m) => m.PokemonListComponent
      ),
  },
];

export default pokemonRoutes;
