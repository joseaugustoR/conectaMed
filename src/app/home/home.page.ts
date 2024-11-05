import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GoogleAuthService } from '../google-auth.service';
/* import { CalendarService } from '../calendar.service'; */
import { CalendarEvent } from '../calendar-event.model'; // Ajuste o caminho
import { Router } from '@angular/router';
import { AuthService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user:any
  events: CalendarEvent[] = []; // Usando a interface CalendarEvent

  constructor(
    public authService: AuthService,
    public route:Router,
    public navCtrl: NavController,
    private googleAuthService: GoogleAuthService, 
    /* private calendarService: CalendarService */
  ) {
    this.googleAuthService.loadGapi();
    this.user = authService.getProfile()
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
      /* this.events = await this.calendarService.getEvents();
      console.log('Eventos carregados:', this.events); */
    } catch (error) {
      console.error('Erro ao buscar eventos', error);
    }
  }

  goContatos() {
    this.navCtrl.navigateRoot('contatos');
  }

  async logOut(){
    this.authService.singOut().then(() =>{
      this.route.navigate(['/login'])
    }).catch((error)=>{
      console.log("Erro");
    })
  }



}
