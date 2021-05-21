import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ScoreFiveComponent } from './components/score-five/score-five.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';


import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';



@NgModule({
  declarations: [AppComponent, RegistroUsuarioComponent, DashboardComponent, UserHistoryComponent, ScoreFiveComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    HttpClientModule,
    NgxDatatableModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },AngularFirestoreModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
