import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./Pokemons/features/pokemon-shell/pokemon.route').then(
        (m) => m.default
      ),
  },
  { path: '**', redirectTo: '' },
];
