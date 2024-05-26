import { Component, InputSignal, input } from '@angular/core';

@Component({
  selector: 'gt-title',
  standalone: true,
  template: ` <h2>{{ title() }}</h2>
    <hr />`,
  styles: `
  h2 {
    margin: 0.5em 0px;
  }
  hr {
    height: 0.3em;
    background: var(--primary-color);
    border: none;
    width: 2em;
    margin: 0px;
  }
  `,
})
export class TitleComponent {
  title: InputSignal<string> = input.required();
}
