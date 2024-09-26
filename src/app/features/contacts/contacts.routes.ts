import { Routes } from '@angular/router';

const contactsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/list.component').then((m) => m.ListComponent)
  }

]

export default contactsRoutes;
