import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ScoreFiveComponent } from './components/score-five/score-five.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { HomePage } from './home/home.page';
import { UserHistoryComponent } from './components/user-history/user-history.component';

const routes: Routes = [
  // { path: 'home', component: HomePage },
  // { path: 'app-registro-usuario', component: RegistroUsuarioComponent },
  // { path: '', component: HomePage },
  // { path: '**', component: HomePage },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'home', component: HomeComponent },
  { path: 'app-registro-usuario', component: RegistroUsuarioComponent },
  { path: 'app-dashboard', component: DashboardComponent },
  { path: 'app-score-five', component: ScoreFiveComponent },
  { path: 'app-user-history', component: UserHistoryComponent },
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
