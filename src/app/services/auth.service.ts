import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) {}

  // Método de login com email e senha
  async loginUser(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      // O usuário foi autenticado com sucesso
      return userCredential;  // Retorna as credenciais do usuário
    } catch (error) {
      throw this.handleError(error);  // Captura e propaga o erro para ser tratado no componente
    }
  }

  // Método de login com o Google
  async googleLogin() {
    try {
      const result = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      return result.user; // Retorna as informações do usuário logado
    } catch (error) {
      throw this.handleError(error);  // Captura e propaga o erro para ser tratado no componente
    }
  }

  async logOut() {
    try {
      await this.afAuth.signOut();  // Chama o método correto de signOut do AngularFireAuth
      console.log('Usuário deslogado com sucesso');
      this.router.navigate(['/login']);  // Redireciona para a página de login após o logout
    } catch (error) {
      console.log("Erro ao sair:", error);  // Log de falha, caso ocorra algum erro
      throw error;  // Lança o erro para ser tratado no componente
    } }

  // Função para tratar os erros de autenticação do Firebase
  private handleError(error: firebase.auth.Error) {
    let errorMessage = 'Ocorreu um erro inesperado.';
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'Usuário não encontrado. Verifique seu e-mail.';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Senha incorreta. Tente novamente.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Formato de e-mail inválido.';
    } else if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Este e-mail já está em uso. Tente outro.';
    }
    return errorMessage;
  }

  // Função para obter o usuário autenticado (caso esteja logado)
  async getProfile() {
    try {
      return await this.afAuth.currentUser;  // Retorna o usuário atual, se autenticado
    } catch (error) {
      console.log('Erro ao obter perfil:', error);
      return null;  // Se ocorrer um erro, retorna null
    }
  }

  // Função para redefinir a senha
  async resetPassword(email: string) {
    try {
      return await this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      throw this.handleError(error);  // Captura e propaga o erro para ser tratado no componente
    }
  }



  async registerUser(userData: any) {
    try {
      // Cria um novo usuário com email e senha
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        userData.email,
        userData.senha
      );

      // Salva os dados adicionais do usuário no Firestore
      const userId = userCredential.user?.uid;

      await this.firestore.collection('usuarios').doc(userId).set({
        nome: userData.nome,
        email: userData.email,
        dataNascimento: userData.dataNascimento,
        genero: userData.genero,
        nomeMae: userData.nomeMae,
        cpf: userData.cpf,
        celular: userData.celular,
        cep: userData.cep,
        pais: userData.pais,
        estado: userData.estado,
        bairro: userData.bairro,
        endereco: userData.endereco,
      });

      // Redireciona para a página inicial após o cadastro
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      throw error;
    }
  }


}
