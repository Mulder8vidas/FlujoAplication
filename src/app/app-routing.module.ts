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




const routes: Routes = [
  {path : '', component :LoginComponent},
  {path:'registrar',component:RegistrarComponent},
  {path:'home',component:HomeAppComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'home-infinito',component:InfinitoComponent},
  {path:'main',component:MenuMainComponent},
  {path:'dashboard-infinito',component:DashboardInfinitoComponent},
  {path:'caja-infinito',component:CajaInfinitoComponent},
  {path:'caja-finito',component:CajaFinitoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
