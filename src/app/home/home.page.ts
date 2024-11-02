import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GoogleAuthService } from '../google-auth.service';
import { CalendarService } from '../calendar.service';
import { CalendarEvent } from '../calendar-event.model'; // Ajuste o caminho

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  events: CalendarEvent[] = []; // Usando a interface CalendarEvent

  constructor(
    public navCtrl: NavController,
    private googleAuthService: GoogleAuthService,
    private calendarService: CalendarService
  ) {
    this.googleAuthService.loadGapi();
  }

  async ngOnInit() {
    try {
      await this.googleAuthService.signIn();
      await this.loadEvents();
    } catch (error) {
      console.error('Erro ao autenticar ou carregar eventos', error);
    }
  }

  async loadEvents() {
    try {
      this.events = await this.calendarService.getEvents();
      console.log('Eventos carregados:', this.events);
    } catch (error) {
      console.error('Erro ao buscar eventos', error);
    }
  }

  goContatos() {
    this.navCtrl.navigateRoot('contatos');
  }
}
