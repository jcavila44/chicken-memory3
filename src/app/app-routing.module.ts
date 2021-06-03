import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ScoreFiveComponent } from './components/score-five/score-five.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';

import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'app-registro-usuario', component: RegistroUsuarioComponent },
  { path: 'app-verify-email', component: VerifyEmailComponent },
  { path: 'app-dashboard', component: DashboardComponent ,canActivate: [AuthGuard]},
  { path: 'app-score-five', component: ScoreFiveComponent ,canActivate: [AuthGuard]},
  { path: 'app-user-history', component: UserHistoryComponent ,canActivate: [AuthGuard]},
  { path: '**', component: RegistroUsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
