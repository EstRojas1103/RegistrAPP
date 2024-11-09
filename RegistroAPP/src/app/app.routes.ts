import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.page.module').then(m => m.LoginPageModule) },
  { path: 'profesor-home', loadChildren: () => import('./profesor-home/profesor-home.module').then(m => m.ProfesorHomePageModule) },
  { path: 'estudiante-home', loadChildren: () => import('./estudiante-home/estudiante-home.module').then(m => m.EstudianteHomePageModule) },
];
