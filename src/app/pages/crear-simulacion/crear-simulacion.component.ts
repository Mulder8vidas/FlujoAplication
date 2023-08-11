import {AfterViewInit, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Chart, registerables} from "chart.js";
Chart.register(...registerables);

@Component({
  selector: 'app-crear-simulacion',
  templateUrl: './crear-simulacion.component.html',
  styleUrls: ['./crear-simulacion.component.css']
})
export class CrearSimulacionComponent implements AfterViewInit{

  displayModal:boolean;
  data=[]
  tabla: any;
  public chart: any;
  colsNumber:any[]=[];
  constructor() {
    this.displayModal=false
  }
  FormCalculo = new FormGroup({
    fcl: new FormControl('', Validators.required),
    ku: new FormControl('', Validators.required),
    kd: new FormControl('', Validators.required),
    xt: new FormControl('', Validators.required),
    Yinput: new FormControl('', Validators.required),
    taños: new FormControl('', Validators.required),
    gInpunt: new FormControl('', Validators.required),
    ftotal: new FormControl({value: '', disabled: true}),

    majustes: new FormControl('', Validators.required),
    tTotal: new FormControl({value: '', disabled: true}),
    gmInpunt: new FormControl({value: '', disabled: true}),
    yminput: new FormControl({value: '', disabled: true}),
    fTotales: new FormControl({value: '', disabled: true}),

    ku1: new FormControl({value: '', disabled: true}),
    kd1: new FormControl({value: '', disabled: true}),
    xt1: new FormControl({value: '', disabled: true}),
    timpuestos: new FormControl('', Validators.required),
  })


  showModalDialog() {
    this.displayModal = true;
  }
  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.colsNumber,
        datasets: [

        ]
      },
      options: {
        aspectRatio:2.5,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 50,
              usePointStyle: true,
              pointStyle: "circle"
            }
          }
        },
        scales:{
          x: {
            grid: {
              display: false,

            },
            title: {
              display: true,
              text: "Periodo",
              color: "red",
              font: {
                size: 24,
                weight: "bold"
              }
            },
            min:0
          },
        }
      },


    });
  }

  ngAfterViewInit(): void {
    this.createChart();
  }
}
