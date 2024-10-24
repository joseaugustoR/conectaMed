import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Pessoa } from '../../models/pessoa';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private pessoasCollection: AngularFirestoreCollection<Pessoa>;

  constructor(private firestore: AngularFirestore) {
    this.pessoasCollection = this.firestore.collection<Pessoa>('pessoas');
  }

  addPessoa(pessoa: Pessoa): Promise<void> {
    const id = this.firestore.createId();
    return this.pessoasCollection.doc(id).set({ ...pessoa });
  }

  getPessoas(): Observable<{ id: string, data: Pessoa }[]> {
    return this.pessoasCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Pessoa;
        const id = a.payload.doc.id;
        return { id, data };
      }))
    );
  }

  updatePessoa(id: string, pessoa: Pessoa): Promise<void> {
    return this.pessoasCollection.doc(id).update({ nome: pessoa.nome, idade: pessoa.idade });
  }

  deletePessoa(id: string): Promise<void> {
    return this.pessoasCollection.doc(id).delete();
  }
}