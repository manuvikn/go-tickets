import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  InputSignal,
  Output,
  input,
} from '@angular/core';
import { ShoppingCart } from '../../../interfaces/shopping-cart.interface';
import { DatePipe, JsonPipe, KeyValuePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'gt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe, KeyValuePipe, DatePipe],
})
export class ShoppingCartComponent {
  shoppingCart: InputSignal<ShoppingCart> = input({});

  @Output() removeSession: EventEmitter<{
    sessionId: string;
    eventId: string;
  }> = new EventEmitter();

  onRemoveSession(sessionId: string, eventId: string): void {
    this.removeSession.emit({ sessionId, eventId });
  }
}
