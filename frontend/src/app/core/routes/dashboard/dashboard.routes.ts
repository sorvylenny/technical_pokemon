import { environment } from "@/environments/environments";

export const DASHBOARD_ROUTES = {
  pokemonMoreSales: (page?: number, limit?: number) => {
    let url = `${environment.api}/sales/top-selling-pokemons`,
      queryParams = [
        `page=${page}`,
        `limit=${limit}`,
      ].join('&');
    return `${url}?${queryParams}`
  },
  pokemonSalesByDay: `${environment.api}/sales/daily-sales`,
  pokemonSalesByMonth: `${environment.api}/sales/monthly-sales`,
}
