import { Injectable } from '@angular/core';
import { GlobalHttpService } from '../global/global.service';
import { RequestMethod } from '../../enum/httpsRequest/httpsRequest.enum';
import { DASHBOARD_ROUTES } from '../../routes/dashboard/dashboard.routes';
import { DailySales, MonthlySales, PokemonDashboard } from '../../interfaces/checkout/dashboard';
import { Pagination } from '../../interfaces/pagination/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends GlobalHttpService {

  async morePokemonSales(payload: Pagination): Promise<PokemonDashboard> {
    return this.makeHttpRequest<PokemonDashboard>(DASHBOARD_ROUTES.pokemonMoreSales(payload?.page, payload?.limit), RequestMethod.GET);
  }
  async salesByDay(): Promise<DailySales> {
    return this.makeHttpRequest<DailySales>(DASHBOARD_ROUTES.pokemonSalesByDay, RequestMethod.GET);
  }

  async salesMonth(): Promise<MonthlySales> {
    return this.makeHttpRequest<MonthlySales>(DASHBOARD_ROUTES.pokemonSalesByMonth, RequestMethod.GET);
  }

}
