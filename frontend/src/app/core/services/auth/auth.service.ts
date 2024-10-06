import { Injectable } from '@angular/core';
import { GlobalHttpService } from '../global/global.service';
import { AUTH_ROUTES } from '../../routes/auth/auth.routes';
import { LoginResponse } from '../../interfaces/login/login';
import { catchError, from, lastValueFrom, map } from 'rxjs';
import { RequestMethod } from '../../enum/httpsRequest/httpsRequest.enum';
import { Register } from '../../interfaces/register/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends GlobalHttpService {
  async login(payload: { email: string; password: string }): Promise<LoginResponse> {
    const response = await this.makeHttpRequest<LoginResponse>(AUTH_ROUTES.login, payload, RequestMethod.POST);

    await this.setStorage('token', response.token);
    await this.setStorage('user', response.user);
    return response;
  }
  async register(payload: Register): Promise<LoginResponse> {
    const response = await this.makeHttpRequest<LoginResponse>(AUTH_ROUTES.register, payload, RequestMethod.POST);
    await this.setStorage('token', response.token);
    await this.setStorage('user', response.user);
    return response;
  }
}
