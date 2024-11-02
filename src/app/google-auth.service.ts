import { Injectable } from '@angular/core';
import { gapi } from 'gapi-script';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private clientId = '1032872153081-1q16c3t3iglpga76fq34hjm14r93p5ft.apps.googleusercontent.com'; // Substitua pelo seu Client ID

  constructor() {
    this.loadGapi();
  }

  loadGapi() {
    gapi.load('client:auth2', () => {
      gapi.auth2.init({
        client_id: this.clientId,
        scope: 'https://www.googleapis.com/auth/calendar'
      });
    });
  }

  signIn() {
    return gapi.auth2.getAuthInstance().signIn();
  }

  signOut() {
    return gapi.auth2.getAuthInstance().signOut();
  }

  isSignedIn() {
    return gapi.auth2.getAuthInstance().isSignedIn.get();
  }
}