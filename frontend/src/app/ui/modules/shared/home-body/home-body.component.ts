import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { CommonModule } from '@angular/common';
import { PokemonService } from '@/app/core/services/pokemon/pokemon.service';
import { Pokemon } from '@/app/core/interfaces/pokemon/pokemon';
import { Router } from '@angular/router';
import { Order } from '@/app/core/enum/sort_Order/order.enum';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { StorageService } from '@/app/core/services/storage/storage.service';
import { NgxNotifierService } from 'ngx-notifier';
import { SearchResultsComponent } from '../../search-results/search-results.component';

@Component({
  selector: 'app-home-body',
  standalone: true,
  imports: [CardComponent, CommonModule, InfiniteScrollModule, SearchResultsComponent],
  templateUrl: './home-body.component.html',
  styleUrl: './home-body.component.scss'
})
export class HomeBodyComponent {
  pokemons: Pokemon[] = [];
  limit = 12;
  page = 1;
  order: Order = Order.ASC;
  pokemonCards: Pokemon[] = [];
  searchCount: number = 0;
  term: string = '';
  useSearch: boolean = false;
  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private _storageService: StorageService,
    private notifier: NgxNotifierService) { }

  ngOnInit(): void {
    this.loadPokemons();
    this.pokemonAddCard();
  }

  async pokemonAddCard() {
    this.pokemonCards = await this._storageService.getStorage('pokemon') as Pokemon[];
  }
  loadPokemons(): void {
    this.pokemonService.getPokemonAll({ page: this.page, limit: this.limit, order: this.order }).then((response) => {
      this.pokemons = response.pokemon;
    });
  }

  onScroll() {
    if (!this.useSearch) {
      this.limit += 100;
      this.loadPokemons();
    } else {
      this.limit += 12;
      this.onSearch(this.term);
    }

  }

  goToPokemon(pokemon: Pokemon): void {
    if (this.isPokemonInCart(pokemon)) {
      console.log('El pokemon ya existe en el carrito');
      this.notifier.createToast(`El Pokémon ${pokemon.name} ya está en el carrito!`, 'warning', 5000);
      return;
    }
    if (!Array.isArray(this.pokemonCards)) {
      this.pokemonCards = [];
    }
    this.pokemonCards = [...this.pokemonCards, pokemon];
    this._storageService.setStorage('pokemon', this.pokemonCards);
  }
  isPokemonInCart(pokemon: Pokemon): boolean {
    return Array.isArray(this.pokemonCards) && this.pokemonCards.some((p) => p.id === pokemon.id);
  }
  async onSearch(event: string) {
    this.term = event;
    this.useSearch = true;
    const response = await this.pokemonService.getPokemonSearch(this.term, { page: 1, limit: this.limit });
    this.pokemons = response.pokemon;
    this.searchCount = response.total;
  }


  clearFilter() {
    this.useSearch = false;
    this.term = '';
    this.searchCount = 0;
    this.page = 1;
    this.limit = 12;
    this.loadPokemons();
  }
  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
