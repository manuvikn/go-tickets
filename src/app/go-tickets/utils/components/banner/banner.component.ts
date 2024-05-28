import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  input,
} from '@angular/core';

@Component({
  standalone: true,
  template: `
    <h1>{{ title() }}</h1>
    @if (subtitle()) {
    <p>{{ subtitle() }}</p>
    }
  `,
  styles: `
  :host {

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    padding: 1em;

    h1, p {
        margin: 0px;
        text-align: center;
    }

  }
  `,
  selector: 'gt-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {
  title: InputSignal<string> = input.required();
  subtitle: InputSignal<string> = input('');
}
