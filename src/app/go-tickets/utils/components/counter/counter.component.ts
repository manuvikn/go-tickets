import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  InputSignal,
  Output,
  input,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'gt-counter',
  template: `
    <div class="buttons-container">
      <button
        [ngClass]="{ disabled: value() <= min() }"
        (click)="onButtonClick(false)"
        class="minus-button"
      >
        -
      </button>
      <span class="value">{{ value() }}</span>
      <button
        [ngClass]="{ disabled: max() ? value() >= max()! : false }"
        (click)="onButtonClick()"
        class="plus-button"
      >
        +
      </button>
    </div>
  `,
  styles: `
    .buttons-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1em;

        button {
            border: none;
            margin: 0px;
            border-radius: 50%;
            width: 2em;
            height: 2em;
            color: var(--white);
            background: var(--primary-color);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            font-weight: 800;
            line-height: 0;
            transition: filter 200ms, background 200ms;

            &:hover {
                filter: brightness(0.8);
            }
        }

        .value {
            color: var(--primary-text-color);
            font-weight: 500;
            width: 2em;
            text-align: center;
        }
    }

    .disabled {
        cursor: default;
        filter: brightness(1.8);
        pointer-events: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
})
export class CounterComponent {
  max: InputSignal<number | undefined> = input();
  min: InputSignal<number> = input(0);
  value: InputSignal<number> = input(0, {
    transform: (val) => val ?? 0,
  });

  @Output() buttonClick: EventEmitter<{ sum: boolean }> = new EventEmitter();

  onButtonClick(plus: boolean = true): void {
    this.buttonClick.emit({ sum: plus });
  }
}
