import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'gt-go-tickets',
  templateUrl: './go-tickets.component.html',
  styleUrls: ['./styles/_index.scss', './go-tickets.component.scss'],
  host: {
    class: 'animation__fadeIn',
  },
})
export class GoTicketsComponent implements OnInit {
  // PROVIDERS
  private _router: Router = inject(Router);

  // OBSERVABLES
  hasSearchbar$: Observable<boolean> | undefined;

  // VARIABLES
  title: Signal<string> = signal('GoTickets');

  ngOnInit(): void {
    this.hasSearchbar$ = this._router.events.pipe(
      filter(({ type }) => type === 1),
      map(({ urlAfterRedirects: url }: any) => url === '/')
    );
  }
}
