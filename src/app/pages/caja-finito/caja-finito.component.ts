import { Component } from '@angular/core';
import {ApiService} from "../../service/apiservice";

@Component({
  selector: 'app-caja-finito',
  templateUrl: './caja-finito.component.html',
  styleUrls: ['./caja-finito.component.css']
})
export class CajaFinitoComponent {

  data:any[]=[];

  keys:any[]=[];

  colsNumber:any[]=[];

  totalColumns = 800;
  columnsToShow = 10;
  currentStartIndex = 0;

  constructor(private apiService:ApiService) {

    this.apiService.getCajaTabla().subscribe((value:any) => {
      this.data=value;
      if(this.data.length>0){
        this.keys=Object.keys(this.data[0])
        this.colsNumber= Array.from({ length: this.data.length+1 }, (_, index) => index);
        this.totalColumns=this.data.length;
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
    let datareturn=this.data.slice(startIndex, (endIndex+1))
    this.colsNumber= Array.from({ length: datareturn.length+1 }, (_, index) => index);
    return datareturn;
  }
  cerrarSesion() {
    localStorage.clear();
  }
}
