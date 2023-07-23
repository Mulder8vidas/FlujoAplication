import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-caja-infinito',
  templateUrl: './caja-infinito.component.html',
  styleUrls: ['./caja-infinito.component.css']
})
export class CajaInfinitoComponent {
  FormCalculo= new FormGroup({
    FCO:new FormControl(''),
    VU:new FormControl(''),
    DEUDA:new FormControl(''),
    AI:new FormControl(''),
    VAL:new FormControl(''),
    VL:new FormControl(''),
    ku :new FormControl(''),
    kd:new FormControl(''),
    xt :new FormControl(''),
    E :new FormControl(''),
    vu :new FormControl(''),
    DE :new FormControl(''),
    KE :new FormControl(''),
    WACC :new FormControl(''),
    VO :new FormControl(''),
    Wm :new FormControl(''),
    Ke1 :new FormControl(''),
    Kdm :new FormControl(''),
    Kum :new FormControl(''),
    Gm :new FormControl(''),
    Ym :new FormControl(''),
    FCL:new FormControl(''),
    Xm :new FormControl(''),

  })
  constructor(private router:Router){

  }
  clear(){
    this.FormCalculo.reset()
  }

  dashboard() {
    window.open('/dashboard-infinito', '_blank');
  }



  infinito() {
    this.router.navigate(['/home']);
  }
}
