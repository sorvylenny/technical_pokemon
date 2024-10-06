import { SharedComponentsImports } from '@/app/core/shared/shared.imports';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { Pokemon } from '@/app/core/interfaces/pokemon/pokemon';
import { StorageService } from '@/app/core/services/storage/storage.service';
import { NgStorageMethod } from '@/app/core/enum/ngStorage/ngStorage.enum';
import { PaymentComponent } from '../payment/payment.component';
import { CheckoutService } from '../../../../core/services/checkout/checkout.service';
import { User } from '@/app/core/interfaces/login/login';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [...SharedComponentsImports, CardComponent, PaymentComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  pokemonRes: Pokemon[] = [];
  totalPrice: number = 0;
  isPaymentDialogVisible: boolean = false;
  user = {} as User;
  noCardsSelected: boolean = false;

  constructor(
    private _storageService: StorageService,
    private checkoutService: CheckoutService
  ) {

  }
  ngOnInit(): void {
    this.getPokemons();
  }

  async getPokemons() {
    try {
      const storedPokemons = await this._storageService.getStorage(NgStorageMethod.POKEMON);
      this.pokemonRes = Array.isArray(storedPokemons) ? storedPokemons : [];
      this.user = await this._storageService.getStorage(NgStorageMethod.USER) as User;
      this.calculateTotal();


      this.noCardsSelected = this.pokemonRes.length === 0;
    } catch (error) {
      console.error('Error al obtener los Pokémon:', error);
      this.pokemonRes = [];
      this.noCardsSelected = true;
    }
  }
  calculateTotal() {
    if (Array.isArray(this.pokemonRes)) {
      this.totalPrice = this.pokemonRes.reduce((sum, poke) => sum + (poke.price || 0), 0);
    } else {
      this.totalPrice = 0;
    }
  }
  handleRemove(pokemon: Pokemon, i: number) {

    if (this.pokemonRes[i]?.id === pokemon.id) {
      this.pokemonRes.splice(i, 1);
      this._storageService.setStorage(NgStorageMethod.POKEMON, this.pokemonRes).then(() => {
        this.calculateTotal();
      })
    } else {
      console.warn('El Pokémon en el índice especificado no coincide con el Pokémon a eliminar:', pokemon);
    }

  }

  openPaymentDialog() {
    this.isPaymentDialogVisible = true;
  }

  closePaymentDialog($event: any) {
    console.log($event)
    this.isPaymentDialogVisible = false;
  }

  onSubmit() {
    const payload = {
      userId: this.user.id,
      pokemonsIds: this.pokemonRes.map(p => p.id),
    }
    try {
      const resutls = this.checkoutService.createTransaction(payload)
      console.log(resutls)
    } catch (error) {
      throw error
    }
  }
}
