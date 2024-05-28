import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { BannerComponent } from '../../utils/components/banner/banner.component';
import { CatalogSectionComponent } from '../../shared/catalog-section/catalog-section.component';
import { CatalogGridComponent } from '../../shared/catalog-grid/catalog-grid.component';
import { EventsService } from '../../services/events.service';
import { Observable, combineLatestWith, map } from 'rxjs';
import { Event } from '../../models/event';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  templateUrl: './catalog-page.component.html',
  styles: ``,
  selector: 'gt-catalog-page',
  imports: [
    BannerComponent,
    CatalogSectionComponent,
    CatalogGridComponent,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogPageComponent implements OnInit {
  // PROVIDERS
  private _eventsService: EventsService = inject(EventsService);

  // OBSERVABLES
  eventList$: Observable<Array<Event>> | undefined;
  filterEventsByPrompt$: Observable<string> =
    this._eventsService.getFilterEvents$();

  ngOnInit(): void {
    this.eventList$ = this._eventsService.getEvents$().pipe(
      combineLatestWith(this.filterEventsByPrompt$),
      map(([o1, o2]) =>
        o1
          // FILTERING BY THE SEARCH PROMPT
          .filter(
            (event) =>
              event.title?.toLowerCase().includes(o2) ||
              event.subtitle?.toLowerCase().includes(o2) ||
              event.description?.toLowerCase().includes(o2) ||
              event.place?.toLowerCase().includes(o2)
          )
          // SORTING EVENTS BY END DATE ASC
          .sort(
            ({ endDate: a }, { endDate: b }) =>
              (a?.getTime() || 0) - (b?.getTime() || 0)
          )
      )
    );
  }
}
