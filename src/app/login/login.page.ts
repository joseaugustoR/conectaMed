import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Certifique-se de que o caminho está correto
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    public loadingCtrl: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private authService: AuthService,
    private route: Router,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // Definição do formulário com as validações necessárias
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}'
          ),
          Validators.required,
        ],
      ],
    });
  }

  // Getter para facilitar a leitura e acesso aos controles do formulário
  get errorControl() {
    return this.loginForm?.controls;
  }

  // Função de login
  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Aguarde...',
    });
    await loading.present();

    if (this.loginForm?.valid) {
      try {
        // Chama o método de login do AuthService
        const userCredential = await this.authService.loginUser(
          this.loginForm.value.email,
          this.loginForm.value.password
        );

        if (userCredential) {
          loading.dismiss();
          // Navega para a página principal (home) se o login for bem-sucedido
          this.route.navigate(['/home']);
        }
      } catch (error) {
        loading.dismiss();
        // Exibe o erro obtido do AuthService (erro de autenticação)
        this.showToast(error); // Mostra o erro em um Toast
      }
    } else {
      loading.dismiss();
      this.showToast('Por favor, preencha todos os campos corretamente.');
    }
  }

  // Função para exibir um Toast com a mensagem de erro
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }
}
