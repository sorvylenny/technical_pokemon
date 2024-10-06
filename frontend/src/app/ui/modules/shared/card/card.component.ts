import { Pokemon } from '@/app/core/interfaces/pokemon/pokemon';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() pokemon!: Pokemon;
  @Output() buyEvent = new EventEmitter<Pokemon>();
  @Output() onRemove: EventEmitter<Pokemon> = new EventEmitter();
  @Input() isSmallCard: boolean = false;
  @Input() isInCart: boolean = false;

  buyCard(pokemon: Pokemon): void {
    this.buyEvent.emit(pokemon);
  }
  removeCard(pokemon: Pokemon): void {
    this.onRemove.emit(pokemon);
  }
}
