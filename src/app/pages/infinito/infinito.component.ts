import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router, } from '@angular/router';
import {ApiService} from "../../service/apiservice";
import {DecimalPipe} from "@angular/common";
import {MenuItem, MessageService} from "primeng/api";
import {Format} from "@angular-devkit/build-angular/src/builders/extract-i18n/schema";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import backgroundColor = _default.defaults.backgroundColor;
@Component({
  selector: 'app-infinito',
  templateUrl: './infinito.component.html',
  styleUrls: ['./infinito.component.css']
})
export class InfinitoComponent implements OnInit{

  FormCalculo= new FormGroup({
    flujoanual :new FormControl('',Validators.required),
    ku :new FormControl('',Validators.required),
    kd:new FormControl('',Validators.required),
    xt :new FormControl('',Validators.required),
    Yinput :new FormControl('',Validators.required),
    taños :new FormControl('',Validators.required),
    gInpunt :new FormControl('',Validators.required),
    ttot :new FormControl('',Validators.required),

    majustes:new FormControl ('',Validators.required),
    FCL:new FormControl({value:'',disabled:true}),
    vu:new FormControl({value:'',disabled:true}),
    Dinput:new FormControl({value:'',disabled:true}),
    Einput:new FormControl({value:'',disabled:true}),
    VAI:new FormControl({value:'',disabled:true}),
    Vo:new FormControl({value:'',disabled:true}),
    Voinput:new FormControl({value:'',disabled:true}),
    xtinput:new FormControl({value:'',disabled:true}),
    kdinput:new FormControl({value:'',disabled:true}),
    kuinput:new FormControl({value:'',disabled:true}),
    keinput:new FormControl({value:'',disabled:true}),
    Deinput:new FormControl({value:'',disabled:true}),
    wacc:new FormControl({value:'',disabled:true}),
    ttaños:new FormControl({value:'',disabled:true}),
    wmInpunt:new FormControl({value:'',disabled:true}),
    keinpunt:new FormControl({value:'',disabled:true}),
    kdm:new FormControl({value:'',disabled:true}),
    timpuestos:new FormControl({value:'',disabled:true}),
    kum:new FormControl({ value: '', disabled: true }),
    xminput :new FormControl({value:'',disabled:true}),
    totalfinal:new FormControl({value:'',disabled:true}),

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

  })
  items: MenuItem[]=[];
  constructor(private router:Router,private apiService:ApiService,private decimalPipe: DecimalPipe,private messageService: MessageService){

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
      "factor":1-(Math.exp(-2*(Number(this.FormCalculo.getRawValue().gInpunt))+1)),
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
    console.log(data.factor)
    this.FormCalculo.controls["factor"].setValue(String(data.factor));
    this.FormCalculo.controls["delta"].setValue(String(data.delta));
    this.apiService.datainfientrada.gm=parseFloat(<string>this.FormCalculo.getRawValue().gmInpunt)
    this.apiService.datainfientrada.ym=parseFloat(<string>this.FormCalculo.getRawValue().yminput)
    localStorage.setItem("datainfi", JSON.stringify(this.apiService.datainfientrada))










    this.applyFormat('flujoanual',2)


    this.applyFormat('gmInpunt',6)
    this.applyFormat('yminput',6)
    this.applyFormat('ku1',6)
    this.applyFormat('kd1',6)
    this.applyFormat('xt1',6)
    this.applyFormat('fTotal',2)
    this.applyFormat('fTotales',2)









  }
  cerrarSesion() {
    localStorage.clear();
    this.router.navigate([''])
  }

  applyFormat(controlName: string,decimal:number) {
    const control = this.FormCalculo.get(controlName);
    if (control && control.value !== null) {
      const parsedValue = this.parseInput(control.value);
      const formattedValue = this.formatValue(parsedValue,decimal);
      console.log(controlName)
      console.log(formattedValue)
      control.setValue(formattedValue, { emitEvent: false });
    }
  }

  private parseInput(value: string): number {
    return parseFloat(value.replace(/,/g, ''));
  }



  private formatValue(value: number,decimal:number): string {
    return this.decimalPipe.transform(value, '1.2-'+decimal) || '';
  }

  ngOnInit(): void {




  }
}
