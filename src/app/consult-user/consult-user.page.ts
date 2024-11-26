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
  usuariosEncontrados: any[] = []; 
  mensagemErro: string = '';
  usuarioNaoEncontrado: boolean = false;

  constructor(private authService: AuthService,  private alertCtrl: AlertController) {}

  private normalizeText(text: string): string {
    return text
      .normalize('NFD') 
      .replace(/[\u0300-\u036f]/g, '') 
      .toLowerCase(); 
  }

  async consultarUsuario() {
    this.mensagemErro = '';
    this.usuarioNaoEncontrado = false;
    this.usuariosEncontrados = [];

    if (!this.nome && !this.cpf && !this.email) {
        this.mensagemErro = 'Por favor, preencha pelo menos um campo para a consulta.';
        return;
    }

    try {
        const usuarios = await this.authService.getAllUsers();

        const termoNome = this.nome ? this.normalizeText(this.nome) : '';
        const termoCpf = this.cpf ? String(this.cpf).replace(/\D/g, '') : ''; // Garantir que this.cpf é string
        const termoEmail = this.email ? this.email.trim().toLowerCase() : '';

        this.usuariosEncontrados = usuarios.filter((usuario: any) => {
            let corresponde = true;

            if (termoNome) {
                const nomeNormalizado = this.normalizeText(usuario.nome || '');
                corresponde = corresponde && nomeNormalizado.includes(termoNome);
            }

            if (termoCpf) {
                const cpfNormalizado = usuario.cpf ? String(usuario.cpf).replace(/\D/g, '') : '';
                corresponde = corresponde && (cpfNormalizado === termoCpf);
            }

            if (termoEmail) {
                const emailNormalizado = (usuario.email || '').toLowerCase();
                corresponde = corresponde && (emailNormalizado === termoEmail);
            }

            return corresponde;
        });

        if (this.usuariosEncontrados.length === 0) {
            this.usuarioNaoEncontrado = true;
        } else {
            console.log('Usuários encontrados:', this.usuariosEncontrados);
        }
    } catch (error) {
        console.error('Erro ao consultar usuários:', error);
        this.mensagemErro = 'Ocorreu um erro ao consultar os usuários.';
    }
}


  
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
            this.consultarUsuario(); 
          } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
          }
        },
      },
    ],
  });

  await alert.present();
}

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

