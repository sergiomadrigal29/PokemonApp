import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Datum } from '../../shared/interface/pokemon';
import { PokemonService } from './pokemons.service';
import {
  ExactMatch,
  Sugerencia,
} from '../../shared/interface/pokemon-response';

interface PokemonsState {
  pokemon: Datum[];
  status: 'loading' | 'error' | 'loaded';
  page: number;
  searchTerm: string;
  exactMatch?: ExactMatch | null;
  sugerencias?: Sugerencia[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonsStateService {
  private stateSubject = new BehaviorSubject<PokemonsState>({
    pokemon: [],
    status: 'loading',
    page: 0,
    searchTerm: '',
  });

  state$: Observable<PokemonsState> = this.stateSubject.asObservable();

  constructor(private pokemonService: PokemonService) {}

  get state(): Observable<PokemonsState> {
    return this.stateSubject.asObservable();
  }

  loadPokemons() {
    this.setState({ status: 'loading' });
    this.pokemonService.getPokemons(this.stateSubject.value.page).subscribe({
      next: (response) => {
        this.setState({ pokemon: response.data, status: 'loaded' });
      },
      error: () => {
        this.setState({ status: 'error' });
      },
    });
  }

  searchPokemon(term: string) {
    this.setState({ status: 'loading', searchTerm: term });
    this.pokemonService.getPokemonByName(term).subscribe({
      next: (response) => {
        this.setState({
          pokemon: response.data
            ? [response.data, ...response.sugerencias]
            : response.sugerencias,
          status: 'loaded',
          exactMatch: response.data,
          sugerencias: response.sugerencias,
        });
      },
      error: () => {
        this.setState({ status: 'error' });
      },
    });
  }

  resetSearch() {
    this.setState({ searchTerm: '' });
    this.loadPokemons();
  }

  nextPage() {
    this.setState({ page: this.stateSubject.value.page + 1 });
    this.loadPokemons();
  }

  previousPage() {
    this.setState({ page: this.stateSubject.value.page - 1 });
    this.loadPokemons();
  }

  private setState(newState: Partial<PokemonsState>) {
    this.stateSubject.next({ ...this.stateSubject.value, ...newState });
  }

  getState(): PokemonsState {
    return this.stateSubject.value;
  }

  isPreviousDisabled(): boolean {
    return this.stateSubject.value.page === 0;
  }

  isNextDisabled(): boolean {
    return false;
  }
}
