import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemesService } from '../../../services/themes.service';

@Component({
  standalone: true,
  selector: 'gt-theme-toggle',
  template: `
    @if ( isLightTheme$ | async ) {
    <button
      (click)="changeTheme(false)"
      class="btn theme-toggle-button animation__fadeIn"
    >
      <i class="bi bi-moon-fill"></i>
    </button>
    } @else {
    <button
      (click)="changeTheme(true)"
      class="btn theme-toggle-button animation__fadeIn"
    >
      <i class="bi bi-brightness-low-fill" style="font-size: 20px"></i>
    </button>
    }
  `,
  styles: `
    .theme-toggle-button {
        padding: 5px;
        transition: padding 500ms, filter 500ms;
        i {
            display: flex;
            height: 24px;
            width: 24px;
            align-items: center;
            justify-content: center;
            transition: font-size 500ms;
        }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
})
export class ThemeToggleComponent {
  // PROVIDERS
  _themesService: ThemesService = inject(ThemesService);

  // OBSERVABLES
  isLightTheme$: Observable<boolean> = this._themesService.getIsLightTheme$();

  changeTheme(isLightTheme: boolean): void {
    this._themesService.updateIsLightTheme(isLightTheme);
  }
}
