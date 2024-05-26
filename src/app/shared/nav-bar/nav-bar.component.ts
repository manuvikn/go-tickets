import { AsyncPipe, DOCUMENT, NgClass } from '@angular/common';
import { Component, Signal, inject, signal } from '@angular/core';
import { Observable, debounceTime, fromEvent, map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'gt-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: 'nav-bar.component.scss',
  imports: [NgClass, AsyncPipe],
})
export class NavBarComponent {
  // PROVIDERS
  private _document: Document = inject(DOCUMENT);

  // VARIABLES
  decreaseNavbar$: Signal<Observable<boolean>> = signal(
    fromEvent(this._document, 'scroll').pipe(
      debounceTime(100),
      map(
        ({
          target: {
            scrollingElement: { scrollTop },
          },
        }: any) => scrollTop > 300
      )
    )
  );
}
