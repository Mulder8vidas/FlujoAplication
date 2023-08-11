import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-m-ajustes',
  templateUrl: './m-ajustes.component.html',
  styleUrls: ['./m-ajustes.component.css']
})
export class MAjustesComponent {
  FormCalculo = new FormGroup({
    ftotal:new FormControl({value: '', disabled: true}),
    gmInpunt:new FormControl({value: '', disabled: true}),
    ymInpunt:new FormControl({value: '', disabled: true}),
    ftotales:new FormControl({value: '', disabled: true}),
    ku:new FormControl({value: '', disabled: true}),
    kd:new FormControl({value: '', disabled: true}),
    xt:new FormControl({value: '', disabled: true}),
    delta:new FormControl({value: '', disabled: true}),
    timpuestos:new FormControl({value: '', disabled: true}),
    factor:new FormControl({value: '', disabled: true}),


  })

}
