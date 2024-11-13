import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GoogleAuthService } from '../google-auth.service'; 
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Certifique-se que o caminho esteja correto

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: any;  // Variável para armazenar os dados do usuário

  constructor(
    public authService: AuthService,
    public route: Router,
    public navCtrl: NavController,
    private googleAuthService: GoogleAuthService, 
  ) {
    this.googleAuthService.loadGapi();
    this.user = authService.getProfile();  // Pegando os dados do perfil do usuário (se disponível)
  }

  async ngOnInit() {
    try {
      await this.googleAuthService.signIn();  // Inicia o login com Google
      await this.loadEvents();  // Carrega os eventos (caso haja algum serviço para isso)
    } catch (error) {
      console.error('Erro ao autenticar ou carregar eventos', error);
    }
  }

  async loadEvents() {
    try {
      // Se você tiver o serviço de calendário, carregue os eventos aqui.
      // Exemplo:
      // this.events = await this.calendarService.getEvents();
      // console.log('Eventos carregados:', this.events);
    } catch (error) {
      console.error('Erro ao buscar eventos', error);
    }
  }

  goContatos() {
    this.navCtrl.navigateRoot('contatos');  // Navega para a tela de contatos
  }

  async logOut() {
    try {
      await this.authService.logOut();  // Chama o método logOut() do AuthService
    } catch (error) {
      console.error('Erro ao deslogar:', error);  // Exibe erro, caso aconteça
    }
  }
}
