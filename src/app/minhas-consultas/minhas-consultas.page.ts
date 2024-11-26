import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-minhas-consultas',
  templateUrl: './minhas-consultas.page.html',
  styleUrls: ['./minhas-consultas.page.scss'],
})
export class MinhasConsultasPage implements OnInit, OnDestroy {
  consultas: any[] = []; // Array para armazenar as consultas
  consultaSubscription: Subscription | null = null; // Gerencia a assinatura para limpar no OnDestroy

  constructor(private authService: AuthService, private firestore: AngularFirestore) {}

  async ngOnInit() {
    try {
      const user = await this.authService.getProfile();

      if (user && user.uid) {
        console.log('UID do usuário logado:', user?.uid);

        // Busca as consultas do usuário logado
        this.consultaSubscription = this.firestore
          .collection('agendamentos', (ref) => ref.where('uid', '==', user.uid))
          .valueChanges({ idField: 'id' }) // Inclui o ID do documento
          .subscribe(
            (data) => {
              console.log('Agendamentos retornados do Firestore:', data);
              this.consultas = data; // Atualiza o array com os agendamentos
            },
            (error) => {
              console.error('Erro ao buscar consultas no Firestore:', error);
              this.consultas = []; // Certifica que a lista é limpa em caso de erro
            }
          );
      } else {
        console.error('Usuário não autenticado. Redirecionando...');
        this.consultas = [];
      }
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    }
  }

  // Limpa assinaturas ao sair da página para evitar memory leaks
  ngOnDestroy() {
    if (this.consultaSubscription) {
      this.consultaSubscription.unsubscribe();
    }
  }
}
