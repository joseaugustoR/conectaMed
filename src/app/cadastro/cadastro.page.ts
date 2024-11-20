import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
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
        await this.authService.registerUser(formData);
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
      }
    }
  }

  goHome() {
    this.navCtrl.navigateRoot('home');
}
}
