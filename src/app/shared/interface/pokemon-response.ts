export interface PokemonResponse {
  success: boolean;
  message: string;
  data: {
    exactMatch: ExactMatch;
    sugerencias: Sugerencia[];
    totalSugerencias: number;
  };
  totalCount: number;
}

export interface ExactMatch {
  idPokemon: number;
  name: string;
  description: string;
  imagenUrl: string;
  tipos: string[];
  habilidades: string[];
}

export interface Sugerencia {
  idPokemon: number;
  name: string;
  description: string;
  imagenUrl: string;
  tipos: string[];
  habilidades: string[];
}
