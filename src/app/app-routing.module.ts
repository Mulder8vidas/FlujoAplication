import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";

import {RegistrarComponent} from "./pages/registrar/registrar.component";
import {HomeAppComponent} from "./pages/home-app/home-app.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {InfinitoComponent} from "./pages/infinito/infinito.component";
import {MenuMainComponent} from "./pages/menu-main/menu-main.component";
import {DashboardInfinitoComponent} from "./pages/dashboard-infinito/dashboard-infinito.component";
import {CajaInfinitoComponent} from "./pages/caja-infinito/caja-infinito.component";
import {CajaFinitoComponent} from "./pages/caja-finito/caja-finito.component";
import {tokenGuard} from "./token.guard";
import {SimuladorPerpetuoComponent} from "./pages/simulador-perpetuo/simulador-perpetuo.component";
import {CrearSimulacionComponent} from "./pages/crear-simulacion/crear-simulacion.component";
import {CrearSimulacionFinitoComponent} from "./pages/crear-simulacion-finito/crear-simulacion-finito.component";




const routes: Routes = [
  {path : '', component :LoginComponent},
  {path:'registrar',component:RegistrarComponent,canActivate:[tokenGuard]},
  {path:'home',component:HomeAppComponent,canActivate:[tokenGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate:[tokenGuard]},
  {path:'home-infinito',component:InfinitoComponent,canActivate:[tokenGuard]},
  {path:'main',component:MenuMainComponent,canActivate:[tokenGuard]},
  {path:'dashboard-infinito',component:DashboardInfinitoComponent,canActivate:[tokenGuard]},
  {path:'caja-infinito',component:CajaInfinitoComponent,canActivate:[tokenGuard]},
  {path:'caja-finito',component:CajaFinitoComponent,canActivate:[tokenGuard]},
  {path:'simulador',component:SimuladorPerpetuoComponent,canActivate:[tokenGuard]},
  {path:'crear-simulacion',component:CrearSimulacionComponent},
  {path:'crear-simulacion-finito',component:CrearSimulacionFinitoComponent},
  {path:'**',component:LoginComponent,canActivate:[tokenGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
