import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-minhas-consultas',
  templateUrl: './minhas-consultas.page.html',
  styleUrls: ['./minhas-consultas.page.scss'],
})
export class MinhasConsultasPage implements OnInit {
  consultas: any[] = [];

  constructor(private authService: AuthService, private firestore: AngularFirestore) {}

  async ngOnInit() {
    try {
      const user = await this.authService.getProfile();
      if (user && user.uid) {
        this.firestore
          .collection('agendamentos', ref => ref.where('uid', '==', user.uid))
          .valueChanges()
          .subscribe(data => {
            this.consultas = data;
          });
      } else {
        console.error('Usuário não autenticado.');
      }
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    }
  }
}
