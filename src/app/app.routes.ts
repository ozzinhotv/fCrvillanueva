import { Routes } from '@angular/router';
import { LandingComponent } from './page/landing/landing.component';
import { VidaComponent } from './page/vida/vida.component';

import OBRA_ROUTES from './page/obra/obra.routes';

export const routes: Routes = [
  { path: '', component: LandingComponent },   // landing general
  { path: 'vida', component: VidaComponent },
  ...OBRA_ROUTES,
  {
    path: 'archivo',
    loadComponent: () => import('./page/archivo/archivo.component')
      .then(m => m.ArchivoComponent),
  },
  {
    path: 'archivo/:category/:id',
    loadComponent: () => import('./page/archivo/archivo.component')
      .then(m => m.ArchivoComponent),
  },
  { path: '**', redirectTo: '' },
];
