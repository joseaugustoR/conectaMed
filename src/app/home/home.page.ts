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
  isAdmin: boolean = false;  // Variável para verificar se o usuário é admin

  constructor(
    public authService: AuthService,
    public route: Router,
    public navCtrl: NavController,
    private googleAuthService: GoogleAuthService, 
  ) {
    this.googleAuthService.loadGapi();
    this.loadUserProfile();  // Carregar o perfil do usuário ao inicializar
  }

  ngOnInit(): void {
    console.log('HomePage initialized');
  }

  async loadUserProfile() {
    try {
        const profile = await this.authService.getProfile();
        this.user = profile;

        // Verifica se a role é 'admin'
        if (profile && profile.role === 'admin') {
            this.isAdmin = true;  // Torna o isAdmin true para mostrar o botão
        } else {
            this.isAdmin = false; // Garante que o botão não será mostrado para outros tipos de usuário
        }
    } catch (error) {
        console.error('Erro ao carregar perfil do usuário:', error);
        this.isAdmin = false; // Se ocorrer erro, garanta que o botão não será exibido
    }
}

  // Navegar para a tela de contatos
  goContatos() {
    this.navCtrl.navigateRoot('contatos');  
  }

  // Função para deslogar o usuário
  async logOut() {
    try {
      await this.authService.logOut();  
    } catch (error) {
      console.error('Erro ao deslogar:', error); 
    }
  }

  // Navegar para a tela de cadastro de usuários (disponível apenas para admins)
  goToCadastro() {
    if (this.isAdmin) {
      this.route.navigate(['/cadastro']);
    }
  }
}