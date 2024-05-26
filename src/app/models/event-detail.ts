import { EventDetailDTO } from '../interfaces/event-dto.interface';
import { Event } from './event';
import { Session } from './session';

export class EventDetail {
  public event: Event;
  public sessions: Array<Session>;

  constructor({ event, sessions }: EventDetailDTO) {
    this.event = new Event(event);
    this.sessions = sessions.map((session) => new Session(session));
  }
}
