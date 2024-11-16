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
    // Adicionando logs para verificar os valores dos campos
    console.log('Consulta:', this.consulta);
    console.log('Local:', this.local);
    console.log('Data:', this.data);
    console.log('Hora:', this.hora);

    // Verifica se todos os campos foram preenchidos
    if (!this.consulta || !this.local || !this.data || !this.hora) {
      // Se algum campo estiver vazio, exibe a mensagem de erro
      this.mensagemErro = 'Por favor, preencha todos os campos.';
      this.informacoes = null; // Limpa as informações anteriores
    } else {
      // Se todos os campos estiverem preenchidos, exibe as informações
      this.mensagemErro = ''; // Limpa a mensagem de erro
      this.informacoes = {
        consulta: this.consulta,
        local: this.local,
        data: this.data,
        hora: this.hora
      };

      // Exibe as informações para depuração
      console.log('Informações do agendamento:', this.informacoes);
    }
  }
}