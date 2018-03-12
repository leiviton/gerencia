import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgForOf } from '@angular/common';
import * as jQuery from 'jquery';
import { DashboardService } from "../services/dashboard.service"
@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    constructor(private route: Router, private httpService: DashboardService) { }
    data = '';
    mesas = {
        data:[]
    };
    mesaslivres = {
        data:[]
    };
    pendentes:number = 0;
    fechado:number = 0;
    deliverys:number = 0;
    cancelados:number = 0;

    // barChart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = ['Janeiro', 'Fevereiro', 'Março'];
    public barChartType = 'bar';
    public barChartLegend = true;

    public barChartData: any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Pedidos'},
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Pedidos'},
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Pedidos'}
    ];


    ngOnInit(): void {
      this.showLoading();
      // generate random values for mainChart
        this.httpService.setAccessToken();
        this.httpService.builder()
            .list({},'mesas')
            .then((res) => {
                this.mesas = res;
            });
        this.httpService.builder()
            .list({},'mesas/all')
            .then((res) => {
                this.mesaslivres = res;
            });
        this.httpService.builder()
            .list({},'contador/?type=1')
            .then((res) => {
                this.deliverys = res;
            });
        this.httpService.builder()
            .list({},'orders')
            .then((res)=>{
              this.pendentes = res.data.length;
            });
        this.httpService.builder()
            .list({},'contador/?close=3')
            .then((res) => {
                this.fechado = res;
            });
        this.httpService.builder()
            .list({},'contador/?local=1')
            .then((res) => {
                this.cancelados = res;
            });

        setTimeout(() => {
          this.hideLoading();
        }, 3000);
    }

    hideLoading(){
        jQuery("#bifrostBarSpinner").hide();
    }
    showLoading(){
        jQuery("#bifrostBarSpinner").show();
    }
}
