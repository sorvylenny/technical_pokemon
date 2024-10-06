import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, lastValueFrom, map } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { RequestMethod } from '../../enum/httpsRequest/httpsRequest.enum';
import { StorageMap } from '@ngx-pwa/local-storage';


@Injectable({
  providedIn: 'root',
})
export class GlobalHttpService extends StorageService {
  constructor(public _http: HttpClient, public override _storage: StorageMap, public _router: Router) {
    super(_storage);
  }
  public async getAuthHeaders(): Promise<HttpHeaders> {
    const token = await this.getStorage('token');
    if (token) {

      return new HttpHeaders().set('Authorization', `Bearer ${token}`);

    }
    return new HttpHeaders();
  }
  public async makeRequest<T, P>(route: string, payload: P, method: string = RequestMethod.GET): Promise<T> {
    return lastValueFrom(
      from(this.makeHttpRequest<T>(route, payload, method)).pipe(
        // eslint-disable-next-line
        map((res: any) => res),
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);
          throw error;
        })
      )
    );
  }
  public async makeHttpRequest<T>(
    url: string,
    options: unknown = {},
    method: string = RequestMethod.GET,
  ): Promise<T> {
    const headers = await this.getAuthHeaders();
    const requestOptions: object = method === RequestMethod.GET ? { headers } : { body: options, headers };
    return lastValueFrom(
      this._http.request<T>(method, url, requestOptions).pipe(
        map(response => response as T)
      )
    );
  }
}
