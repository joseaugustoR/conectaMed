export interface CalendarEvent {
    id: string;
    summary: string;
    start: {
      dateTime?: string;
      date?: string;
    };
    end: {
      dateTime?: string;
      date?: string;
    };
    // Adicione outros campos conforme necessário
  }
  