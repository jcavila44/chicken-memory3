import { async } from '@angular/core/testing';
import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/app';
import { User } from "./../models/user";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: any;
  authState = new BehaviorSubject(false);

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public auth: AngularFireAuth,
    public toastController: ToastController,
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        this.authState.next(true);
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Login in with email/password
  SignIn(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  // Register user with email/password
  RegisterUser(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  // Email verification when new user register
  SendVerificationMail() {
    return this.auth.currentUser.then(
      u => u?.sendEmailVerification())
    .then(async() => {
      const toast = await this.toastController.create({
        message: 'Debe verificar el email',
        color: 'tertiary',
        duration: 2000
      });
      toast.present();
      // this.router.navigate(['app-verify-email']);
    })
  }


  // Recover password
  PasswordRecover(passwordResetEmail) {
    return this.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email has been sent, please check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

    // Returns true when user is looged in
    get LoggedData(): any {
      const user = JSON.parse(localStorage.getItem('user'));
      return (user !== null && user.emailVerified !== false) ? user : false;
    }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth providers
  AuthLogin(provider) {
    return this.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
        setTimeout(() =>
        {
          this.router.navigate(['app-dashboard']);
          this.authState.next(true);
        },
        100);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

   // Sign in with faceboock
  FBAuth() {
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
  }
   // Sign in with twitter
  TwitterAuth() {
    return this.AuthLogin(new firebase.auth.TwitterAuthProvider());
  }

  // Store user in localStorage
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign-out
  SignOut() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['app-registro-usuario']);
      this.authState.next(false);
    })
  }

}
