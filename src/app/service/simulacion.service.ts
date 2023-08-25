import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, forkJoin} from "rxjs";
import {ApiService} from "./apiservice";


export interface TablaCalculo {
  majustes: any,
  ln: any,
  vl: number,
  variacion: number,
  percent: number,
  infinito: number,
  wm: number,
  ke: number,
  kdm: number,
  kum: number,
  vo69: number,
  grupodata: any
}

export interface listaSimulacion {
  flujodata: any,
  listaAjustes: any[];
  nombreSimulacion:string;
}

@Injectable({
  providedIn: 'root'
})
export class SimulacionService {

  _data: BehaviorSubject<any> = new BehaviorSubject<boolean>(false);
  public data$ = this._data.asObservable();

  public listAllSimulaciones: listaSimulacion[] = [];


  _ajusteagrado: BehaviorSubject<any> = new BehaviorSubject<number>(0);
  public ajusteagrado$ = this._ajusteagrado.asObservable();

  public listMajustes: any[] = [];
  public listaSimulaciones: TablaCalculo[] = [];

  public formGroup: FormGroup = new FormGroup({
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

  constructor(private cajaService:ApiService) {

    this.formGroup.valueChanges.subscribe(value => {


    })

  }

  calcular() {
    let value = this.formGroup.getRawValue();
    this.formGroup.controls['ftotal'].setValue(this.calcularFtotal((value.gInpunt / 100), value.taños, value.fcl), {emitEvent: false})
    this.formGroup.disable()

    if(this.listAllSimulaciones.length==0){
      this.listAllSimulaciones.push({
        flujodata: this.formGroup.getRawValue(),
        listaAjustes: this.listaSimulaciones,
        nombreSimulacion:"Inicial"
      });
    }


  }
  calcularFinito(){
    let value = this.formGroup.getRawValue();
    /*this.formGroup.controls['ftotal'].setValue(this.calcularFtotal((value.gInpunt / 100), value.taños, value.fcl), {emitEvent: false})*/
    this.formGroup.disable()
    if(this.listAllSimulaciones.length==0){
      this.listAllSimulaciones.push({
        flujodata: this.formGroup.getRawValue(),
        listaAjustes: this.listaSimulaciones,
        nombreSimulacion:"Inicial"
      });
    }
  }



  calcularActual(formGroup:any){
    let value = formGroup.getRawValue();
    formGroup.controls['ftotal'].setValue(this.calcularFtotal((value.gInpunt / 100), value.taños, value.fcl), {emitEvent: false})
  }

  cambiarVariable() {

    if (this.listAllSimulaciones.length > 0) {

      let nuevadata:listaSimulacion=JSON.parse(JSON.stringify(this.listAllSimulaciones[0]));

      nuevadata.listaAjustes=nuevadata.listaAjustes.filter(a=>{
        return a.majustes!="%"
      })
     nuevadata.nombreSimulacion="Simulacion "+(this.listAllSimulaciones.length);

      this.listAllSimulaciones.push(nuevadata);

      this._ajusteagrado.next(0);
    }


  }


  calcularSimulacionActual(nuevadata: any,  initvalue: listaSimulacion) {




    initvalue.flujodata = nuevadata;
    let formGroup = initvalue.flujodata;
    initvalue.listaAjustes.map(value => {


      let data=value.grupodata

      data["tTotal"] = (data.majustes * formGroup.taños);
      data["gmInpunt"] = (String(Math.pow((1 + (Number(formGroup.gInpunt) / 100)), (1 / data.majustes)) - 1));
      data["yminput"] = (String(parseFloat(<string>data.gmInpunt) / (Number(formGroup.gInpunt) / 100) * Math.pow((1 + parseFloat(<string>data.gmInpunt)), (data.majustes - 1))));
      data["ftotales"] = (String(formGroup.fcl * (parseFloat(<string>data.yminput)) * (1 + parseFloat(<string>data.gmInpunt)) * (Math.pow((Math.pow((1 + parseFloat(<string>data.gmInpunt)), data.majustes)), formGroup.taños) - 1) / parseFloat(<string>data.gmInpunt)));
      data["ku"] = (Math.log((Number(formGroup.ku) / 100) + 1));
      data["kd"] = (Math.log((Number(formGroup.kd) / 100) + 1));
      data["xt"] = (Math.log((Number(formGroup.xt) / 100) + 1));
      data["delta"] = (Math.log((Number(formGroup.gInpunt) / 100) + 1));
      data["timpuestos"] = (formGroup.timpuestos / 100);
      data["factor"] = (1 - (Math.exp(-2 * (this.calcularWACC(data, formGroup) - Number(data.delta)))));

      let wm = this.calcularWm(data, formGroup);
      let ke = this.calcularKem(data, formGroup);
      let kdm = this.calcularKdm(data, formGroup);
      let kum = this.calcularKum(data, formGroup);

      value.wm = wm;
      value.ke = ke;
      value.kdm = kdm;
      value.kum = kum;
      value.vl= this.calcularVa69(data, formGroup);
      value.ln=Math.log(data.majustes);
      value.vo69=this.calcularVa69(data, formGroup);
      value.grupodata=data;



      return value;
    })







    if (initvalue.listaAjustes.length > 1) {

      initvalue.listaAjustes = initvalue.listaAjustes.map((value, index) => {

        if (index > 0) {

          value.variacion = value.vl - initvalue.listaAjustes[0].vl;
          value.percent = (value.vl - initvalue.listaAjustes[0].vl) / initvalue.listaAjustes[0].vl;


        }
        return value;

      })


    }


    initvalue.listaAjustes=initvalue.listaAjustes.map((value, index) => {



        if (index == initvalue.listaAjustes.length - 2) {
          value.infinito = value.percent;
        } else {
          if(initvalue.listaAjustes.length>2){
            value.infinito = initvalue.listaAjustes[initvalue.listaAjustes.length - 2].percent
          }
          value.infinito = 0;

        }



      return value;


    })



    this._data.next(false);
    this._ajusteagrado.next(0);


    return initvalue


  }

  calcularSimulacionActualFinito(nuevadata: any,  initvalue: listaSimulacion,indexid:any) {




    initvalue.flujodata = nuevadata;
    let formGroup = initvalue.flujodata;
    const observables =initvalue.listaAjustes.map((value,index) => {

      let data=value.grupodata
      let payload={
        "flujo_anual": formGroup.fcl,
        "ku": formGroup.ku/100,
        "kd": formGroup.kd/100,
        "xt": formGroup.xt/100,
        "yde": formGroup.Yinput,
        "taños": formGroup.taños,
        "crecimiento_anual": formGroup.gInpunt/100,
        "majustes": data.majustes ,
        "tasaimpuesto": formGroup.timpuestos/100,
      }

      return this.cajaService.getCajaTablaFlujo(payload);


    })
    forkJoin(observables).subscribe((responses:any[])=>{

      initvalue.listaAjustes=responses.map((response,index) => {

        if(response.length>0){
          initvalue.listaAjustes[index].vl= response[0].vl;
        }
        return initvalue.listaAjustes[index];
      })




      if (initvalue.listaAjustes.length > 1) {

        initvalue.listaAjustes = initvalue.listaAjustes.map((value, index) => {

          if (index > 0) {

            value.variacion = value.vl - initvalue.listaAjustes[0].vl;
            value.percent = (value.vl - initvalue.listaAjustes[0].vl) / initvalue.listaAjustes[0].vl;


          }
          return value;

        })


      }


      initvalue.listaAjustes=initvalue.listaAjustes.map((value, index) => {



        if (index == initvalue.listaAjustes.length - 2) {
          value.infinito = value.percent;
        } else {
          if(initvalue.listaAjustes.length>2){
            value.infinito = initvalue.listaAjustes[initvalue.listaAjustes.length - 2].percent
          }
          value.infinito = 0;

        }



        return value;


      })
      this._data.next(false);
      this._ajusteagrado.next(0);
      this.listAllSimulaciones[indexid]=initvalue;







    })







    if (initvalue.listaAjustes.length > 1) {

      initvalue.listaAjustes = initvalue.listaAjustes.map((value, index) => {

        if (index > 0) {

          value.variacion = value.vl - initvalue.listaAjustes[0].vl;
          value.percent = (value.vl - initvalue.listaAjustes[0].vl) / initvalue.listaAjustes[0].vl;


        }
        return value;

      })


    }




    initvalue.listaAjustes=initvalue.listaAjustes.map((value, index) => {



      if (index == initvalue.listaAjustes.length - 2) {
        value.infinito = value.percent;
      } else {
        if(initvalue.listaAjustes.length>2){
          value.infinito = initvalue.listaAjustes[initvalue.listaAjustes.length - 2].percent
        }
        value.infinito = 0;

      }



      return value;


    })



    this._data.next(false);
    this._ajusteagrado.next(0);

    console.log("nuevo calculo")
    console.log(initvalue);

    return initvalue


  }
  calcularSimulacionFinito(data:any,actuagrupo:FormGroup){

    this.calcularFinito();


    this.listAllSimulaciones.forEach((initvalue, indice) => {

      let formGroup=initvalue.flujodata;

      let payload={
        "flujo_anual": formGroup.fcl,
        "ku": formGroup.ku/100,
        "kd": formGroup.kd/100,
        "xt": formGroup.xt/100,
        "yde": formGroup.Yinput,
        "taños": formGroup.taños,
        "crecimiento_anual": formGroup.gInpunt/100,
        "majustes": actuagrupo.getRawValue().majustes ,
        "tasaimpuesto": formGroup.timpuestos/100,
      }


      this.cajaService.getCajaTablaFlujo(payload).subscribe((response:any[])=>{

          if(response.length>0){

            let vl=response[0].vl;

            initvalue.listaAjustes.push({
              majustes: data.majustes,
              ln: Math.log(data.majustes),
              vl: vl,
              variacion: 0,
              percent: 0,
              infinito: 0,
              vo69: 0,
              grupodata: actuagrupo.getRawValue()

            })

            if (initvalue.listaAjustes.length > 1) {

              initvalue.listaAjustes = initvalue.listaAjustes.map((value, index) => {

                if (index > 0) {

                  value.variacion = value.vl - initvalue.listaAjustes[0].vl;
                  value.percent = (value.vl - initvalue.listaAjustes[0].vl) / initvalue.listaAjustes[0].vl;


                }
                return value;

              })


            }
            console.log(initvalue)
            this._data.next(false);
            this._ajusteagrado.next(0);

          }else{

            initvalue.listaAjustes.push({
              majustes: data.majustes,
              ln: Math.log(data.majustes),
              vl: 0,
              variacion: 0,
              percent: 0,
              infinito: 0,
              wm: 0,
              ke: 0,
              kdm: 0,
              kum: 0,
              vo69: 0,
              grupodata: actuagrupo.getRawValue()

            })

            initvalue=this.calcularSimulacionActualFinito(initvalue.flujodata,initvalue,indice)
            this._data.next(false);
            this._ajusteagrado.next(0);

          }


      })

    })



  }
  calcularSimulacion(data: any, actuagrupo: FormGroup) {


    this.listAllSimulaciones.forEach((initvalue, indice) => {


      if (indice == 0) {

        let formGroup = initvalue.flujodata;

        actuagrupo.controls["tTotal"].setValue(actuagrupo.getRawValue().majustes * formGroup.taños, {emitEvent: false});
        actuagrupo.controls["gmInpunt"].setValue(String(Math.pow((1 + (Number(formGroup.gInpunt) / 100)), (1 / actuagrupo.getRawValue().majustes)) - 1));
        actuagrupo.controls["yminput"].setValue(String(parseFloat(<string>actuagrupo.getRawValue().gmInpunt) / (Number(formGroup.gInpunt) / 100) * Math.pow((1 + parseFloat(<string>actuagrupo.getRawValue().gmInpunt)), (data.majustes - 1))));
        actuagrupo.controls["ftotales"].setValue(String(formGroup.fcl * (parseFloat(<string>actuagrupo.getRawValue().yminput)) * (1 + parseFloat(<string>actuagrupo.getRawValue().gmInpunt)) * (Math.pow((Math.pow((1 + parseFloat(<string>actuagrupo.getRawValue().gmInpunt)), data.majustes)), formGroup.taños) - 1) / parseFloat(<string>actuagrupo.getRawValue().gmInpunt)));
        actuagrupo.controls["ku"].setValue(Math.log((Number(formGroup.ku) / 100) + 1), {emitEvent: false});
        actuagrupo.controls["kd"].setValue(Math.log((Number(formGroup.kd) / 100) + 1), {emitEvent: false});
        actuagrupo.controls["xt"].setValue(Math.log((Number(formGroup.xt) / 100) + 1), {emitEvent: false});
        actuagrupo.controls["delta"].setValue(Math.log((Number(formGroup.gInpunt) / 100) + 1), {emitEvent: false});
        actuagrupo.controls["timpuestos"].setValue(formGroup.timpuestos / 100, {emitEvent: false});
        actuagrupo.controls["factor"].setValue(1 - (Math.exp(-2 * (this.calcularWACC(actuagrupo.getRawValue(), formGroup) - Number(actuagrupo.getRawValue().delta)))), {emitEvent: false});

        let wm = this.calcularWm(actuagrupo.getRawValue(), formGroup);
        let ke = this.calcularKem(actuagrupo.getRawValue(), formGroup);
        let kdm = this.calcularKdm(actuagrupo.getRawValue(), formGroup);
        let kum = this.calcularKum(actuagrupo.getRawValue(), formGroup);
        initvalue.listaAjustes = initvalue.listaAjustes.filter(a => a.majustes != "%")


        initvalue.listaAjustes.push({
          majustes: data.majustes,
          ln: Math.log(data.majustes),
          vl: this.calcularVa69(actuagrupo.getRawValue(), formGroup),
          variacion: 0,
          percent: 0,
          infinito: 0,
          wm: wm,
          ke: ke,
          kdm: kdm,
          kum: kum,
          vo69: this.calcularVa69(actuagrupo.getRawValue(), formGroup),
          grupodata: actuagrupo.getRawValue()

        })


        if (initvalue.listaAjustes.length > 1) {

          initvalue.listaAjustes = initvalue.listaAjustes.map((value, index) => {

            if (index > 0) {

              value.variacion = value.vl - initvalue.listaAjustes[0].vl;
              value.percent = (value.vl - initvalue.listaAjustes[0].vl) / initvalue.listaAjustes[0].vl;


            }
            return value;

          })


        }

        if (indice == 0) {
          initvalue.listaAjustes.push({
            majustes: "%",
            ln: "",
            vl: this.calcularVo(actuagrupo, formGroup),
            variacion: 0,
            percent: 0,
            infinito: 0,
            wm: 0,
            ke: 0,
            kdm: 0,
            kum: 0,
            vo69: this.calcularVa69(actuagrupo, formGroup),
            grupodata: actuagrupo.getRawValue()

          })
        }


        initvalue.listaAjustes.forEach((value, index) => {

          if (index > 0 && index != initvalue.listaAjustes.length - 1) {

            if (index == initvalue.listaAjustes.length - 2) {
              value.infinito = value.percent;
            } else {
              value.infinito = initvalue.listaAjustes[initvalue.listaAjustes.length - 2].percent
            }


          }
          if (index == initvalue.listaAjustes.length - 1 && indice == 0) {

            value.infinito = initvalue.listaAjustes[initvalue.listaAjustes.length - 2].percent
            value.variacion = value.vl - initvalue.listaAjustes[0].vl;
            value.percent = (value.vl - initvalue.listaAjustes[0].vl) / initvalue.listaAjustes[0].vl;
          }

        })

      }else{

        initvalue.listaAjustes.push({
          majustes: data.majustes,
          ln: Math.log(data.majustes),
          vl: 0,
          variacion: 0,
          percent: 0,
          infinito: 0,
          wm: 0,
          ke: 0,
          kdm: 0,
          kum: 0,
          vo69: 0,
          grupodata: actuagrupo.getRawValue()

        })

        initvalue=this.calcularSimulacionActual(initvalue.flujodata,initvalue)


      }


    })





    this._data.next(false);
    this._ajusteagrado.next(0);


  }

  calcularKdm(actualgrupo: any, formGroup: any) {
    return Math.pow((1 + formGroup.kd / 100), (1 / actualgrupo.majustes)) - 1;
  }

  calcularKum(actualgrupo: any, formGroup: any) {
    return Math.pow((1 + formGroup.ku / 100), (1 / actualgrupo.majustes)) - 1;
  }

  calcularKem(actualgrupo: any, formGroup: any) {
    return this.calcularKum(actualgrupo, formGroup) + ((parseFloat(formGroup.Yinput))) * (this.calcularKum(actualgrupo, formGroup) - this.calcularKdm(actualgrupo, formGroup)) - (this.calcularKum(actualgrupo, formGroup) - this.calcularXm(actualgrupo, formGroup)) * (this.calcularKdm(actualgrupo, formGroup) * (formGroup.timpuestos / 100) * (formGroup.Yinput)) / (this.calcularXm(actualgrupo, formGroup) -
      parseFloat(<string>actualgrupo.gmInpunt))
  }

  calcularXm(actualgrupo: any, formGroup: any) {
    return (Math.pow((1 + formGroup.xt / 100), (1 / actualgrupo.majustes))) - 1;
  }

  calcularWm(actualgrupo: any, formGroup: any) {
    return (1 / (1 + (parseFloat(formGroup.Yinput)))) * this.calcularKem(actualgrupo, formGroup) + (parseFloat(formGroup.Yinput)) / (1 + parseFloat(formGroup.Yinput)) * this.calcularKdm(actualgrupo, formGroup) * (1 - (formGroup.timpuestos / 100));
  }

  calcularWACC(data: any, formGroup: any) {
    return data.ku * (1 - formGroup.Yinput / (1 + parseFloat(formGroup.Yinput)) * data.kd * data.timpuestos / (data.xt - data.delta) * (1 - data.delta / data.ku));
  }

  calcularVa69(actualgrupo: any, formGroup: any) {
    return (1 + parseFloat(<string>actualgrupo.gmInpunt)) * parseFloat(<string>actualgrupo.yminput) * formGroup.fcl /
      ((this.calcularWm(actualgrupo, formGroup)) - parseFloat(<string>actualgrupo.gmInpunt))
  }

  calcularVo(data: any, formGroup: any) {
    let datas = data.delta * formGroup.fcl * (1 + Number(formGroup.gInpunt / 100)) / ((formGroup.gInpunt / 100) * (this.calcularWACC(data, formGroup) - data.delta));
    return datas;
  }

  private calcularFtotal(gInpunt: any, taños: any, fcl: any) {

    return fcl * (1 + gInpunt) * (Math.pow((1 + gInpunt), (taños)) - 1) / gInpunt
  }
}
