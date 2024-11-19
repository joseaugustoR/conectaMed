import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'criadores',
    loadChildren: () => import('./criadores/criadores.module').then(m => m.CriadoresPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroPageModule)
  },
  {
    path: 'contatos',
    loadChildren: () => import('./contatos/contatos.module').then( m => m.ContatosPageModule)
  },
  {
    path: 'agendamento',
    loadChildren: () => import('./agendamento/agendamento.module').then( m => m.AgendamentoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'component',
    loadChildren: () => import('./component/component.module').then( m => m.ComponentPageModule)
  },
  {

    path: 'agendamento',
    loadChildren: () => import('./agendamento/agendamento.module').then( m => m.AgendamentoPageModule)
  },
  { 
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./recuperar/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios/usuarios.module').then( m => m.UsuariosPageModule)

    path: 'consult-user',
    loadChildren: () => import('./consult-user/consult-user.module').then( m => m.ConsultUserPageModule)

  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


