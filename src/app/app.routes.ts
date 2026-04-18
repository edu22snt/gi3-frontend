import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
    import('./pages/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/main-layout/main-layout.component')
        .then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'principal',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },
      {
        path: 'prestacao-servico',
        loadComponent: () =>
          import('./pages/prestacao-servico/prestacao-servico.component')
            .then(m => m.PrestacaoServicoComponent)
      },
      {
        path: 'prestacao-servico-form',
        loadComponent: () =>
          import('./pages/prestacao-servico/form/prestacao-servico-form.component')
            .then(m => m.PrestacaoServicoFormComponent)
      },
      {
        path: 'repasse-bancorbras',
        loadComponent: () =>
          import('./pages/repasse-bancorbras/repasse-bancorbras.component')
            .then(m => m.RepasseBancorbrasComponent)
      },
      {
        path: 'repasse-bancorbras-form',
        loadComponent: () =>
          import('./pages/repasse-bancorbras/form/repasse-bancorbras-form.component')
            .then(m => m.RepasseBancorbrasFormComponent)
      },
      {
        path: 'repasse-hs',
        loadComponent: () =>
          import('./pages/repasse-hs/repasse-hs.component')
            .then(m => m.RepasseHsComponent)
      },
      {
        path: 'repasse-hs-form',
        loadComponent: () =>
          import('./pages/repasse-hs/form/repasse-hs-form.component')
            .then(m => m.RepasseHsFormComponent)
      },
      {
        path: 'usuario',
        loadComponent: () =>
          import('./pages/usuario/usuario.component')
            .then(m => m.UsuarioComponent)
      },
      {
        path: 'usuario-form',
        loadComponent: () =>
          import('./pages/usuario/form/usuario-form.component')
            .then(m => m.UsuarioFormComponent)
      },
      {
        path: 'upload',
        loadComponent: () =>
          import('./pages/upload/upload.component')
            .then(m => m.UploadComponent)
      },
      {
        path: '',
        redirectTo: 'principal',
        pathMatch: 'full'
      }
    ]
  }
];