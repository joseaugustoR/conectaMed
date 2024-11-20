import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GoogleAuthService } from '../google-auth.service'; 
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: any;  

  constructor(
    public authService: AuthService,
    public route: Router,
    public navCtrl: NavController,
    private googleAuthService: GoogleAuthService, 
  ) {
    this.googleAuthService.loadGapi();
    this.user = authService.getProfile();  
  }

  ngOnInit(): void {
    console.log('HomePage initialized');
  }
  

/*   async loadEvents() {
    try {
      // Se você tiver o serviço de calendário, carregue os eventos aqui.
      // Exemplo:
      // this.events = await this.calendarService.getEvents();
      // console.log('Eventos carregados:', this.events);
    } catch (error) {
      console.error('Erro ao buscar eventos', error);
    }
  } */

  goContatos() {
    this.navCtrl.navigateRoot('contatos');  
  }

  async logOut() {
    try {
      await this.authService.logOut();  
    } catch (error) {
      console.error('Erro ao deslogar:', error); 
    }
  }
}
