import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.page.html',
  styleUrls: ['./agendamento.page.scss'],
})
export class AgendamentoPage implements OnInit {
  consulta: string = '';
  local: string = '';
  data: string = '';
  hora: string = '';

  informacoes: { consulta: string; local: string; data: string; hora: string } | null = null;
  mensagemErro: string = '';

  constructor(private authService: AuthService, private firestore: AngularFirestore) {}

  ngOnInit() {}

  async exibirInformacoes() {
    console.log('Consulta:', this.consulta);
    console.log('Local:', this.local);
    console.log('Data:', this.data);
    console.log('Hora:', this.hora);

    if (!this.consulta || !this.local || !this.data || !this.hora) {
      this.mensagemErro = 'Por favor, preencha todos os campos.';
      this.informacoes = null;
    } else {
      this.mensagemErro = '';
      this.informacoes = {
        consulta: this.consulta,
        local: this.local,
        data: this.data,
        hora: this.hora,
      };

      try {
        const user = await this.authService.getProfile();
        if (user && user.uid) {
          await this.firestore.collection('agendamentos').add({
            uid: user.uid,
            consulta: this.consulta,
            local: this.local,
            data: this.data,
            hora: this.hora,
            createdAt: new Date(),
          });
          console.log('Agendamento salvo com sucesso!');
        } else {
          console.error('Usuário não autenticado.');
        }
      } catch (error) {
        console.error('Erro ao salvar agendamento:', error);
      }
    }
  }
}
