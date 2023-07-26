import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../service/apiservice";

@Component({
  selector: 'app-caja-infinito',
  templateUrl: './caja-infinito.component.html',
  styleUrls: ['./caja-infinito.component.css']
})
export class CajaInfinitoComponent implements OnInit{
  formCalculo= new FormGroup({
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

  datainifinita:any;
  constructor(private router:Router,private apiService:ApiService){



  }
  clear(){
    this.formCalculo.reset()
  }

  calcularKum(data:any){
    return Math.pow((1+data.ku),(1/data.majustes))-1;
  }

  calcularKem(data:any){
    return this.calcularKum(data)+((data.yde))*(this.calcularKum(data)-this.calcularKdm(data))-(this.calcularKum(data)-this.calcularXm(data))*(this.calcularKdm(data)*data.tasaimpuesto*(data.yde))/(this.calcularXm(data)-data.gm)
  }

  calcularKdm(data:any){
    return Math.pow((1+data.kd),(1/data.majustes))-1;
  }

  calcularVl(data:any){

    return data.delta*data.flujo_anual*(1+data.crecimiento_anual)/(data.crecimiento_anual*(this.calcularWACC(data)-data.delta));

  }
  calcularWACC(data:any){
    return data.kua*(1-data.yde/(1+data.yde)*data.kda*data.tasaimpuesto/(data.xta-data.delta)*(1-data.delta/data.kua));
  }
  calcularVai(data:any){
    return data.kda*data.tasaimpuesto*data.yde*Math.pow((1+data.crecimiento_anual),1)*data.flujo_anual/((data.xta-data.crecimiento_anual)*(1+data.yde)*(this.calcularWACC(data)-data.crecimiento_anual))
  }

  calcularE(data:any){
    return Math.pow((1+data.crecimiento_anual),1)*data.flujo_anual/((1+data.yde)*(this.calcularWACC(data)-data.crecimiento_anual))
  }

  dashboard() {
    window.open('/dashboard-infinito', '_blank');
  }
  calcularKe(data:any){
    return data.kua+data.yde*(data.kua-data.kda)-(data.kua-data.xta)*data.kda*data.tasaimpuesto*data.yde/(data.xta-data.delta)
  }

  calcularVo(data:any){
    return data.delta*data.flujo_anual*(1+data.crecimiento_anual)/(data.crecimiento_anual*(this.calcularWACC(data)-data.delta));
  }

  calcularXm(data:any){
    return (Math.pow((1+data.xt),(1/data.majustes)))-1;
  }



  infinito() {
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    // @ts-ignore
    this.datainifinita=JSON.parse(localStorage.getItem("datainfi"))
    this.formCalculo.controls["FCO"].setValue(this.datainifinita.flujo_anual)
    this.formCalculo.controls["ku"].setValue(this.datainifinita.kua)
    this.formCalculo.controls["kd"].setValue(this.datainifinita.kda)
    this.formCalculo.controls["xt"].setValue(this.datainifinita.xta)
    this.formCalculo.controls["DE"].setValue(String(this.datainifinita.yde))
    this.formCalculo.controls["VL"].setValue(this.datainifinita.yde)
    this.formCalculo.controls["WACC"].setValue(String(this.calcularWACC(this.datainifinita)))
    this.formCalculo.controls["VL"].setValue(String(this.calcularVl(this.datainifinita)))
    this.formCalculo.controls["VAL"].setValue(String(this.calcularVai(this.datainifinita)))
    this.formCalculo.controls["E"].setValue(String(this.calcularE(this.datainifinita)))
    this.formCalculo.controls["VU"].setValue(String(this.calcularVl(this.datainifinita)-this.calcularVai(this.datainifinita)))
    this.formCalculo.controls["DEUDA"].setValue(String(this.calcularE(this.datainifinita)*this.datainifinita.yde))
    this.formCalculo.controls["KE"].setValue(String(this.calcularKe(this.datainifinita)))
    this.formCalculo.controls["VO"].setValue(String(this.calcularVo(this.datainifinita)))
    this.formCalculo.controls["Xm"].setValue(String(this.calcularXm(this.datainifinita)))
    this.formCalculo.controls["FCL"].setValue(String(this.datainifinita.flujo_anual))
    this.formCalculo.controls["Ym"].setValue(String(this.datainifinita.ym))
    this.formCalculo.controls["Gm"].setValue(String(this.datainifinita.gm))
    this.formCalculo.controls["Kum"].setValue(String(this.calcularKum(this.datainifinita)))
    this.formCalculo.controls["Kdm"].setValue(String(this.calcularKdm(this.datainifinita)))
    this.formCalculo.controls["Ke1"].setValue(String(this.calcularKem(this.datainifinita)))
    this.formCalculo.controls["Wm"].setValue(String(this.calcularWm(this.datainifinita)))
  }
  calcularWm(data:any){
    return (1/(1+(this.datainifinita.yde)))*this.calcularKem(data)+(this.datainifinita.yde)/(1+this.datainifinita.yde)*this.calcularKdm(data)*(1-data.tasaimpuesto);
  }
  cerrarSesion() {
    localStorage.clear();
  }
}
