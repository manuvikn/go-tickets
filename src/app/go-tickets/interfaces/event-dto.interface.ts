export interface EventDTO {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  place: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface SessionDTO {
  date: string;
  availability: string;
}

export interface EventDetailDTO {
  event: EventDTO;
  sessions: Array<SessionDTO>;
}
