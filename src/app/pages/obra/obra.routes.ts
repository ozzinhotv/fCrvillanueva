import { Routes } from '@angular/router';

const OBRA_ROUTES: Routes = [
  // /obra → a tu landing general (raíz)
  { path: 'obra', redirectTo: '', pathMatch: 'full' },

  // /obra/:cat → redirección dinámica (standalone; se importa LAZY)
  {
    path: 'obra/:cat',
    loadComponent: () =>
      import('./components/redirect/redirect.component').then(m => m.ObraRedirectComponent),
  },

  // /obra/:cat/:work → detalle (standalone; se importa LAZY)
  {
    path: 'obra/:cat/:work',
    loadComponent: () =>
      import('./obra.component').then(m => m.ObraComponent),
  },
];

export default OBRA_ROUTES;
