import {Component, Input} from '@angular/core';
import {ApiService} from "../../service/apiservice";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-caja-finito',
  templateUrl: './caja-finito.component.html',
  styleUrls: ['./caja-finito.component.css']
})
export class CajaFinitoComponent {


  FormCalculo = new FormGroup({
    flujoanual: new FormControl({value: '', disabled: true}),
    ku: new FormControl({value: '', disabled: true}),
    kd: new FormControl({value: '', disabled: true}),
    xt: new FormControl({value: '', disabled: true}),
    Yinput: new FormControl({value: '', disabled: true}),
    taños: new FormControl({value: '', disabled: true}),
    gInpunt: new FormControl({value: '', disabled: true}),

    majustes: new FormControl({value: '', disabled: true}),
    tTotal: new FormControl({value: '', disabled: true}),
    gmInpunt: new FormControl({value: '', disabled: true}),
    yminput: new FormControl({value: '', disabled: true}),
    fTotales: new FormControl({value: '', disabled: true}),
    fTotal: new FormControl({value: '', disabled: true}),
    ku1: new FormControl({value: '', disabled: true}),
    kd1: new FormControl({value: '', disabled: true}),
    xt1: new FormControl({value: '', disabled: true}),
    timpuestos: new FormControl({value: '', disabled: true}),
  })

  dataload: any = null;


  data: any[] = [];

  keys: any[] = [];

  colsNumber: any[] = [];
  colsnumberempy:any[]=[];
  totalColumns = 800;
  columnsToShow = 10;
  currentStartIndex = 0;

  constructor(private apiService: ApiService) {

    this.apiService.getCajaTabla().subscribe((value: any) => {
      this.data = value;
      if (this.data.length > 0) {
        this.keys = Object.keys(this.data[0])
        this.colsNumber = Array.from({length: this.data.length + 1}, (_, index) => index);
        this.totalColumns = this.data.length;
        if(this.data.length>20){
          this.columnsToShow=20
        }else{
          this.columnsToShow=this.data.length-1
        }

        this.dataload=localStorage.getItem("dataload")
        this.FormCalculo.patchValue(JSON.parse(this.dataload));

      }

    })

  }

  // Función para avanzar en la visualización de las columnas
  nextColumns() {
    if (this.currentStartIndex + this.columnsToShow < this.totalColumns) {
      this.currentStartIndex += this.columnsToShow;
    }
  }

  // Función para retroceder en la visualización de las columnas
  prevColumns() {
    if (this.currentStartIndex - this.columnsToShow >= 0) {
      this.currentStartIndex -= this.columnsToShow;
    }
  }

  getVisibleColumns(): any[] {
    const startIndex = this.currentStartIndex;
    const endIndex = Math.min(startIndex + this.columnsToShow, this.totalColumns);

    // Suponiendo que tienes un array con los nombres de las columnas
    // Reemplaza 'columnNames' con tu propio array de nombres de columna
    let datareturn = this.data.slice(startIndex, (endIndex + 1))
    this.colsNumber = Array.from({length: datareturn.length + 1}, (_, index) => index);
    return datareturn;
  }

  cerrarSesion() {
    localStorage.clear();
  }

  calculateStyle(x: number) {
    return x == 8;
  }
}
