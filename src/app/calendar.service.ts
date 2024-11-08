import { Injectable } from '@angular/core';
import { gapi } from 'gapi-script';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  async initClient(): Promise<void> {
    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', () => {
        gapi.auth2.init({
          client_id: 'http://1032872153081-1q16c3t3iglpga76fq34hjm14r93p5ft.apps.googleusercontent.com',
        }).then(() => {
          gapi.client.init({
            apiKey: 'AIzaSyDpNMIEHPp1cbWtRMF0oxBE1UxSM-7wA8g',
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
          }).then(() => {
            resolve();
          }, (error) => {
            console.error("Erro ao inicializar o cliente gapi:", error);
            reject(error);
          });
        }, (error) => {
          console.error("Erro ao inicializar gapi.auth2:", error);
          reject(error);
        });
      });
    });
  }

  async getEvents(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.initClient();
        const calendar = (gapi.client as any).calendar;

        if (calendar) {
          const response = await calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime'
          });
          resolve(response.result.items || []);
        } else {
          reject('Calendar API not loaded');
        }
      } catch (error) {
        console.error('Erro ao autenticar ou carregar eventos:', error);
        reject(error);
      }
    });
  }
}
