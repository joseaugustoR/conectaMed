import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'contatos',
        loadChildren: () => import('../contatos/contatos.module').then(m => m.ContatosPageModule)
      },
      {
        path: 'criadores',
        loadChildren: () => import('../criadores/criadores.module').then(m => m.CriadoresPageModule)
      },
      {
        path: 'agendamento',
        loadChildren: () => import('../agendamento/agendamento.module').then(m => m.AgendamentoPageModule)
      },
      {
        path: 'minhas-consultas',
        loadChildren: () => import('../minhas-consultas/minhas-consultas.module').then(m => m.MinhasConsultasPageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
