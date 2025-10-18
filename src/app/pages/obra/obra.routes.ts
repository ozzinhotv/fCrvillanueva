import { Routes } from '@angular/router';

const OBRA_ROUTES: Routes = [
  { path: 'obra', redirectTo: '', pathMatch: 'full' },
  {
    path: 'obra/:cat',
    loadComponent: () =>
      import('./components/redirect/redirect.component').then(m => m.ObraRedirectComponent),
  },
  {
    path: 'obra/:cat/:work',
    loadComponent: () =>
      import('./obra.component').then(m => m.ObraComponent),
  },
];

export default OBRA_ROUTES;
