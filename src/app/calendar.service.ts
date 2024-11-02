import { Injectable } from '@angular/core';
import { gapi } from 'gapi-script';
import { CalendarEvent } from './calendar-event.model'; // Ajuste o caminho

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  async getEvents(): Promise<CalendarEvent[]> { // Tipando o retorno
    return new Promise((resolve, reject) => {
      gapi.client.load('calendar', 'v3', async () => {
        try {
          const response = await gapi.client.calendar.events.list({
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime'
          });
          resolve(response.result.items || []); // Garante que seja um array
        } catch (error) {
          console.error('Erro ao buscar eventos:', error);
          reject(error);
        }
      });
    });
  }
}
