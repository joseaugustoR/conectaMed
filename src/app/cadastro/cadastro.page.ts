import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Pessoa } from '../../models/pessoa';
import { PessoaService } from '../services/pessoa.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';
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
      cpf: ['', [Validators.required, Validators.pattern('[0-9]{11}')]], // CPF com 11 dígitos
      celular: ['', [Validators.required, Validators.pattern('[0-9]{10,11}')]], // 10 ou 11 dígitos
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
}


/*


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  //CADASTRO ATUAL
  regForm: FormGroup;

  nome: string = '';
  idade: number | null = null;
  pessoas: { id: string, data: Pessoa }[] = [];
  pessoaSelecionadaId: string | null = null;

  constructor(
    private pessoaService: PessoaService,
    public navCtrl: NavController,
    
    
    
    
    
    //CADASTRO ATUAL
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public authService:AuthService,public router : Router
  ) {}

  ngOnInit() {
    this.pessoaService.getPessoas().subscribe((data) => {
      this.pessoas = data;
    });

    //CADASTRO ATUAL
    this.regForm = this.formBuilder.group({
      fullname:['', [Validators.required]],
      email:['', [
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")

      ]],
      
      password:['', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]],

    })
    
  }

  get errorControl() {
    return this.regForm?.controls;
  }

  async signUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if(this.regForm?.valid) {
      const user = await this.authService.registerUser(this.regForm.value.email,this.regForm.value.password).catch((error) => {
        console.log(error);
        loading.dismiss()
      })

      if(user){
        loading.dismiss()
        this.router.navigate(['/home'])

      } else {
        console.log('Insira informações válidas')
      }
    }
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

  public userRegister: User = {};

  register () {
    console.log(this.userRegister);
  }

}






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
