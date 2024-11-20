import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importação para usar o Firestore
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  async loginUser(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      return userCredential;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async googleLogin() {
    try {
      const result = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      return result.user;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logOut() {
    try {
      await this.afAuth.signOut();
      console.log('Usuário deslogado com sucesso');
      this.router.navigate(['/login']);
    } catch (error) {
      console.log("Erro ao sair:", error);
      throw error;
    }
  }

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

  async resetPassword(email: string) {
    try {
      return await this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async registerUser(userData: any) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        userData.email,
        userData.senha
      );

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

      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      throw error;
    }
  }

async getProfile() {
    try {
      const user = await this.afAuth.currentUser;
      if (!user) return null;
  
      const userDoc = this.firestore.collection('usuarios').doc(user.uid);
      const userData = await userDoc.valueChanges().pipe(first()).toPromise();
  
      if (userData && typeof userData === 'object') {
        return {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          ...userData,
        };
      } else {
        console.error('Ocorreu um erro: dados do usuário não estão disponíveis');
        return null;
      }
    } catch (error) {
      console.error('Erro ao obter perfil:', error);
      return null;
    }
  }


async getUserData(uid: string) {
  try {
    const userDoc = await this.firestore.collection('usuarios').doc(uid).get().toPromise();
    return userDoc.exists ? userDoc.data() : null;
  } catch (error) {
    console.error('Erro ao buscar dados do Firestore:', error);
    return null; 
  }
}

}
