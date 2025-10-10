import { Routes } from '@angular/router';
import { LandingComponent } from './page/landing/landing.component';
import { VidaComponent } from './page/vida/vida.component';
import { ArchivoComponent } from './page/archivo/archivo.component';

import OBRA_ROUTES from './page/obra/obra.routes';

export const routes: Routes = [
  { path: '', component: LandingComponent },   // landing general
  { path: 'vida', component: VidaComponent },
  ...OBRA_ROUTES,                              // << aquí expandimos las de Obra
  { path: 'archivo', component: ArchivoComponent },
  { path: '**', redirectTo: '' },
];
