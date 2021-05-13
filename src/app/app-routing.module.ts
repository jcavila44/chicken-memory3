import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { HomePage } from './home/home.page';

const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'app-registro-usuario', component: RegistroUsuarioComponent },
  { path: '', component: HomePage },
  { path: '**', component: HomePage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
