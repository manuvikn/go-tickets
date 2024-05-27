import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { Observable, filter, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
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
