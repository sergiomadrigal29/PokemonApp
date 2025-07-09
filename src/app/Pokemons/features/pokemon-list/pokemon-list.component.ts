import {
  AfterViewInit,
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PokemonsStateService } from '../../data-access/pokemons-state.service';
import { PokemonCardComponent } from '../../ui/pokemon-card/pokemon-card.component';
import { PokemonDetailModalComponent } from '../../ui/pokemon-detail-modal/pokemon-detail-modal.component';
import { CommonModule } from '@angular/common';
import { Datum } from '../../../shared/interface/pokemon';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchService } from '../../../services/search.service';
import { toSignal } from '@angular/core/rxjs-interop';

declare var bootstrap: any;

@Component({
  selector: 'app-pokemon-list',
  imports: [
    CommonModule,
    FormsModule,
    PokemonCardComponent,
    PokemonDetailModalComponent,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit, AfterViewInit {
  pokemonsState = inject(PokemonsStateService);
  searchService = inject(SearchService);
  isSearching: boolean = false;
  selectedPokemon?: Datum;
  private modal?: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.pokemonsState.loadPokemons();
    this.subscribeToSearch();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('pokemonDetailModal');
      if (modalElement) {
        this.modal = new bootstrap.Modal(modalElement, {
          backdrop: 'static',
          keyboard: false,
        });
        modalElement.addEventListener('hidden.bs.modal', () => {
          this.selectedPokemon = undefined; // Limpia al cerrar
        });
      }
    }
  }

  state = toSignal(this.pokemonsState.state$, {
    initialValue: this.pokemonsState.getState(),
  });

  private subscribeToSearch() {
    this.searchService.searchTerm$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        if (term.trim()) {
          this.isSearching = true;
          this.pokemonsState.searchPokemon(term);
        } else {
          this.isSearching = false;
          this.pokemonsState.resetSearch();
        }
      });
  }

  nextPage() {
    this.pokemonsState.nextPage();
  }

  previousPage() {
    this.pokemonsState.previousPage();
  }

  onPokemonSelected(pokemon: Datum) {
    this.selectedPokemon = pokemon;
    setTimeout(() => this.modal?.show(), 0); // Asegura que el modal existe antes de mostrarlo
  }

  trackById(index: number, pokemon: Datum): number {
    return pokemon?.idPokemon ?? index;
  }
}
