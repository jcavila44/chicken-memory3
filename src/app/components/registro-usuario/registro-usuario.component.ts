import { PlayersService } from './../../services/players.service';
import { Player } from './../../models/player';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication-service";
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss'],
})
export class RegistroUsuarioComponent implements OnInit {

  validateRegister = false;

  player: Player = new Player();
  public title = '../../assets/img/gif/title.gif';

  constructor(
    public authService: AuthenticationService,
    public toastController: ToastController,
    public router: Router,
    private playersService: PlayersService
    ) { }

  ngOnInit() {
  }

  async  validateRegisterUser(emailUsuario){
    this.authService.SignIn(emailUsuario.value, "*123456*")
    .then(async (res) => {
      if(this.authService.isEmailVerified) {
        this.router.navigate(['app-dashboard']);
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

  onPlay(nombreUsuario: any, emailUsuario: any, edadUsuario: any){
    this.player.name = nombreUsuario.value;
    this.player.age = edadUsuario.value;
    this.player.email = emailUsuario.value;
    this.authService.RegisterUser(this.player.email,"*123456*")
    .then((res) => {
      this.player.uid = res.user.uid;
      this.playersService.create(this.player).then(async (res) => {
        this.authService.SendVerificationMail();
        // this.router.navigate(['app-verify-email']);
      });
    }).catch((error) => {
      window.alert(error.message)
    })

  }

}
