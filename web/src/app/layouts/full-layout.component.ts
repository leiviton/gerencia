import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService} from "../orders/services/orders.service"
import {AppMessageService} from "../app-message.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user') || null);
  show = false;
  ano = new Date().getFullYear();
  constructor(private route: Router, private toasterService: AppMessageService) {
    setInterval(() => {
        this.user = JSON.parse(localStorage.getItem('user') || null);
        if (this.user != null)
        {
          this.show = true;
        }
      }, 1000);
  }

  data = '';
  mesas = {};
  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
      if (!this.user){
        this.toasterService.message('Atenção','É necessário logar no sistema','warning');
        this.route.navigateByUrl('/user/login');
      }

      this.data = this.getData();
  }

    getData()
    {
        let dayNme = new Array("Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado");
        let nomName = new Array("Janeiro","Fevereiro","Março","Abril","Maio","Junho","Agosto","Outubro","Novembro","Dezembro");
        let now = new Date();
        return "Hoje é "+ dayNme[now.getDay()] +","+ now.getDate() +" de "+ nomName[now.getMonth()] +" de "+ now.getFullYear();
    }
}
