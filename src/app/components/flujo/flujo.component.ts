import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SimulacionService, TablaCalculo} from "../../service/simulacion.service";

@Component({
  selector: 'app-flujo',
  templateUrl: './flujo.component.html',
  styleUrls: ['./flujo.component.css']
})
export class FlujoComponent implements OnInit,AfterViewInit{
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
    ftotal: new FormControl({value: '', disabled: true}),
    timpuestos: new FormControl({value: '', disabled: false}),

  })


  constructor(public ref: DynamicDialogRef,public dialogConfig:DynamicDialogConfig,public simulacionService:SimulacionService ) {

    this.data=this.dialogConfig.data.grupo;
    this.id=this.dialogConfig.data.id;
    this.formGroup.patchValue(this.data)


  }

  ngAfterViewInit(): void {

  }

  guardarDatos() {
    let simulacionActual=this.simulacionService.listAllSimulaciones[this.id];


    this.simulacionService.calcularActual(this.formGroup);


    this.simulacionService.listAllSimulaciones[this.id]=this.simulacionService.calcularSimulacionActual(this.formGroup.getRawValue(),simulacionActual);






  }
}
