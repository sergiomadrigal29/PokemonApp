import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pokemon, Datum } from '../../shared/interface/pokemon';
import { BaseHttpPokemonService } from '../../shared/data-access/base-http-pokemon.service';
import {
  PokemonResponse,
  ExactMatch,
  Sugerencia,
} from '../../shared/interface/pokemon-response';

// PokemonService: Encargado de hacer las peticiones a la API
@Injectable({
  providedIn: 'root',
})
export class PokemonService extends BaseHttpPokemonService {
  // 🔄 Obtiene la lista de Pokémon para la página especificada
  getPokemons(page: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/listar?page=${page}`).pipe(
      map((response) => ({
        ...response,
        data: response.data.map((pokemon, index) => ({
          idPokemon: pokemon.idPokemon ?? index + page * 20,
          name: pokemon.name,
          imagenUrl: pokemon.imagenUrl ?? 'assets/default-pokemon.png',
          tipos: pokemon.tipos ?? [],
          description: pokemon.description ?? 'Sin descripción',
          habilidades: pokemon.habilidades ?? [],
        })),
      }))
    );
  }

  // 🔎 Busca un Pokémon por nombre con coincidencia exacta y sugerencias
  getPokemonByName(name: string): Observable<{
    success: boolean;
    message: string;
    data: ExactMatch | null;
    sugerencias: Sugerencia[];
    totalSugerencias: number;
    totalCount: number;
  }> {
    return this.http.get<PokemonResponse>(`${this.apiUrl}/buscar/${name}`).pipe(
      map((response) => {
        const { exactMatch, sugerencias, totalSugerencias } = response.data;
        return {
          success: response.success,
          message: response.message,
          data: exactMatch || null,
          sugerencias: sugerencias,
          totalSugerencias: totalSugerencias,
          totalCount: response.totalCount,
        };
      })
    );
  }
}
