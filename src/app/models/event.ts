import { EventDTO } from '../interfaces/event-dto.interface';

export class Event {
  public id: string;
  public title: string;
  public subtitle: string;
  public image: string;
  public place: string | undefined;
  public startDate: Date | undefined;
  public endDate: Date | undefined;
  public description: string | undefined;

  constructor({
    id,
    title,
    subtitle,
    image,
    place,
    startDate,
    endDate,
    description,
  }: EventDTO) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.image = image;
    this.place = place;
    this.startDate = startDate ? new Date(Number(startDate)) : undefined;
    this.endDate = endDate ? new Date(Number(endDate)) : undefined;
    this.description = description;
  }
}
