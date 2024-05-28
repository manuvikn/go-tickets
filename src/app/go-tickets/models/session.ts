import { SessionDTO } from '../interfaces/event-dto.interface';

export class Session {
  public date: Date;
  public availabiltiy: number;

  constructor({ date, availability }: SessionDTO) {
    this.availabiltiy = Number(availability);
    this.date = new Date(Number(date));
  }
}
