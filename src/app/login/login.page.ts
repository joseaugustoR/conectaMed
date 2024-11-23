import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
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

  get errorControl() {
    return this.loginForm?.controls;
  }

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Aguarde...',
    });
    await loading.present();

    if (this.loginForm?.valid) {
      try {
        // Login do usuário
        const userCredential = await this.authService.loginUser(
          this.loginForm.value.email,
          this.loginForm.value.password
        );

        // Verifica a role do usuário após login
        if (userCredential) {
          loading.dismiss();

          // Redireciona baseado na role do usuário
          if (userCredential.role === 'admin') {
            this.route.navigate(['/home']); // Redireciona para a tela de admin
          } else {
            this.route.navigate(['/home']); // Redireciona para a home normal
          }
        }
      } catch (error) {
        loading.dismiss();
        this.showToast(error.message); // Exibe o erro no toast
      }
    } else {
      loading.dismiss();
      this.showToast('Por favor, preencha todos os campos corretamente.');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }
}
