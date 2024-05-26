import { Component, InputSignal, input } from '@angular/core';
import { TitleComponent } from '../../utils/components/title/title.component';

@Component({
  selector: 'gt-catalog-section',
  standalone: true,
  template: ` <gt-title [title]="title()"></gt-title>
    <ng-content></ng-content>`,
  styles: `
  :host {
    display: flex;
    flex-direction: column;
    gap: 2em;
  }
  `,
  imports: [TitleComponent],
})
export class CatalogSectionComponent {
  title: InputSignal<string> = input.required();
}
