import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router, } from '@angular/router';
import {ApiService} from "../../service/apiservice";
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
  constructor(private router:Router,private apiService:ApiService){

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

    this.apiService.datainfientrada = {
      "flujo_anual": this.FormCalculo.getRawValue().flujoanual,
      "ku": Number(this.FormCalculo.getRawValue().ku) / 100,
      "kd": Number(this.FormCalculo.getRawValue().kd) / 100,
      "xt": Number(this.FormCalculo.getRawValue().xt) / 100,
      "yde": this.FormCalculo.getRawValue().Yinput,
      "taños": this.FormCalculo.getRawValue().taños,
      "crecimiento_anual": Number(this.FormCalculo.getRawValue().gInpunt) / 100,
      "majustes": this.FormCalculo.getRawValue().majustes,
      "tasaimpuesto": Number(this.FormCalculo.getRawValue().timpuestos) / 100,
      "kua":Math.log((Number(this.FormCalculo.getRawValue().ku) / 100)+1),
      "kda":Math.log((Number(this.FormCalculo.getRawValue().kd) / 100)+1),
      "xta":Math.log((Number(this.FormCalculo.getRawValue().xt) / 100)+1),
      "delta":Math.log((Number(this.FormCalculo.getRawValue().gInpunt) / 100)+1),
      "factor:":1-Math.exp(-2*(Number(this.FormCalculo.getRawValue().gInpunt) / 100)+1),
    }

    localStorage.setItem("datainfi", JSON.stringify(this.apiService.datainfientrada))
    this.calcularData();

    window.open('/caja-infinito', '_blank');

  }
  calcularData() {
    let data = this.apiService.datainfientrada

    this.FormCalculo.controls["fTotal"].setValue(String(data.flujo_anual * (1 + data.crecimiento_anual) * (Math.pow((1 + data.crecimiento_anual), data.taños) - 1) / (data.crecimiento_anual)));
    this.FormCalculo.controls["tTotal"].setValue(String(data.majustes * data.taños));
    this.FormCalculo.controls["gmInpunt"].setValue(String(Math.pow((1 + data.crecimiento_anual), (1 / data.majustes)) - 1));
    this.FormCalculo.controls["yminput"].setValue(String(parseFloat(<string>this.FormCalculo.getRawValue().gmInpunt) / data.crecimiento_anual * Math.pow((1 + parseFloat(<string>this.FormCalculo.getRawValue().gmInpunt)), (data.majustes - 1))));
    this.FormCalculo.controls["fTotales"].setValue(String(data.flujo_anual * (parseFloat(<string>this.FormCalculo.getRawValue().yminput)) * (1 + parseFloat(<string>this.FormCalculo.getRawValue().gmInpunt)) * (Math.pow((Math.pow((1 + parseFloat(<string>this.FormCalculo.getRawValue().gmInpunt)), data.majustes)), data.taños) - 1) / parseFloat(<string>this.FormCalculo.getRawValue().gmInpunt)));
    this.FormCalculo.controls["ku1"].setValue(String(data.kua));
    this.FormCalculo.controls["kd1"].setValue(String(data.kda));
    this.FormCalculo.controls["xt1"].setValue(String(data.xta));
    this.FormCalculo.controls["factor"].setValue(String(data.factor));
    this.FormCalculo.controls["delta"].setValue(String(data.delta));
    this.apiService.datainfientrada.gm=parseFloat(<string>this.FormCalculo.getRawValue().gmInpunt)
    this.apiService.datainfientrada.ym=parseFloat(<string>this.FormCalculo.getRawValue().yminput)
    localStorage.setItem("datainfi", JSON.stringify(this.apiService.datainfientrada))
    console.log(this.FormCalculo.getRawValue());
  }
}