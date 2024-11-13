import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public ngFireAuth: AngularFireAuth) { }

  // Registro de usuário
  async registerUser(email: string, password: string) {
    try {
      return await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      throw this.handleError(error);  // Captura e propaga o erro para ser tratado no componente
    }
  }

  // Login de usuário
  async loginUser(email: string, password: string) {
    try {
      return await this.ngFireAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw this.handleError(error);  // Captura e propaga o erro para ser tratado no componente
    }
  }

  // Redefinir senha
  async resetPassword(email: string) {
    try {
      return await this.ngFireAuth.sendPasswordResetEmail(email);
    } catch (error) {
      throw this.handleError(error);  // Captura e propaga o erro para ser tratado no componente
    }
  }

  // Logout de usuário
  async signOut() {
    try {
      return await this.ngFireAuth.signOut();
    } catch (error) {
      throw this.handleError(error);  // Captura e propaga o erro para ser tratado no componente
    }
  }

  // Obter o perfil do usuário
  async getProfile() {
    try {
      return await this.ngFireAuth.currentUser;
    } catch (error) {
      throw this.handleError(error);  // Captura e propaga o erro para ser tratado no componente
    }
  }

  // Função para tratar os erros de autenticação do Firebase
  private handleError(error: firebase.auth.Error) {
    let errorMessage = 'Ocorreu um erro inesperado.';
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'Usuário não encontrado. Verifique seu e-mail.';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Senha incorreta. Tente novamente.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Formato de e-mail inválido.';
    }
    return errorMessage;
  }
}
