import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-minhas-consultas',
  templateUrl: './minhas-consultas.page.html',
  styleUrls: ['./minhas-consultas.page.scss'],
})
export class MinhasConsultasPage implements OnInit {
  consultas: any[] = []; // Armazena as consultas do usuário

  constructor(private authService: AuthService, private firestore: AngularFirestore) {}

  async ngOnInit() {
    try {
      // Obtém o perfil do usuário logado
      const user = await this.authService.getProfile();
      console.log('UID do usuário logado:', user?.uid);

      if (user && user.uid) {
        // Consulta no Firestore filtrando pelo UID do usuário
        this.firestore
          .collection('agendamentos', (ref) => ref.where('uid', '==', user.uid))
          .valueChanges({ idField: 'id' }) // Inclui o ID do documento
          .subscribe(
            (data) => {
              console.log('Agendamentos retornados do Firestore:', data);
              this.consultas = data; // Atualiza o array com os agendamentos
            },
            (error) => {
              console.error('Erro ao buscar consultas no Firestore:', error);
            }
          );
      } else {
        console.error('Usuário não autenticado.');
      }
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    }
  }
}
