import { Injectable } from '@angular/core';
import { gapi } from 'gapi-script';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  clientId = '1032872153081-1q16c3t3iglpga76fq34hjm14r93p5ft.apps.googleusercontent.com';

  constructor() {
    this.loadGapi();
  }

  async loadGapi(): Promise<void> {
    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', () => {
        gapi.auth2
          .init({
            client_id: this.clientId,
            scope: 'https://www.googleapis.com/auth/calendar/'
          })
          .then(() => resolve())
          .catch((error: any) => {
            console.error('Erro ao inicializar o gapi.auth2:', error);
            reject(error);
          });
      });
    });
  }

  async signIn() {
    await this.loadGapi();
    return gapi.auth2.getAuthInstance().signIn();
  }

  async signOut() {
    await this.loadGapi();
    return gapi.auth2.getAuthInstance().signOut();
  }

  async isSignedIn(): Promise<boolean> {
    await this.loadGapi();
    return gapi.auth2.getAuthInstance().isSignedIn.get();
  }
}
