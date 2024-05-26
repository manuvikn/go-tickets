import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { BannerComponent } from '../../utils/components/banner/banner.component';
import { CatalogSectionComponent } from '../../shared/catalog-section/catalog-section.component';
import { CatalogGridComponent } from '../../shared/catalog-grid/catalog-grid.component';
import { EventsService } from '../../services/events.service';
import { Observable, map } from 'rxjs';
import { Event } from '../../models/event';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  templateUrl: './catalog-page.component.html',
  styleUrl: './catalog-page.component.scss',
  selector: 'gt-catalog-page',
  imports: [
    BannerComponent,
    CatalogSectionComponent,
    CatalogGridComponent,
    AsyncPipe,
  ],
})
export class CatalogPageComponent implements OnInit {
  // PROVIDERS
  private _eventsService: EventsService = inject(EventsService);

  // VARIABLES
  eventList$: WritableSignal<Observable<Array<Event>> | undefined> =
    signal(undefined);

  ngOnInit(): void {
    this.eventList$.set(
      this._eventsService.getEvents().pipe(
        // SORTING EVENTS BY END DATE ASC
        map((eventList: Array<Event>) =>
          eventList.sort(
            ({ endDate: a }, { endDate: b }) =>
              (a?.getTime() || 0) - (b?.getTime() || 0)
          )
        )
      )
    );
  }
}
