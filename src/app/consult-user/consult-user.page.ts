import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consult-user',
  templateUrl: './consult-user.page.html',
  styleUrls: ['./consult-user.page.scss'],
})
export class ConsultUserPage implements OnInit {

  nome: string = '';
  cpf: string = '';
  email: string = '';
  mensagemErro: string = '';  // Variável para armazenar a mensagem de erro
  usuarioNaoEncontrado: boolean = false; // Variável para controlar a mensagem de "usuário não encontrado"

  // Dados simulados de um usuário (pode ser substituído por uma consulta à API)
  usuarioFicticio = {
    nome: 'João Silva',
    cpf: '12345678901',
    email: 'joao.silva@example.com'
  };

  constructor() { }

  ngOnInit() {
  }

  // Função chamada ao clicar no botão de Consultar
  consultarUsuario() {
    this.mensagemErro = ''; // Limpa a mensagem de erro
    this.usuarioNaoEncontrado = false; // Reseta a flag de "usuário não encontrado"
    
    // Verifica se todos os campos foram preenchidos
    if (!this.nome || !this.cpf || !this.email) {
      this.mensagemErro = 'Por favor, preencha todos os campos.';
      return;
    }

    // Simula a consulta (pode ser substituído por uma consulta real a uma API)
    if (this.nome === this.usuarioFicticio.nome &&
        this.cpf === this.usuarioFicticio.cpf &&
        this.email === this.usuarioFicticio.email) {
      console.log('Usuário encontrado:', this.usuarioFicticio);
      // Aqui você pode fazer o que for necessário após encontrar o usuário
    } else {
      this.usuarioNaoEncontrado = true;  // Exibe a mensagem de "usuário não encontrado"
    }
  }
}


