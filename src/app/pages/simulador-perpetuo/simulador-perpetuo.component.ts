import { Component } from '@angular/core';
import {Router,} from '@angular/router';
@Component({
  selector: 'app-simulador-perpetuo',
  templateUrl: './simulador-perpetuo.component.html',
  styleUrls: ['./simulador-perpetuo.component.css']
})
export class SimuladorPerpetuoComponent {
  colsNumber: any[] = [];
  keys: any[] = [];
  data: any[] = [];
  totalColumns = 800;
  columnsToShow = 10;
  currentStartIndex = 0;
  simulaciones: any;
  Csimulacion() {
    this.router.navigate(['/crear-simulacion'])
  }

  constructor(private router: Router,) {

  }

  Bsimulacion() {

  }
}
