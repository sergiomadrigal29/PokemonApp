import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Datum } from '../../../shared/interface/pokemon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
})
export class PokemonCardComponent {
  @Input() pokemon!: Datum;
  @Output() pokemonSelected = new EventEmitter<Datum>();

  onSelectPokemon() {
    this.pokemonSelected.emit(this.pokemon); // Emitir el Pokémon seleccionado
  }

  getTipoIcono(tipo: string): string {
    const icons = {
      Acero: 'fas fa-shield-alt',
      Agua: 'fas fa-droplet',
      Bicho: 'fas fa-bug',
      Dragon: 'fas fa-dragon',
      Electrico: 'fas fa-bolt',
      Fantasma: 'fas fa-ghost',
      Fuego: 'fas fa-fire',
      Hada: 'fas fa-star',
      Hielo: 'fas fa-snowflake',
      Lucha: 'fas fa-fist-raised',
      Normal: 'fas fa-circle',
      Planta: 'fas fa-leaf',
      Psiquico: 'fas fa-brain',
      Roca: 'fas fa-mountain',
      Siniestro: 'fas fa-skull-crossbones',
      Tierra: 'fas fa-mountain',
      Veneno: 'fas fa-skull-crossbones',
      Volador: 'fas fa-feather',
    };
    return icons[tipo as keyof typeof icons] || 'fas fa-question';
  }

  getTipoColor(tipo: string): string {
    const colors = {
      Acero: { primary: '#B7B7CE', secondary: '#A8A8C0' }, // Gris metálico
      Agua: { primary: '#6390F0', secondary: '#5073C7' }, // Azul claro
      Bicho: { primary: '#A6B91A', secondary: '#8A9C16' }, // Verde amarillento
      Dragon: { primary: '#6F35FC', secondary: '#5527C7' }, // Morado vibrante
      Electrico: { primary: '#F7D02C', secondary: '#C7A520' }, // Amarillo brillante
      Fantasma: { primary: '#735797', secondary: '#5A456E' }, // Púrpura oscuro
      Fuego: { primary: '#EE8130', secondary: '#C76A26' }, // Naranja intenso
      Hada: { primary: '#D685AD', secondary: '#B0688C' }, // Rosa pastel
      Hielo: { primary: '#96D9D6', secondary: '#78B9B7' }, // Azul hielo
      Lucha: { primary: '#C22E28', secondary: '#9B2320' }, // Rojo fuerte
      Normal: { primary: '#A8A77A', secondary: '#8C8C60' }, // Beige/gris neutro
      Planta: { primary: '#7AC74C', secondary: '#639E3E' }, // Verde brillante
      Psiquico: { primary: '#F95587', secondary: '#C43E68' }, // Rosa intenso
      Roca: { primary: '#B6A136', secondary: '#938028' }, // Amarillo arena
      Siniestro: { primary: '#705746', secondary: '#574135' }, // Marrón oscuro
      Tierra: { primary: '#E2BF65', secondary: '#B5974F' }, // Marrón claro
      Veneno: { primary: '#A33EA1', secondary: '#812F7F' }, // Púrpura venenoso
      Volador: { primary: '#A98FF3', secondary: '#8870C4' }, // Azul lavanda
    };
    const color = colors[tipo as keyof typeof colors] || {
      primary: '#CCCCCC',
      secondary: '#999999',
    };
    return `linear-gradient(145deg, ${color.primary} 0%, ${color.secondary} 100%)`;
  }
}
