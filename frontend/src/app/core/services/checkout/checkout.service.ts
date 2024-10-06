import { Injectable } from '@angular/core';
import { GlobalHttpService } from '../global/global.service';
import { RequestMethod } from '../../enum/httpsRequest/httpsRequest.enum';
import { CHECKOUT_ROUTES } from '../../routes/checkout/checkout.routes';
import { Checkout, CheckoutPayload } from '../../interfaces/checkout/checkout';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService extends GlobalHttpService {

  async createTransaction(payload: CheckoutPayload): Promise<Checkout> {
    return this.makeRequest<Checkout, CheckoutPayload>(CHECKOUT_ROUTES.checkout, payload, RequestMethod.POST);
  }



}
