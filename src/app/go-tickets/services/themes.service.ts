import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  // PROVIDERS
  private _document: Document = inject(DOCUMENT);

  // OBSERVABLES
  private isLightTheme$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  getIsLightTheme$(): Observable<boolean> {
    return this.isLightTheme$.asObservable().pipe(
      // ADDING OR REMOVING DARK THEME DEPENDING ON THE OBSERVABLE VALUE
      tap((isLightTheme: boolean) =>
        this._document.body.classList[isLightTheme ? 'remove' : 'add'](
          'dark-theme'
        )
      )
    );
  }

  updateIsLightTheme(isLightTheme: boolean): void {
    this.isLightTheme$.next(isLightTheme);
  }
}
