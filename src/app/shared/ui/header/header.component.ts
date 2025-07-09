import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonsStateService } from '../../../Pokemons/data-access/pokemons-state.service';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  searchTerm: string = '';

  constructor(private searchService: SearchService) {}

  onSearchChange() {
    this.searchService.setSearchTerm(this.searchTerm.trim());
  }

  clearSearch() {
    this.searchTerm = '';
    this.onSearchChange();
  }
}
