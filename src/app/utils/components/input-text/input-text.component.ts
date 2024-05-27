import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  InputSignal,
  OnDestroy,
  Output,
  Signal,
  input,
  viewChild,
} from '@angular/core';
import { Subscription, debounceTime, fromEvent, map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'gt-input-text',
  template: `
    <input
      #inputEl
      class="searchbar"
      type="text"
      [placeholder]="placeholder()"
    />
  `,
  styles: `
    :host {
        display: flex;
        flex-grow: 1;
    }
    .searchbar {
        flex-grow: 1;
        padding: 1em;
        border-radius: var(--border-radius);
        background: var(--primary-color);
        border: none;
        box-shadow: inset var(--box-shadow);
        color: var(--white);
        transition: padding 500ms, transform 200ms;

        &::placeholder {
            color: var(--white);
        }

        &::-ms-input-placeholder {
            color: var(--white);
        }

        &:focus,
        &:focus-visible,
        &:focus-within {
            outline: 2px solid var(--primary-text-color);
            transform: translateY(-2px);
        }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent implements AfterViewInit, OnDestroy {
  placeholder: InputSignal<string> = input('');
  inputEl: Signal<ElementRef | undefined> = viewChild('inputEl', {
    read: ElementRef,
  });

  inputEventSubscription: Subscription | undefined;
  @Output() inputEvent: EventEmitter<string> = new EventEmitter();

  ngAfterViewInit(): void {
    this.inputEventSubscription = fromEvent(
      this.inputEl()?.nativeElement,
      'input'
    )
      .pipe(
        map(({ target: { value } }: any) => value),
        debounceTime(400)
      )
      .subscribe(this._emitInputEvent.bind(this));
  }

  private _emitInputEvent(prompt: string): void {
    this.inputEvent.emit(prompt);
  }

  ngOnDestroy(): void {
    this.inputEventSubscription?.unsubscribe();
  }
}
