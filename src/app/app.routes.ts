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
        path: 'repasse-bancorbras',
        loadComponent: () =>
          import('./pages/repasse-bancorbras/repasse-bancorbras.component')
            .then(m => m.RepasseBancorbrasComponent)
      },
      {
        path: 'repasse-hs',
        loadComponent: () =>
          import('./pages/repasse-hs/repasse-hs.component')
            .then(m => m.RepasseHsComponent)
      },
      {
        path: 'usuario',
        loadComponent: () =>
          import('./pages/usuario/usuario.component')
            .then(m => m.UsuarioComponent)
      },
      {
        path: '',
        redirectTo: 'principal',
        pathMatch: 'full'
      }
    ]
  }
];