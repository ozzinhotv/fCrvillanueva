import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { VidaComponent } from './pages/vida/vida.component';

import OBRA_ROUTES from './pages/obra/obra.routes';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'vida', component: VidaComponent },
  ...OBRA_ROUTES,
  {
    path: 'archivo',
    loadComponent: () => import('./pages/archivo/archivo.component')
      .then(m => m.ArchivoComponent),
  },
  {
    path: 'archivo/:category/:id',
    loadComponent: () => import('./pages/archivo/archivo.component')
      .then(m => m.ArchivoComponent),
  },
  { path: '**', redirectTo: '' },
];
