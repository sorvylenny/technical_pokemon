
export interface Pokemon {
  id: string;
  name: string;
  type: string;
  skill: string;
  price: number;
  imageUrl: string;
}


export interface PokemonResponse {
  total: number;
  page: number;
  totalPages: number;
  pokemon: Pokemon[];
}
