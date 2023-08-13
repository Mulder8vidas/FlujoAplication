import {AfterViewInit, Component} from '@angular/core';
import {Chart, registerables} from "chart.js";
import {SimulacionService} from "../../service/simulacion.service";
import {FlujoComponent} from "../../components/flujo/flujo.component";
import {DialogService} from "primeng/dynamicdialog";

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
  keys: any[] = [];

  constructor(public simulacionService: SimulacionService,public dialogService:DialogService) {
    this.displayModal = false

/*    let ref = this.dialogService.open(FlujoComponent, {
      header: 'Editar Variables',
      width: '70%',
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
    });*/

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
