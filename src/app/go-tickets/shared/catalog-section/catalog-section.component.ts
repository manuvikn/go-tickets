import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  inject,
  input,
} from '@angular/core';
import { TitleComponent } from '../../utils/components/title/title.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'gt-catalog-section',
  standalone: true,
  template: ` <div class="title-container">
      <gt-title [title]="title()"></gt-title>
      @if (hasButton()) {
      <button class="btn" (click)="onButtonClick()">{{ buttonLabel() }}</button>
      }
    </div>
    <ng-content></ng-content>`,
  styles: `
  :host {
    display: flex;
    flex-direction: column;
    gap: 2em;
  }

  .title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    flex-wrap: wrap;
  }
  `,
  imports: [TitleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogSectionComponent {
  // VARIABLES
  title: InputSignal<string> = input.required();
  hasButton: InputSignal<boolean> = input(false);
  buttonLabel: InputSignal<string> = input('');
  redirectTo: InputSignal<string> = input('');

  // PROVIDERS
  private _router: Router = inject(Router);
  private _route: ActivatedRoute = inject(ActivatedRoute);

  onButtonClick(): void {
    this._router.navigate([`../${this.redirectTo()}`], {
      relativeTo: this._route,
    });
  }
}
