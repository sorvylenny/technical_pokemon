import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  parking$: any;

  constructor(public _storage: StorageMap) { }
  async getStorage(key: string) {
    return await lastValueFrom(
      this._storage.get(`${environment.appName}-${key}`),
    );
  }
  async setStorage(key: string, value: object | string | number | boolean) {
    await lastValueFrom(
      this._storage.set(`${environment.appName}-${key}`, value),
    );
  }
  async deleteStorage(key: string) {
    await lastValueFrom(
      this._storage.delete(`${environment.appName}-${key}`),
    );
  }
  async hasStorage(key: string) {
    return await lastValueFrom(this._storage.has(`${environment.appName}-${key}`));
  }
  watchStorage(key: string) {
    return this._storage.watch(`${environment.appName}-${key}`);
  }

  async clearAllStorage() {
    await lastValueFrom(this._storage.clear());
  }

}
