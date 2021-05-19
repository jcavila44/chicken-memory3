import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../shared/authentication-service";
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss'],
})
export class RegistroUsuarioComponent implements OnInit {

  validateRegister = false;
  constructor(
    public authService: AuthenticationService,
    public toastController: ToastController,
    public router: Router
    ) { }

  ngOnInit() {
  }

  async  validateRegisterUser(emailUsuario){
    this.authService.SignIn(emailUsuario.value, "*123456*")
    .then(async (res) => {
      if(this.authService.isEmailVerified) {
        this.router.navigate(['dashboard']);
      } else {
        const toast = await this.toastController.create({
          message: 'Email no verificado',
          color: 'danger',
          duration: 2000
        });
        toast.present();
        return false;
      }
    }).catch(async (error) => {
      console.log("Error: ",error);

      if(error.code == 'auth/wrong-password'){
        const toast = await this.toastController.create({
          message: 'El ingrese por favor con redes sociales.',
          color: 'tertiary',
          duration: 2000
        });
        toast.present();
      }else if(error.code == 'auth/user-not-found'){
        this.validateRegister = true;
      }else{
        const toast = await this.toastController.create({
          message: error.message,
          color: 'danger',
          duration: 2000
        });
        toast.present();
      }
    })
  }

}
