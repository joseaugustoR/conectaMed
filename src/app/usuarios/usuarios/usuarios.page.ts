import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../../../models/pessoa';
import { PessoaService } from '../../../app/services/pessoa.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  nome: string = '';
  idade: number | null = null;
  pessoas: { id: string, data: Pessoa }[] = [];
  pessoaSelecionadaId: string | null = null;

  constructor(private pessoaService: PessoaService) {}

  ngOnInit() {
    this.pessoaService.getPessoas().subscribe((data) => {
      this.pessoas = data;
    });
  }

  salvarPessoa() {
    if (this.nome && this.idade !== null) {
      const pessoa = new Pessoa(this.nome, this.idade);
      if (this.pessoaSelecionadaId) {
        this.pessoaService.updatePessoa(this.pessoaSelecionadaId, pessoa).then(() => {
          console.log('Pessoa atualizada com sucesso!');
          this.limparCampos();
        });
      } else {
        this.pessoaService.addPessoa(pessoa).then(() => {
          console.log('Pessoa adicionada com sucesso!');
          this.limparCampos();
        });
      }
    } else {
      console.error('Por favor, preencha todos os campos!');
    }
  }

  selecionarPessoa(id: string, pessoa: Pessoa) {
    this.pessoaSelecionadaId = id;
    this.nome = pessoa.nome;
    this.idade = pessoa.idade;
  }

  excluirPessoa(id: string) {
    this.pessoaService.deletePessoa(id).then(() => {
      console.log('Pessoa excluída com sucesso!');
      this.limparCampos();
    });
  }

  limparCampos() {
    this.nome = '';
    this.idade = null;
    this.pessoaSelecionadaId = null;
  }
}
