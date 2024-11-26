import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { first } from 'rxjs/operators';

interface Usuario {
  nome: string;
  cpf: string;
  email: string;
  [key: string]: any; 
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

async loginUser(email: string, password: string): Promise<any> {
  try {
    const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    if (user) {
      const userData = await this.firestore.collection('usuarios').doc(user.uid).get().toPromise();

      if (userData.exists) {
        const data = userData.data() as { [key: string]: any }; 

        const role = data['role'] || null;
        const displayName = data['nome'] || user.displayName || null;  

        return {
          uid: user.uid,
          email: user.email,
          displayName: displayName,
          role: role
        };
      }
    }
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    throw error;
  }
}

  async googleLogin(): Promise<any> {
    try {
      console.log('Iniciando login com Google...');
      const result = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      return result.user;
    } catch (error) {
      console.error('Erro ao realizar login com Google:', error);
      throw new Error(error.message || 'Erro ao logar com Google.');
    }
  }

  async logOut(): Promise<void> {
    try {
      await this.afAuth.signOut();
      console.log('Usuário deslogado com sucesso.');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao sair:', error);
      throw new Error('Erro ao deslogar usuário.');
    }
  }

  async getProfile(): Promise<any> {
    try {
      const user = await this.afAuth.currentUser;
      if (!user) return null;

      const userDoc = this.firestore.collection('usuarios').doc(user.uid);
      const userData = await userDoc.valueChanges().pipe(first()).toPromise();
      const userObject = userData as Record<string, any> | null; 

      console.log('Perfil carregado:', userObject);

      if (userObject) {
        return {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || userObject['nome'] || null,
          photoURL: user.photoURL || null,
          role: userObject['role'] || null,
          ...userObject,
        };
      } else {
        console.error('Dados do usuário não encontrados no Firestore.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      throw new Error('Erro ao carregar perfil do usuário.');
    }
  }

  async registerUser(userData: any): Promise<void> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        userData.email,
        userData.senha
      );

      const userId = userCredential.user?.uid;
      if (userId) {
        await this.firestore.collection('usuarios').doc(userId).set({
          nome: userData.nome,
          email: userData.email,
          role: 'user',
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
        console.log('Novo usuário cadastrado com sucesso!');
      } else {
        throw new Error('Erro ao criar o usuário. ID não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      throw error;
    }
  }
  
  async getAllUsers(): Promise<any[]> {
    try {
      const snapshot = await this.firestore.collection('usuarios').get().toPromise();
      return snapshot.docs.map((doc) => {
        const data = doc.data(); 
        if (data && typeof data === 'object') { 
          return { id: doc.id, ...data }; 
        } else {
          return { id: doc.id };
        }
      });
    } catch (error) {
      console.error('Erro ao buscar todos os usuários:', error);
      throw error;
    }
  }


  async updateUser(id: string, data: any): Promise<void> {
    try {
      await this.firestore.collection('usuarios').doc(id).update(data);
      console.log('Dados do usuário atualizados com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
      throw error;
    }
  }
  
  async deleteUser(id: string): Promise<void> {
    try {
      await this.firestore.collection('usuarios').doc(id).delete();
      console.log('Usuário excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      throw error;
    }
  }

  async consultarUsuarios(nome: string, cpf: string, email: string): Promise<Usuario[]> {
    try {
      const usuariosSnapshot = await this.firestore.collection<Usuario>('usuarios').ref.get();

      const usuarios = usuariosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return usuarios.filter((usuario) => {
        const nomeUsuario = this.normalizeString(usuario.nome || '');
        const cpfUsuario = (usuario.cpf || '').trim();
        const emailUsuario = (usuario.email || '').trim().toLowerCase();

        const nomeMatch = nome ? nomeUsuario.includes(this.normalizeString(nome)) : true;
        const cpfMatch = cpf ? cpfUsuario.includes(cpf.trim()) : true;
        const emailMatch = email ? emailUsuario.includes(email.trim().toLowerCase()) : true;

        return nomeMatch && cpfMatch && emailMatch;
      });
    } catch (error) {
      console.error('Erro ao consultar usuários:', error);
      throw error;
    }
  }

  private normalizeString(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }


  async searchUsers(nome: string, cpf: string, email: string): Promise<any[]> {
    try {
      const query = this.firestore.collection('usuarios', (ref) => {
        let queryRef = ref as firebase.firestore.Query;
  
        if (nome) {
          queryRef = queryRef.where('nome_normalizado', '>=', nome).where('nome_normalizado', '<=', nome + '\uf8ff');
        }
        if (cpf) {
          queryRef = queryRef.where('cpf', '==', cpf); 
        }
        if (email) {
          queryRef = queryRef.where('email_normalizado', '==', email); 
        }
  
        return queryRef;
      });
  
      const snapshot = await query.get().toPromise();
  

      return snapshot.docs.map((doc) => {
        const data = doc.data() as any; 
        return { id: doc.id, ...data };
      });
    } catch (error) {
      console.error('Erro ao buscar usuários no Firestore:', error);
      throw error;
    }
  }
  

}


