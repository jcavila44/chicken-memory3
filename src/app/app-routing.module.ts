import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { HomePage } from './home/home.page';

const routes: Routes = [
  // { path: 'home', component: HomePage },
  // { path: 'app-registro-usuario', component: RegistroUsuarioComponent },
  // { path: '', component: HomePage },
  // { path: '**', component: HomePage },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'app-registro-usuario', component: RegistroUsuarioComponent },
  { path: 'app-dashboard', component: DashboardComponent },
  /*{
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },*/
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
