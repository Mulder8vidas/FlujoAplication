import {AfterViewInit, Component} from '@angular/core';
import {SimulacionService} from "../../service/simulacion.service";
import {DialogService} from "primeng/dynamicdialog";
import {ConsolidadoComponent} from "../../components/consolidado/consolidado.component";
import {Chart, registerables} from "chart.js";
import {ConsolidadoFinitoComponent} from "../../components/consolidado-finito/consolidado-finito.component";
Chart.register(...registerables);
@Component({
  selector: 'app-crear-simulacion-finito',
  templateUrl: './crear-simulacion-finito.component.html',
  styleUrls: ['./crear-simulacion-finito.component.css'],
  providers:[DialogService]
})
export class CrearSimulacionFinitoComponent implements AfterViewInit{

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


    let ref = this.dialogService.open(ConsolidadoFinitoComponent, {
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
