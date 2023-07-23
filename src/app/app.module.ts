import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "./service/apiservice";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TableModule} from 'primeng/table';

import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from "primeng/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {UtilService} from "./service/util.service";
import {CalendarModule} from 'primeng/calendar';
import {AuthInterceptor} from "./interceptors/auth.interceptor";

import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from "@stomp/ng2-stompjs";
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { HomeAppComponent } from './pages/home-app/home-app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InfinitoComponent } from './pages/infinito/infinito.component';
import { MenuMainComponent } from './pages/menu-main/menu-main.component';
import { DashboardInfinitoComponent } from './pages/dashboard-infinito/dashboard-infinito.component';
import { CajaFinitoComponent } from './pages/caja-finito/caja-finito.component';
import { CajaInfinitoComponent } from './pages/caja-infinito/caja-infinito.component';





export const myRxStompConfig: InjectableRxStompConfig = {



  brokerURL: 'ws://localhost:8080/mensajes',

  heartbeatIncoming: 0,
  heartbeatOutgoing: 0,
  reconnectDelay: 200,
  debug: (msg: string): void => {


  },




}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarComponent,
    HomeAppComponent,
    DashboardComponent,
    InfinitoComponent,
    MenuMainComponent,
    DashboardInfinitoComponent,
    CajaFinitoComponent,
    CajaInfinitoComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    DialogModule,
    ButtonModule,
    BrowserAnimationsModule,
    ToastModule,
    CalendarModule,
    FormsModule

  ],
  providers: [ApiService,MessageService,UtilService,RxStompService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },{
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]

    }

    ],
  bootstrap: [AppComponent],schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
