import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router, } from '@angular/router';
@Component({
  selector: 'app-infinito',
  templateUrl: './infinito.component.html',
  styleUrls: ['./infinito.component.css']
})
export class InfinitoComponent {
  FormCalculo= new FormGroup({
    flujoanual :new FormControl('',Validators.required),
    ku :new FormControl('',Validators.required),
    kd:new FormControl('',Validators.required),
    xt :new FormControl('',Validators.required),
    Yinput :new FormControl('',Validators.required),
    taños :new FormControl('',Validators.required),
    gInpunt :new FormControl('',Validators.required),

    majustes:new FormControl ('',Validators.required),
    tTotal: new FormControl({ value: '', disabled: true }),
    delta: new FormControl({ value: '', disabled: true }),
    factor: new FormControl({ value: '', disabled: true }),
    gmInpunt:new FormControl({ value: '', disabled: true }),
    yminput:new FormControl({ value: '', disabled: true }),
    fTotales:new FormControl({ value: '', disabled: true }),
    fTotal:new FormControl({ value: '', disabled: true }),
    ku1:new FormControl({ value: '', disabled: true }),
    kd1:new FormControl({ value: '', disabled: true }),
    xt1:new FormControl({ value: '', disabled: true }),
    timpuestos:new FormControl('',Validators.required),
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

  calcular() {
    window.open('/caja-infinito', '_blank');

  }
}
