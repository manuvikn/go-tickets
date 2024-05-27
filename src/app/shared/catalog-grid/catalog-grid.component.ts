import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  input,
} from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Event } from '../../models/event';

@Component({
  standalone: true,
  selector: 'gt-catalog-grid',
  template: `
    @if (eventList().length) {
    <div class="catalog-grid">
      @for (event of eventList(); track $index) {
      <gt-card [event]="event"></gt-card>
      }
    </div>
    } @else {
    <h2 class="no-results-text">
      Oops! No events match your search. Try again with different terms.
    </h2>
    }
  `,
  styles: `
  .catalog-grid {
    display: grid;
    grid-template-columns: var(--grid-columns);
    gap: 2em;
    justify-content: center;
    align-content: center;
  }

  .no-results-text {
    text-align: center;
  }
  `,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogGridComponent {
  eventList: InputSignal<Array<Event>> = input([] as Event[]);
}
