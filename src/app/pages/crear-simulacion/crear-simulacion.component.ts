import {AfterViewInit, Component} from '@angular/core';
import {Chart, registerables} from "chart.js";
import {SimulacionService} from "../../service/simulacion.service";
import {FlujoComponent} from "../../components/flujo/flujo.component";
import {DialogService} from "primeng/dynamicdialog";
import {ConsolidadoComponent} from "../../components/consolidado/consolidado.component";

Chart.register(...registerables);

@Component({
  selector: 'app-crear-simulacion',
  templateUrl: './crear-simulacion.component.html',
  styleUrls: ['./crear-simulacion.component.css'],
  providers:[DialogService]
})
export class CrearSimulacionComponent implements AfterViewInit {

  displayModal: boolean;
  data = []

  constructor(public simulacionService: SimulacionService,public dialogService:DialogService) {
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
  mostrarConsolidado() {


        let ref = this.dialogService.open(ConsolidadoComponent, {
          header: 'Consolidado',
          width: '100%',
          height:'100%',

          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true,
          rtl:true,
          dismissableMask: true,
          data:{
            id:"adrian"
          },
          modal:true,
          closeOnEscape:true,
        });
  }
}
