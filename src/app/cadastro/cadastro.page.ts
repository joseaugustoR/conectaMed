import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Pessoa } from '../../models/pessoa';
import { PessoaService } from '../services/pessoa.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  nome: string = '';
  idade: number | null = null;
  pessoas: { id: string, data: Pessoa }[] = [];
  pessoaSelecionadaId: string | null = null;

  constructor(
    private pessoaService: PessoaService,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.pessoaService.getPessoas().subscribe((data) => {
      this.pessoas = data;
    });
  }

  goHome() {
    this.navCtrl.navigateForward('home');
  }

  salvarPessoa() {
    if (this.nome && this.idade !== null) {
      const pessoa = new Pessoa(this.nome, this.idade);
      if (this.pessoaSelecionadaId) {
        this.pessoaService.updatePessoa(this.pessoaSelecionadaId, pessoa).then(() => {
          console.log('Pessoa atualizada com sucesso!');
          this.limparCampos();
        }).catch((error) => {
          console.error('Erro ao atualizar pessoa:', error);
        });
      } else {
        this.pessoaService.addPessoa(pessoa).then(() => {
          console.log('Pessoa adicionada com sucesso!');
          this.limparCampos();
        }).catch((error) => {
          console.error('Erro ao adicionar pessoa:', error);
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
    }).catch((error) => {
      console.error('Erro ao excluir pessoa:', error);
    });
  }

  limparCampos() {
    this.nome = '';
    this.idade = null;
    this.pessoaSelecionadaId = null;
  }
}




/*

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UsuarioModel } from 'src/models/usuario.models';
import { NavController } from '@ionic/angular';


export class SignupPage {

signupForm: any;

constructor(public formBuilder: FormBuilder, public navCtrl: NavController)
this.signupForm = formBuilder. group({
email: ["', Validators.required],
password: ["", Validators.compose([Validators.minLength(6), Validators.maxLength(20),
passwordConfirmation; [", Validators.compose([Validators.minLength(6), Validators.ma:
firstName : ["', Validators.required],
lastName: ["", Validators.required]



export class HomePage {
  userForm: FormGroup;

  constructor(public form: FormBuilder, public navCtrl: NavController) {
    this.userForm = this.form.group ({
        nome: ['', Validators.required],
        email: ['', Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPa')
  }



  save (){
    let { nome, email } = this.userForm.value;
    let addUsuario = new UsuarioModel(1, nome, email)
  }

}
}

*/
