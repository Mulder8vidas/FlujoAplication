import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";


export interface TablaCalculo{
  majustes:any,
  ln:any,
  vl:number,
  variacion:number,
  percent:number,
  infinito:number,
  datamajustes:any,
  wm:number,
  ke:number,
  kdm:number,
  kum:number,
  vo69:number,
  grupodata:any
}

@Injectable({
  providedIn: 'root'
})
export class SimulacionService {

  _data:BehaviorSubject<any>=new BehaviorSubject<boolean>(false);
  public data$=this._data.asObservable();

  public listAllSimulaciones:any[]=[];
  public countAllSimulaciones:number=1;


  _ajusteagrado:BehaviorSubject<any>=new BehaviorSubject<number>(0);
  public ajusteagrado$=this._ajusteagrado.asObservable();

  public listMajustes:any[]=[];
  public listaSimulaciones: TablaCalculo[] = [];

  public formGroup: FormGroup= new FormGroup({
    fcl: new FormControl('100000', Validators.required),
    ku: new FormControl('30', Validators.required),
    kd: new FormControl('15', Validators.required),
    xt: new FormControl('15', Validators.required),
    Yinput: new FormControl('0.4', Validators.required),
    taños: new FormControl('1', Validators.required),
    gInpunt: new FormControl('1', Validators.required),
    ftotal: new FormControl({value: '', disabled: true}),
    timpuestos: new FormControl({value: '30', disabled: false}),

  })

  constructor() {

    this.formGroup.valueChanges.subscribe(value => {






    })

  }

  calcular(){
    let value=this.formGroup.getRawValue();
    this.formGroup.controls['ftotal'].setValue(this.calcularFtotal((value.gInpunt/100),value.taños,value.fcl), {emitEvent: false})
    this.listMajustes.push(value);
  }

  cambiarVariable(){
    this.listMajustes.push(this.formGroup.getRawValue());
    this._ajusteagrado.next(0);
  }





  calcularSimulacion(data:any,currentFormGroup:FormGroup){


    /*"crecimiento_anual": Number(this.FormCalculo.getRawValue().gInpunt) / 100,*/
    currentFormGroup.controls["tTotal"].setValue(currentFormGroup.getRawValue().majustes*this.formGroup.getRawValue().taños, {emitEvent: false});
    currentFormGroup.controls["gmInpunt"].setValue(String(Math.pow((1 + (Number(this.formGroup.getRawValue().gInpunt) / 100)), (1 / currentFormGroup.getRawValue().majustes)) - 1));
    currentFormGroup.controls["yminput"].setValue(String(parseFloat(<string>currentFormGroup.getRawValue().gmInpunt) / (Number(this.formGroup.getRawValue().gInpunt) / 100) * Math.pow((1 + parseFloat(<string>currentFormGroup.getRawValue().gmInpunt)), (data.majustes - 1))));
    currentFormGroup.controls["ftotales"].setValue(String(this.formGroup.getRawValue().fcl * (parseFloat(<string>currentFormGroup.getRawValue().yminput)) * (1 + parseFloat(<string>currentFormGroup.getRawValue().gmInpunt)) * (Math.pow((Math.pow((1 + parseFloat(<string>currentFormGroup.getRawValue().gmInpunt)), data.majustes)), this.formGroup.getRawValue().taños) - 1) / parseFloat(<string>currentFormGroup.getRawValue().gmInpunt)));
    currentFormGroup.controls["ku"].setValue(Math.log((Number(this.formGroup.getRawValue().ku) / 100)+1), {emitEvent: false});
    currentFormGroup.controls["kd"].setValue(Math.log((Number(this.formGroup.getRawValue().kd) / 100)+1), {emitEvent: false});
    currentFormGroup.controls["xt"].setValue(Math.log((Number(this.formGroup.getRawValue().xt) / 100)+1), {emitEvent: false});
    currentFormGroup.controls["delta"].setValue(Math.log((Number(this.formGroup.getRawValue().gInpunt) / 100)+1), {emitEvent: false});
    currentFormGroup.controls["timpuestos"].setValue(this.formGroup.getRawValue().timpuestos/100, {emitEvent: false});
    currentFormGroup.controls["factor"].setValue(1-(Math.exp(-2*(this.calcularWACC(currentFormGroup.getRawValue())-Number(currentFormGroup.getRawValue().delta)))), {emitEvent: false});

    let  wm=this.calcularWm(currentFormGroup);
    let ke=this.calcularKem(currentFormGroup);
    let kdm=this.calcularKdm(currentFormGroup);
    let kum=this.calcularKum(currentFormGroup);



   this.listaSimulaciones=this.listaSimulaciones.filter(a=>a.majustes!="%")


    this.listaSimulaciones.push({
      datamajustes:this.formGroup.getRawValue(),
      majustes:data.majustes,
      ln:Math.log(data.majustes),
      vl:this.calcularVa69(currentFormGroup),
      variacion:0,
      percent:0,
      infinito:0,
      wm:wm,
      ke:ke,
      kdm:kdm,
      kum:kum,
      vo69:this.calcularVa69(currentFormGroup),
      grupodata:currentFormGroup.getRawValue()

    })


    if(this.listaSimulaciones.length>1){

      this.listaSimulaciones=this.listaSimulaciones.map((value, index) => {

        if(index>0){

          value.variacion=value.vl-this.listaSimulaciones[0].vl;
          value.percent=(value.vl-this.listaSimulaciones[0].vl)/this.listaSimulaciones[0].vl;





        }
        return value;

      })



    }

    this.listaSimulaciones.push({
      datamajustes:currentFormGroup.getRawValue(),
      majustes:"%",
      ln:"",
      vl:this.calcularVo(currentFormGroup),
      variacion:0,
      percent:0,
      infinito:0,
      wm:0,
      ke:0,
      kdm:0,
      kum:0,
      vo69:this.calcularVa69(currentFormGroup),
      grupodata:currentFormGroup.getRawValue()

    })

    this.listaSimulaciones.forEach((value, index) => {

      if(index>0 && index!=this.listaSimulaciones.length-1){

        if(index==this.listaSimulaciones.length-2){
            value.infinito=value.percent;
        }else{
          value.infinito=this.listaSimulaciones[this.listaSimulaciones.length-2].percent
        }


      }
      if(index==this.listaSimulaciones.length-1){

          value.infinito=this.listaSimulaciones[this.listaSimulaciones.length-2].percent
        value.variacion=value.vl-this.listaSimulaciones[0].vl;
        value.percent=(value.vl-this.listaSimulaciones[0].vl)/this.listaSimulaciones[0].vl;
      }

    })

    this._data.next(false);
    this._ajusteagrado.next(0);





  }

