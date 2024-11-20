import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Importe o AuthService para obter dados do usuário

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  userProfile: any = {}; // Objeto para armazenar os dados do perfil

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadUserProfile(); // Chama o método para carregar as informações do perfil
  }

  async loadUserProfile() {
    try {
      // Chama o método getProfile para obter o perfil completo (dados de autenticação + Firestore)
      const user = await this.authService.getProfile();

      if (user) {
        // Atribui os dados ao objeto userProfile
        this.userProfile = user;
      } else {
        console.error("Erro: Nenhum perfil encontrado.");
      }
    } catch (error) {
      console.error('Erro ao carregar o perfil:', error);
    }
  }
}
