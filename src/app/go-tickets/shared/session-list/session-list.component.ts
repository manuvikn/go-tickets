import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  inject,
  input,
} from '@angular/core';
import { EventDetail } from '../../models/event-detail';
import { DatePipe } from '@angular/common';
import { CounterComponent } from '../../utils/components/counter/counter.component';
import { Session } from '../../models/session';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { SessionsMap } from '../../interfaces/shopping-cart.interface';

@Component({
  standalone: true,
  selector: 'gt-session-list',
  templateUrl: './session-list.component.html',
  styles: `

  .session-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1em;

      .date-block {
          margin: 0px;

          strong {
              color: var(--primary-text-color);
          }
      }
  }

  .error-message {
    margin: 0px;
  }

  `,
  imports: [DatePipe, CounterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionListComponent {
  eventDetail: InputSignal<EventDetail | undefined> = input();
  sessionsMap: InputSignal<SessionsMap | undefined> = input(
    {} as SessionsMap | undefined,
    {
      transform: (val) => val ?? {},
    }
  );

  // PROVIDERS
  private _shoppingCartService: ShoppingCartService =
    inject(ShoppingCartService);

  updateShoppingCart({ sum }: { sum: boolean }, session: Session): void {
    if (!this.eventDetail()?.event?.id) return;

    this._shoppingCartService.updateSessionsAmount(
      sum,
      session.date.getTime().toString(),
      this.eventDetail()?.event.id!,
      this.eventDetail()?.event.title
    );
  }
}
