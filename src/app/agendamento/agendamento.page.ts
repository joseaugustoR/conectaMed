import { Component, OnInit } from '@angular/core';

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
  mensagemErro: string = ''; // Variável para armazenar a mensagem de erro

  constructor() { }

  ngOnInit() {}

  // Função chamada ao clicar no botão de confirmar agendamento
  exibirInformacoes() {
    // Verifica se todos os campos foram preenchidos
    if (!this.consulta || !this.local || !this.data || !this.hora) {
      this.mensagemErro = 'Por favor, preencha todos os campos.'; // Exibe mensagem de erro
      this.informacoes = null; // Limpa as informações anteriores, se houver
    } else {
      this.mensagemErro = ''; // Limpa a mensagem de erro, se todos os campos estiverem preenchidos
      this.informacoes = {
        consulta: this.consulta,
        local: this.local,
        data: this.data,
        hora: this.hora
      };
    }
  }
}
