import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  cadastroForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      dataNascimento: ['', Validators.required],
      genero: ['', Validators.required],
      nomeMae: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
      celular: ['', [Validators.required, Validators.pattern('[0-9]{10,11}')]],
      cep: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
      bairro: ['', Validators.required],
      endereco: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.cadastroForm.valid) {
      const formData = this.cadastroForm.value;
  
      try {
        const loading = await this.loadingCtrl.create({
          message: 'Cadastrando...',
        });
        await loading.present();
  
        // Chama o método de cadastro
        await this.authService.registerUser(formData);
  
        await loading.dismiss();
        console.log('Usuário cadastrado com sucesso!');
        this.router.navigate(['/home']); // Redireciona para a home após o cadastro
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        const alert = await this.alertCtrl.create({
          header: 'Erro',
          message: 'Não foi possível realizar o cadastro. Tente novamente.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Formulário inválido',
        message: 'Preencha todos os campos corretamente antes de prosseguir.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
  

  // Método para voltar à página Home
  goHome() {
    this.router.navigate(['/home']); // Redireciona para a home
  }
}