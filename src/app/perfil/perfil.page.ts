import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Importe o AuthService para obter dados do usuário
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  isAdmin: boolean = false;  // Variável para verificar se o usuário é admin

  userProfile: any = {}; // Objeto para armazenar os dados do perfil

  constructor(private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadUserProfile(); // Chama o método para carregar as informações do perfil
  }

  async loadUserProfile() {
    try {
      const profile = await this.authService.getProfile();  // Carregando o perfil
      this.userProfile = profile;
  
      // Verifica se o perfil tem a role 'admin'
      this.isAdmin = profile?.role === 'admin';  // Assumindo que 'role' é 'admin' para usuários admins
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      this.isAdmin = false;  // Se der erro ou não encontrar o perfil, o botão não será mostrado
    }
  }

  goToCadastro() {
    if (this.isAdmin) {
      this.router.navigate(['/cadastro']);
    }
  }

    // Método para voltar à página Home
    goHome() {
      this.router.navigate(['/home']);  // Redireciona para a home
    }

}
