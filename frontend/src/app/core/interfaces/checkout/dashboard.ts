export interface DailySales {
  totalDailySales: number;
}

export interface MonthlySales {
  totalMonthlySales: number;
}

export interface PokemonDashboard {
  pokemonSales: {
    pokemons: PokemonDashboardResponse[];
    salesCounts: SalesCount[];
  };
}

export interface PokemonDashboardResponse {
  id: string;
  no: number;
  name: string;
  type: string;
  skill: string;
  price: number;
  imageUrl: string;
  sprite: string;
  createdAt: string;
  updatedAt: string;
}

export interface SalesCount {
  pokemonId: string;
  salesCount: string;
}
