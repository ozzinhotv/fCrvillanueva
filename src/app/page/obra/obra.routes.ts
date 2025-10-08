import { Routes } from '@angular/router';
import { ObraComponent } from './obra.component';

const OBRA_ROUTES: Routes = [
  { path: 'obra', redirectTo: 'obra/ciudad-universitaria/aula-magna', pathMatch: 'full' },
  { path: 'obra/:cat', redirectTo: 'obra/:cat/aula-magna', pathMatch: 'full' },
  { path: 'obra/:cat/:work', component: ObraComponent },
];

export default OBRA_ROUTES;
