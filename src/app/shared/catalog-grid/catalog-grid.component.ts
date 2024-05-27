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
    <div class="catalog-grid">
      @for (event of eventList(); track $index) {
      <gt-card [event]="event"></gt-card>
      }
    </div>
  `,
  styles: `
  .catalog-grid {
    display: grid;
    grid-template-columns: var(--grid-columns);
    gap: 2em;
    justify-content: center;
    align-content: center;
  }
  `,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogGridComponent {
  eventList: InputSignal<Array<Event>> = input([] as Event[]);
}