  private calcularFtotal(gInpunt:any, taños:any,fcl:any) {

    return fcl*(1+gInpunt)*(Math.pow((1+gInpunt),(taños))-1)/gInpunt
  }
  calcularKdm(currentFormGroup:any){
    return Math.pow((1+this.formGroup.getRawValue().kd/100),(1/currentFormGroup.getRawValue().majustes))-1;
  }
  calcularKum(currentFormGroup:any){
    return Math.pow((1+this.formGroup.getRawValue().ku/100),(1/currentFormGroup.getRawValue().majustes))-1;
  }
  calcularKem(currentFormGroup:any){
    return this.calcularKum(currentFormGroup)+((parseFloat(this.formGroup.getRawValue().Yinput)))*(this.calcularKum(currentFormGroup)-this.calcularKdm(currentFormGroup))-(this.calcularKum(currentFormGroup)-this.calcularXm(currentFormGroup))*(this.calcularKdm(currentFormGroup)*(this.formGroup.getRawValue().timpuestos/100)*(this.formGroup.getRawValue().Yinput))/(this.calcularXm(currentFormGroup)-
      parseFloat(<string>currentFormGroup.controls["gmInpunt"].value))
  }
  calcularXm(currentFormGroup:any){
    return (Math.pow((1+this.formGroup.getRawValue().xt/100),(1/currentFormGroup.getRawValue().majustes)))-1;
  }
  calcularWm(currentFormGroup:any){
    return (1/(1+(parseFloat(this.formGroup.getRawValue().Yinput))))*this.calcularKem(currentFormGroup)+(parseFloat(this.formGroup.getRawValue().Yinput))/(1+parseFloat(this.formGroup.getRawValue().Yinput))*this.calcularKdm(currentFormGroup)*(1-(this.formGroup.getRawValue().timpuestos/100));
  }
  calcularWACC(data:any){
    return data.ku*(1-this.formGroup.getRawValue().Yinput/(1+parseFloat(this.formGroup.getRawValue().Yinput))*data.kd*data.timpuestos/(data.xt-data.delta)*(1-data.delta/data.ku));
  }

  calcularVa69(currentFormGroup:any){
    return (1+parseFloat(<string>currentFormGroup.controls["gmInpunt"].value))*parseFloat(<string>currentFormGroup.controls["yminput"].value)*this.formGroup.getRawValue().fcl/
      ((this.calcularWm(currentFormGroup))-parseFloat(<string>currentFormGroup.controls["gmInpunt"].value))
  }
  calcularVo(data:any){
    let datas= data.getRawValue().delta*this.formGroup.getRawValue().fcl*(1+Number(this.formGroup.getRawValue().gInpunt/100))/((this.formGroup.getRawValue().gInpunt/100)*(this.calcularWACC(data.getRawValue())-data.getRawValue().delta));
    console.log(datas)
    return datas;
  }
}
