import { Injectable } from '@angular/core';
import { PokemonResponse } from '../../interfaces/pokemon/pokemon';
import { GlobalHttpService } from '../global/global.service';
import { Pagination } from '../../interfaces/pagination/pagination.interface';
import { POKEMON_ROUTES } from '../../routes/pokemon/pokemon.routes';
import { RequestMethod } from '../../enum/httpsRequest/httpsRequest.enum';

@Injectable({
  providedIn: 'root'
})
export class PokemonService extends GlobalHttpService {

  async getPokemonAll(payload?: Pagination): Promise<PokemonResponse> {
    return await this.makeHttpRequest<PokemonResponse>(POKEMON_ROUTES.pokeAll(payload?.page, payload?.limit, payload?.order), {}, RequestMethod.GET);
  }

  async getPokemonSearch(term: string, payload?: Pagination): Promise<PokemonResponse> {
    return await this.makeHttpRequest<PokemonResponse>(POKEMON_ROUTES.pokeSearch(term, payload?.page, payload?.limit), {}, RequestMethod.GET);
  }

}
