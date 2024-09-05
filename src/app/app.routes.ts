import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', // este es el path inicial de la aplicación
    redirectTo: '/contacts', // redirige a la ruta /contacts
    pathMatch: 'full' // redirige a la ruta /contacts cuando la ruta es vacía
  },
  {
    path: 'contacts', // esta es la ruta /contacts
    loadChildren: () => import('./features/contacts/contacts.routes')
  },
  {
    path: "**", // cualquier otra ruta no definida
    redirectTo: '/contacts' // redirige a la ruta /contacts
  }

];
