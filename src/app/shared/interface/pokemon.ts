export interface Pokemon {
  idPokemon: number;
  success: boolean;
  message: string | null;
  data: Datum[];
  totalCount: number;
}

export interface Datum {
  idPokemon: number;
  name: string;
  imagenUrl: string;
  tipos: string[];
  description: string;
  habilidades: string[];
}
