import { environment } from "@/environments/environments";


export const POKEMON_ROUTES = {
  pokeAll: (page?: number, limit?: number, order?: string) => {
    let url = `${environment.api}/pokemon/all`;
    const queryParams = [
      `page=${page}`,
      `limit=${limit}`,
      `order=${order}`
    ].join('&');
    return `${url}?${queryParams}`;
  },
  pokeSearch: (term: string, page?: number, limit?: number) => {
    let url = `${environment.api}/pokemon/search`;
    const queryParams = [
      term ? `term=${encodeURIComponent(term)}` : '',
      page !== undefined ? `page=${page}` : '',
      limit !== undefined ? `limit=${limit}` : ''
    ].filter(Boolean).join('&');

    return `${url}?${queryParams}`;
  }
}
