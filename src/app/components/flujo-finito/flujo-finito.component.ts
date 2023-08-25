import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {SimulacionService} from "../../service/simulacion.service";

@Component({
  selector: 'app-flujo-finito',
  templateUrl: './flujo-finito.component.html',
  styleUrls: ['./flujo-finito.component.css']
})
export class FlujoFinitoComponent implements OnInit,AfterViewInit {
  ngOnInit(): void {


  }

  data:any;
  id:any;

  public formGroup: FormGroup= new FormGroup({
    fcl: new FormControl('', Validators.required),
    ku: new FormControl('', Validators.required),
    kd: new FormControl('', Validators.required),
    xt: new FormControl('', Validators.required),
    Yinput: new FormControl('', Validators.required),
    taños: new FormControl('', Validators.required),
    gInpunt: new FormControl('', Validators.required),
    timpuestos: new FormControl({value: '', disabled: false}),

  })


  constructor(public ref: DynamicDialogRef,public dialogConfig:DynamicDialogConfig,public simulacionService:SimulacionService ) {

    this.data=this.dialogConfig.data.grupo;
    this.id=this.dialogConfig.data.id;
    this.formGroup.patchValue(this.data)


  }

  ngAfterViewInit(): void {

  }
  guardarDatos2() {
    this.guardarDatos()
    this.guardarDatos()
  }

  guardarDatos() {
    let simulacionActual=this.simulacionService.listAllSimulaciones[this.id];


    /*this.simulacionService.calcularActual(this.formGroup);*/



      this.simulacionService.calcularSimulacionActualFinito(this.formGroup.getRawValue(),simulacionActual,this.id);



  }
}
