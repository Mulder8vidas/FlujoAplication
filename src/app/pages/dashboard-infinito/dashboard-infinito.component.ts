import { Component } from '@angular/core';
import {Chart} from "chart.js";

@Component({
  selector: 'app-dashboard-infinito',
  templateUrl: './dashboard-infinito.component.html',
  styleUrls: ['./dashboard-infinito.component.css']
})
export class DashboardInfinitoComponent {
  public chart: any;

  ngOnInit(): void {


  }

  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'line',

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
        datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: '#ECA31C'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: '#0078D4'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }

  createChart2(){

    this.chart = new Chart("MyChart1", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
        datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: '#ECA31C'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: '#0078D4'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }

  createChart3(){

    this.chart = new Chart("MyChart2", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
        datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: '#ECA31C'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: '#0078D4'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }

  ngAfterViewInit(): void {
    this.createChart();
    this.createChart2();
    this.createChart3();
  }
  cerrarSesion() {
    localStorage.clear();
  }
}
