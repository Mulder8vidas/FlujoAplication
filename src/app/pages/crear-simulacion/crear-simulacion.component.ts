import {AfterViewInit, Component} from '@angular/core';
import {Chart, registerables} from "chart.js";
import {SimulacionService} from "../../service/simulacion.service";

Chart.register(...registerables);

@Component({
  selector: 'app-crear-simulacion',
  templateUrl: './crear-simulacion.component.html',
  styleUrls: ['./crear-simulacion.component.css']
})
export class CrearSimulacionComponent implements AfterViewInit {

  displayModal: boolean;
  data = []
  keys: any[] = [];

  constructor(public simulacionService: SimulacionService) {
    this.displayModal = false

  }

  showModalDialog() {
    this.displayModal = true;
  }


  ngAfterViewInit(): void {


  }

  closeData($event: any) {

    console.log($event)
  }


  calcularFlujoTotal() {
    this.simulacionService.calcular();
  }
}
