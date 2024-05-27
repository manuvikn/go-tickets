import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  input,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Event } from '../../models/event';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'gt-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  imports: [DatePipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  event: InputSignal<Event> = input.required();
}
