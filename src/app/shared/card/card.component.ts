import { Component, InputSignal, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Event } from '../../models/event';

@Component({
  standalone: true,
  selector: 'gt-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  imports: [DatePipe],
})
export class CardComponent {
  event: InputSignal<Event> = input.required();
}
