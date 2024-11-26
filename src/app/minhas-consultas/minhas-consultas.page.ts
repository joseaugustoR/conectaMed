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
  consultas: any[] = []; 
  consultaSubscription: Subscription | null = null; 

  constructor(private authService: AuthService, private firestore: AngularFirestore) {}

  async ngOnInit() {
    try {
      const user = await this.authService.getProfile();

      if (user && user.uid) {
        console.log('UID do usuário logado:', user?.uid);

        this.consultaSubscription = this.firestore
          .collection('agendamentos', (ref) => ref.where('uid', '==', user.uid))
          .valueChanges({ idField: 'id' }) 
          .subscribe(
            (data) => {
              console.log('Agendamentos retornados do Firestore:', data);
              this.consultas = data; 
            },
            (error) => {
              console.error('Erro ao buscar consultas no Firestore:', error);
              this.consultas = []; 
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

  ngOnDestroy() {
    if (this.consultaSubscription) {
      this.consultaSubscription.unsubscribe();
    }
  }
}
