import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-consult-user',
  templateUrl: './consult-user.page.html',
  styleUrls: ['./consult-user.page.scss'],
})
export class ConsultUserPage {
  nome: string = '';
  cpf: string = '';
  email: string = '';
  usuariosEncontrados: any[] = []; // Lista para armazenar os usuários encontrados
  mensagemErro: string = '';
  usuarioNaoEncontrado: boolean = false;

  constructor(private authService: AuthService,  private alertCtrl: AlertController) {}

  async consultarUsuario() {
    if (!this.nome && !this.cpf && !this.email) {
      this.mensagemErro = 'Por favor, preencha pelo menos um campo para a consulta.';
      this.usuarioNaoEncontrado = false;
      return;
    }

    this.mensagemErro = ''; // Limpa mensagem de erro
    this.usuarioNaoEncontrado = false; // Reseta o estado anterior

    try {
      const usuarios = await this.authService.searchUsers(this.nome, this.cpf, this.email);

      if (usuarios.length > 0) {
        this.usuariosEncontrados = usuarios; // Armazena os usuários encontrados
        console.log('Usuários encontrados:', this.usuariosEncontrados);
      } else {
        this.usuarioNaoEncontrado = true; // Exibe mensagem de "não encontrado"
      }
    } catch (error) {
      console.error('Erro ao consultar usuário:', error);
      this.mensagemErro = 'Ocorreu um erro ao consultar os usuários.';
    }
  }

// Função para editar um usuário
async editarUsuario(usuario: any) {
  const alert = await this.alertCtrl.create({
    header: 'Editar Usuário',
    inputs: [
      {
        name: 'nome',
        type: 'text',
        placeholder: 'Nome',
        value: usuario.nome,
      },
      {
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        value: usuario.email,
      },
      {
        name: 'cpf',
        type: 'text',
        placeholder: 'CPF',
        value: usuario.cpf,
      },
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'Salvar',
        handler: async (data) => {
          try {
            await this.authService.updateUser(usuario.id, data);
            console.log('Usuário atualizado com sucesso!');
            this.consultarUsuario(); // Atualiza a lista após a edição
          } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
          }
        },
      },
    ],
  });

  await alert.present();
}

    // Função para excluir um usuário
    async excluirUsuario(id: string) {
      const alert = await this.alertCtrl.create({
        header: 'Confirmar Exclusão',
        message: 'Tem certeza que deseja excluir este usuário?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Excluir',
            handler: async () => {
              try {
                await this.authService.deleteUser(id);
                console.log('Usuário excluído com sucesso!');
                this.consultarUsuario(); // Atualiza a lista após a exclusão
              } catch (error) {
                console.error('Erro ao excluir usuário:', error);
              }
            },
          },
        ],
      });
  
      await alert.present();
    }
  }

