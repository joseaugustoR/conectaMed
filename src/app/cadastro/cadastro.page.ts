import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})

export class CadastroPage implements OnInit {

  constructor() { }

  ngOnInit() {
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
