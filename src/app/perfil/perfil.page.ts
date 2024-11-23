import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  isAdmin: boolean = false;  
  userProfile: any = null; // Inicialize como `null` para facilitar o carregamento condicional

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    try {
      this.userProfile = await this.authService.getProfile();
      this.isAdmin = this.userProfile?.role === 'admin';
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      this.userProfile = null; // Em caso de erro, indica que não há perfil carregado
      this.isAdmin = false;
    }
  }

  goToCadastro() {
    if (this.isAdmin) {
      this.router.navigate(['/cadastro']);
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }


  async logout() {
    try {
      await this.authService.logOut(); // Chama o método logOut do AuthService
      console.log('Usuário deslogado com sucesso.');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  }
}
