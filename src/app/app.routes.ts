import { Routes } from '@angular/router';
import { LandingComponent } from './page/landing/landing.component';
import { VidaComponent } from './page/vida/vida.component';
import { ObraComponent } from './page/obra/obra.component';
import { EscritosComponent } from './page/escritos/escritos.component';

import OBRA_ROUTES from './page/obra/obra.routes';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'vida',
    component: VidaComponent
  },
  ...OBRA_ROUTES,
  {
    path: 'escritos',
    component: EscritosComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
