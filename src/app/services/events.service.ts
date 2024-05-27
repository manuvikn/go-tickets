import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Event } from '../models/event';
import { EventDTO, EventDetailDTO } from '../interfaces/event-dto.interface';
import { EventDetail } from '../models/event-detail';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  // CONSTANTS
  private readonly BASE_URL: string = '/assets/data/';

  // PROVIDERS
  private _httpClient: HttpClient = inject(HttpClient);

  // GET ALL THE EVENTS
  getEvents$(): Observable<Array<Event>> {
    return this._httpClient
      .get<EventDTO[]>(`${this.BASE_URL}events.json`)
      .pipe(
        map<EventDTO[], Event[]>((eventDtoList: EventDTO[]) =>
          eventDtoList.map((event) => new Event(event))
        )
      );
  }

  // GET EVENT DETAIL BY ID
  getEventInfo$(id: number): Observable<EventDetail> {
    return this._httpClient
      .get<EventDetailDTO>(`${this.BASE_URL}event-info-${id}.json`)
      .pipe(
        map<EventDetailDTO, EventDetail>(
          (event: EventDetailDTO) => new EventDetail(event)
        ),
        catchError((_) => {
          throw new Error('EVENT INFO NOT FOUND');
        })
      );
  }
}
