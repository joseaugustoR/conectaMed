import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
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
        // Chama o método de cadastro com role padrão "user"
        await this.authService.registerUser(formData);

        console.log('Usuário cadastrado com sucesso!');
        this.router.navigate(['/home']); // Redireciona para a home após o cadastro
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
      }
    } else {
      console.log('Formulário inválido');
    }
  }

  // Método para voltar à página Home
  goHome() {
    this.router.navigate(['/home']); // Redireciona para a home
  }
}