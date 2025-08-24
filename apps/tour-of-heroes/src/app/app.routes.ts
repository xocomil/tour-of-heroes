import { Route } from '@angular/router';
import { HeroesComponent } from '@toh/ui';

export const appRoutes: Route[] = [
  {
    path: 'heroes',
    component: HeroesComponent,
  },
  {
    path: '**',
    loadComponent: () =>
      import('../components/empty.component').then((m) => m.EmptyComponent),
  },
];
