import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/list-heros',
    pathMatch: 'full'
  },
  {
    path: 'list-heros',
    loadChildren: ()=> import('./features/list-heros/heros.routes')
  },
  {
    path: '**',
    redirectTo: '/list-heros',
  }
];
