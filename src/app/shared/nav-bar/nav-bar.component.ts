import { AsyncPipe, DOCUMENT, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, debounceTime, fromEvent, map } from 'rxjs';
import { InputTextComponent } from '../../utils/components/input-text/input-text.component';

@Component({
  standalone: true,
  selector: 'gt-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: 'nav-bar.component.scss',
  imports: [NgClass, AsyncPipe, RouterLink, InputTextComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  // PROVIDERS
  private _document: Document = inject(DOCUMENT);

  // VARIABLES
  title: InputSignal<string> = input('');

  decreaseNavbar$: Observable<boolean> = fromEvent(
    this._document,
    'scroll'
  ).pipe(
    debounceTime(100),
    map(
      ({
        target: {
          scrollingElement: { scrollTop },
        },
      }: any) => scrollTop > 300
    )
  );

  onInputEvent(prompt: string): void {
    console.log(prompt);
  }
}
