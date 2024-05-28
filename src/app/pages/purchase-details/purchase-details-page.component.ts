import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { CatalogSectionComponent } from '../../shared/catalog-section/catalog-section.component';
import { EventsService } from '../../services/events.service';
import Swal from 'sweetalert2';
import { Observable, catchError, map, of } from 'rxjs';
import { SessionListComponent } from '../../shared/session-list/session-list.component';
import { EventDetail } from '../../models/event-detail';
import { AsyncPipe, NgIf } from '@angular/common';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../interfaces/shopping-cart.interface';
import { ShoppingCartComponent } from '../../utils/components/shopping-cart/shopping-cart.component';

@Component({
  standalone: true,
  selector: 'gt-purchase-details-page',
  templateUrl: './purchase-details-page.component.html',
  styles: `
    .grid {
        display: grid;
        grid-template-columns: var(--grid-columns);
        gap: 2em;
    }
  `,
  imports: [
    CatalogSectionComponent,
    SessionListComponent,
    ShoppingCartComponent,
    AsyncPipe,
    NgIf,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchaseDetailsPageComponent implements OnInit {
  // PROVIDERS
  private _router: Router = inject(Router);
  private _eventsService: EventsService = inject(EventsService);
  private _shoppingCartService: ShoppingCartService =
    inject(ShoppingCartService);

  // VARIABLES
  eventId: WritableSignal<number | undefined> = signal(undefined);

  // OBSERVABLES
  eventDetail$: Observable<EventDetail> | undefined;
  shoppingCart$: Observable<ShoppingCart> =
    this._shoppingCartService.getShoppingCart$();
  hasShoppingCart$: Observable<boolean> = this.shoppingCart$.pipe(
    map((cart) => !!Object.keys(cart).length)
  );

  constructor() {
    const { eventId = 0 } = this._router.getCurrentNavigation()?.extras
      .state as {
      eventId: string;
    };
    this.eventId.set(Number(eventId));
  }

  ngOnInit(): void {
    this._initComponent();
  }

  // INIT THE COMPONENT AND MANAGING EXCEPTIONS
  private _initComponent(): void {
    if (!this.eventId()) this.errorAlert();

    this.eventDetail$ = this._eventsService
      .getEventInfo$(this.eventId() as number)
      .pipe(
        // SORTING SESSIONS BY DATE ASC
        map((eventDetail: EventDetail) => {
          eventDetail.sessions.sort(
            ({ date: a }, { date: b }) =>
              (a?.getTime() || 0) - (b?.getTime() || 0)
          );
          return eventDetail;
        }),
        // DISPLAYING ERROR ALERT WHEN NO FOUND DATA
        catchError((e) => {
          this.errorAlert(e.message);
          return of(null);
        })
      ) as Observable<EventDetail>;
  }

  // REMOVING SESSIONS BY CLICKING ON TRASH BUTTON
  onRemoveSession({
    sessionId,
    eventId,
  }: {
    sessionId: string;
    eventId: string;
  }): void {
    if (!this.eventId()?.toString()) return;

    this._shoppingCartService.updateSessionsAmount(false, sessionId, eventId);
  }

  // SHOW ERROR ALERT
  errorAlert(errorMessage = undefined) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      showCancelButton: true,
      text: errorMessage ?? 'Something went wrong!',
      confirmButtonText: 'Ok',
      cancelButtonText: 'Go to catalog',
    }).then(({ isConfirmed }) => {
      if (!isConfirmed) this._router.navigate(['/']);
    });
  }
}
