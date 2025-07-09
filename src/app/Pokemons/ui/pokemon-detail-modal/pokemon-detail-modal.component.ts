import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Datum } from '../../../shared/interface/pokemon';

@Component({
  selector: 'app-pokemon-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail-modal.component.html',
  styleUrls: ['./pokemon-detail-modal.component.css'],
})
export class PokemonDetailModalComponent {
  @Input() selectedPokemon?: Datum;

  getTypeGradient(tipos: string[]): string {
    if (!tipos.length) {
      return 'linear-gradient(135deg, #eee, #ddd)';
    }

    const typeColors: {
      [key: string]: { primary: string; secondary: string };
    } = {
      Acero: { primary: '#B7B7CE', secondary: '#A8A8C0' },
      Agua: { primary: '#6390F0', secondary: '#5073C7' },
      Bicho: { primary: '#A6B91A', secondary: '#8A9C16' },
      Dragon: { primary: '#6F35FC', secondary: '#5527C7' },
      Electrico: { primary: '#F7D02C', secondary: '#C7A520' },
      Fantasma: { primary: '#735797', secondary: '#5A456E' },
      Fuego: { primary: '#EE8130', secondary: '#C76A26' },
      Hada: { primary: '#D685AD', secondary: '#B0688C' },
      Hielo: { primary: '#96D9D6', secondary: '#78B9B7' },
      Lucha: { primary: '#C22E28', secondary: '#9B2320' },
      Normal: { primary: '#A8A77A', secondary: '#8C8C60' },
      Planta: { primary: '#7AC74C', secondary: '#639E3E' },
      Psiquico: { primary: '#F95587', secondary: '#C43E68' },
      Roca: { primary: '#B6A136', secondary: '#938028' },
      Siniestro: { primary: '#705746', secondary: '#574135' },
      Tierra: { primary: '#E2BF65', secondary: '#B5974F' },
      Veneno: { primary: '#A33EA1', secondary: '#812F7F' },
      Volador: { primary: '#A98FF3', secondary: '#8870C4' },
    };

    const primary = typeColors[tipos[0]]?.primary || '#ddd';
    const secondary = typeColors[tipos[0]]?.secondary || '#bbb';

    return `linear-gradient(135deg, ${primary}, ${secondary})`;
  }

  getTypeColor(tipo: string): string {
    const typeColors: { [key: string]: string } = {
      Acero: '#B7B7CE',
      Agua: '#6390F0',
      Bicho: '#A6B91A',
      Dragon: '#6F35FC',
      Electrico: '#F7D02C',
      Fantasma: '#735797',
      Fuego: '#EE8130',
      Hada: '#D685AD',
      Hielo: '#96D9D6',
      Lucha: '#C22E28',
      Normal: '#A8A77A',
      Planta: '#7AC74C',
      Psiquico: '#F95587',
      Roca: '#B6A136',
      Siniestro: '#705746',
      Tierra: '#E2BF65',
      Veneno: '#A33EA1',
      Volador: '#A98FF3',
    };

    return typeColors[tipo] || '#aaa';
  }
}
