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
    ttot :new FormControl({value:'1',disabled:true}),

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
    ttaños:new FormControl({value:'',disabled:false}),
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
      "tasaimpuesto": Number(this.FormCalculo.getRawValue().taños) / 100,
      "kua":Math.log((Number(this.FormCalculo.getRawValue().ku) / 100)+1),
      "kda":Math.log((Number(this.FormCalculo.getRawValue().kd) / 100)+1),
      "xta":Math.log((Number(this.FormCalculo.getRawValue().xt) / 100)+1),
      "delta":Math.log((Number(this.FormCalculo.getRawValue().gInpunt) / 100)+1),
      "factor":1-(Math.exp(-2*(Number(this.FormCalculo.getRawValue().gInpunt))+1)),
      ttaños:this.FormCalculo.getRawValue().ttaños,
    }

    localStorage.setItem("datainfi", JSON.stringify(this.apiService.datainfientrada))
    this.calcularData();


  }
  calculate=false;

  datainifinita:any;
  calcularData() {



    let data = this.apiService.datainfientrada
    this.datainifinita=data;
    this.datainifinita=JSON.parse(JSON.stringify(data));
    this.FormCalculo.controls["timpuestos"].setValue(String(data.taños/100));
    this.FormCalculo.controls["fTotal"].setValue(String(data.flujo_anual * (1 + data.crecimiento_anual) * (Math.pow((1 + data.crecimiento_anual), data.taños) - 1) / (data.crecimiento_anual)));
    this.FormCalculo.controls["tTotal"].setValue(String(data.majustes * data.ttaños));
    this.FormCalculo.controls["gmInpunt"].setValue(String(Math.pow((1 + data.crecimiento_anual), (1 / data.majustes)) - 1));
    this.FormCalculo.controls["yminput"].setValue(String(parseFloat(<string>this.FormCalculo.getRawValue().gmInpunt) / data.crecimiento_anual * Math.pow((1 + parseFloat(<string>this.FormCalculo.getRawValue().gmInpunt)), (data.majustes - 1))));
    this.FormCalculo.controls["fTotales"].setValue(String(data.flujo_anual * (parseFloat(<string>this.FormCalculo.getRawValue().yminput)) * (1 + parseFloat(<string>this.FormCalculo.getRawValue().gmInpunt)) * (Math.pow((Math.pow((1 + parseFloat(<string>this.FormCalculo.getRawValue().gmInpunt)), data.majustes)), data.taños) - 1) / parseFloat(<string>this.FormCalculo.getRawValue().gmInpunt)));
    this.FormCalculo.controls["ku1"].setValue(String(data.kua));
    this.FormCalculo.controls["kd1"].setValue(String(data.kda));
    this.FormCalculo.controls["xt1"].setValue(String(data.xta));
    this.FormCalculo.controls["delta"].setValue(String(data.delta));
    this.apiService.datainfientrada.gm=parseFloat(<string>this.FormCalculo.getRawValue().gmInpunt)
    this.apiService.datainfientrada.ym=parseFloat(<string>this.FormCalculo.getRawValue().yminput)



    this.FormCalculo.controls["kdm"].setValue(String(this.calcularKdm(this.datainifinita)))
    this.FormCalculo.controls["kum"].setValue(String(this.calcularKum(this.datainifinita)))
    this.FormCalculo.controls["xminput"].setValue(String(this.calcularXm(this.datainifinita)))
    this.FormCalculo.controls["Deinput"].setValue(String(this.datainifinita.yde))
    this.FormCalculo.controls["keinput"].setValue(String(this.calcularKe(this.datainifinita)))
    this.FormCalculo.controls["wacc"].setValue(String(this.calcularWACC(this.datainifinita)))
    this.FormCalculo.controls["wmInpunt"].setValue(String(this.calcularWm(this.datainifinita)))
    this.FormCalculo.controls["Vo"].setValue(String(this.calcularVo(this.datainifinita)))
    this.FormCalculo.controls["Voinput"].setValue(String(this.calcularVa69(this.datainifinita)))
    this.FormCalculo.controls["FCL"].setValue(this.datainifinita.flujo_anual)
    this.FormCalculo.controls["kuinput"].setValue(String(this.datainifinita.kua))
    this.FormCalculo.controls["kdinput"].setValue(String(this.datainifinita.kda))
    this.FormCalculo.controls["xtinput"].setValue(String(this.datainifinita.xta))
    this.FormCalculo.controls["keinpunt"].setValue(String(this.calcularKem(this.datainifinita)))
    this.FormCalculo.controls["Einput"].setValue(String(this.calcularE(this.datainifinita)))
    this.FormCalculo.controls["VAI"].setValue(String(this.calcularVai(this.datainifinita)))
    this.FormCalculo.controls["Dinput"].setValue(String(this.calcularE(this.datainifinita)*this.datainifinita.yde))
    this.FormCalculo.controls["vu"].setValue(String(this.calcularVo(this.datainifinita)-this.calcularVai(this.datainifinita)))
    this.FormCalculo.controls["factor"].setValue(String(1-(Math.exp(-2*(this.calcularWACC(this.datainifinita)-data.delta)))));
    this.FormCalculo.controls["totalfinal"].setValue(String(this.calcularVo(this.datainifinita)*parseFloat(<string>this.FormCalculo.controls["factor"].value)));









  this.calculate=true;






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


  calcularKum(data:any){
    return Math.pow((1+data.ku),(1/data.majustes))-1;
  }

  calcularKem(data:any){
    return this.calcularKum(data)+((parseFloat(data.yde)))*(this.calcularKum(data)-this.calcularKdm(data))-(this.calcularKum(data)-this.calcularXm(data))*(this.calcularKdm(data)*data.tasaimpuesto*(data.yde))/(this.calcularXm(data)-
      parseFloat(<string>this.FormCalculo.controls["gmInpunt"].value))
  }

  calcularKdm(data:any){
    return Math.pow((1+data.kd),(1/data.majustes))-1;
  }

  calcularVl(data:any){

    return data.delta*data.flujo_anual*(1+data.crecimiento_anual)/(data.crecimiento_anual*(this.calcularWACC(data)-data.delta));

  }
  calcularWACC(data:any){
    return data.kua*(1-data.yde/(1+parseFloat(data.yde))*data.kda*data.tasaimpuesto/(data.xta-data.delta)*(1-data.delta/data.kua));
  }
  calcularVai(data:any){
    return data.kda*data.tasaimpuesto*data.yde*Math.pow((1+parseFloat(data.crecimiento_anual)),1)*data.flujo_anual/((data.xta-data.crecimiento_anual)*(1+parseFloat(data.yde))*(this.calcularWACC(data)-data.crecimiento_anual))
  }

  calcularE(data:any){
    return Math.pow((1+parseFloat(data.crecimiento_anual)),1)*data.flujo_anual/((1+parseFloat(data.yde))*(this.calcularWACC(data)-data.crecimiento_anual))
  }


  calcularKe(data:any){



     return parseFloat(data.kua)+parseFloat(data.yde)*(data.kua-data.kda)-(data.kua-data.xta)*data.kda*data.tasaimpuesto*data.yde/(data.xta-data.delta)
    //use parseFloat to  all variables





  }

  calcularVo(data:any){
    return data.delta*data.flujo_anual*(1+data.crecimiento_anual)/(data.crecimiento_anual*(this.calcularWACC(data)-data.delta));
  }
  calcularVa69(data:any){
    return (1+parseFloat(<string>this.FormCalculo.controls["gmInpunt"].value))*parseFloat(<string>this.FormCalculo.controls["yminput"].value)*data.flujo_anual/
      (parseFloat(<string>this.FormCalculo.controls["wmInpunt"].value)-parseFloat(<string>this.FormCalculo.controls["gmInpunt"].value))
  }

  calcularXm(data:any){
    return (Math.pow((1+data.xt),(1/data.majustes)))-1;
  }
  calcularWm(data:any){
    return (1/(1+(parseFloat(this.apiService.datainfientrada.yde))))*this.calcularKem(data)+(parseFloat(this.apiService.datainfientrada.yde))/(1+parseFloat(this.apiService.datainfientrada.yde))*this.calcularKdm(data)*(1-data.tasaimpuesto);
  }


}
