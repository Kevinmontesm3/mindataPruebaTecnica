import { Routes } from '@angular/router';

const herosRoute:Routes = [
  {
    path : '',
    loadComponent: () =>
      import('./list-heros.component').then((m) => m.ListHerosComponent),
  },
  {
    path : 'detail/:id',
    loadComponent: () =>
      import('../detail-hero/detail-hero.component').then((m) => m.DetailHeroComponent),
  }
]
export default herosRoute;
