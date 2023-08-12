import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SimulacionService} from "../../service/simulacion.service";

@Component({
  selector: 'app-m-ajustes',
  templateUrl: './m-ajustes.component.html',
  styleUrls: ['./m-ajustes.component.css']
})
export class MAjustesComponent implements OnInit{

  @Input()
  data:any=null;

  FormCalculo = new FormGroup({
    tTotal:new FormControl({value: '', disabled: true}),
    gmInpunt:new FormControl({value: '', disabled: true}),
    yminput:new FormControl({value: '', disabled: true}),
    ftotales:new FormControl({value: '', disabled: true}),
    ku:new FormControl({value: '', disabled: true}),
    kd:new FormControl({value: '', disabled: true}),
    xt:new FormControl({value: '', disabled: true}),
    delta:new FormControl({value: '', disabled: true}),
    timpuestos:new FormControl({value: '', disabled: true}),
    factor:new FormControl({value: '', disabled: true}),
    majustes:new FormControl({value: '', disabled: false}),


  })


  constructor(public simulacionService:SimulacionService) {



  }

  calcular(){
    this.simulacionService.calcularSimulacion(this.FormCalculo.getRawValue(),this.FormCalculo);
  }

  ngOnInit(): void {
    if(this.data!=null){
      this.FormCalculo.patchValue(this.data)
    }
  }
}
