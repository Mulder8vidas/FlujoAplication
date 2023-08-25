import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SimulacionService} from "../../service/simulacion.service";

@Component({
  selector: 'app-m-ajustes-finito',
  templateUrl: './m-ajustes-finito.component.html',
  styleUrls: ['./m-ajustes-finito.component.css']
})
export class MAjustesFinitoComponent implements OnInit {
  @Input()
  data:any=null;

  FormCalculo = new FormGroup({
    majustes:new FormControl({value: '', disabled: false}),


  })


  constructor(public simulacionService:SimulacionService) {



  }

  calcular(){
    this.simulacionService.calcularSimulacionFinito(this.FormCalculo.getRawValue(),this.FormCalculo);
  }

  ngOnInit(): void {
    if(this.data!=null){
      this.FormCalculo.patchValue(this.data)
    }
  }
}
