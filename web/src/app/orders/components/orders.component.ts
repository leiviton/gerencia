import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { OrdersService } from '../services/orders.service';
import { FormsModule } from '@angular/forms';
import * as jQuery from 'jquery';
import {AppMessageService} from "../../app-message.service";

@Component({
  templateUrl: 'orders.component.html'
})
export class OrdersComponent implements OnInit {

  constructor(private httpService: OrdersService, private router: Router,
              private toasterService: AppMessageService) {
      document.onkeydown = ((e) =>{
          if(e.keyCode == 113)
          {
              return this.showModal();
          }
      });
  }

  cor = false;

  total = 0;
  orders = {
      data:[]
  };
  tamanho = 0;
    pesquisa:any = {
        inicio:null,
        fim:null,
        status:null
    };
  ngOnInit(): void {
    this.showLoading();
      this.httpService.setAccessToken();
      this.httpService.eventEmitter
          .subscribe(() => {
              this.httpService.builder().list({}, 'orders')
                  .then((res) => {
                      this.orders = res;
                      for(var i = 0; i < this.orders.data.length; i++)
                      {
                          this.total = this.total + this.orders.data[i].total;
                      }
                      this.tamanho = res.data.length;
                      this.hideLoading();
                  });
          });

      this.httpService.eventEmitter.emit();
  }

    edit(id)
    {
        this.cor = true;
        this.router.navigate(['/orders/edit/'+ id]);
    }

    new()
    {
       return this.router.navigate(['/orders/new']);
    }

    pesquisar()
    {

        this.showLoading();
            if(this.pesquisa.inicio !== null && this.pesquisa.fim !== null && this.pesquisa.status !== null)
            {
                let options = {
                    filters: [
                        {status: this.pesquisa.status},
                        {inicio: this.pesquisa.inicio},
                        {fim: this.pesquisa.fim}
                    ]
                };
                this.httpService.builder().list(options, 'filters')
                    .then((res) => {
                        this.orders = res;
                        console.log(this.orders);
                        this.tamanho = res.data.length;
                        this.hideModal();
                        this.hideLoading();
                        this.toasterService.message('Sucesso','Dados carregados com sucesso','success');

                    });
            }else  {
                this.toasterService.message('Erro', 'Preencha inicio, fim e status para pesquisar.','error');

                this.hideLoading();
            }
    }

    hideLoading(){
        jQuery("#bifrostBarSpinner").hide();
    }
    showLoading(){
        jQuery("#bifrostBarSpinner").show();
    }

    showModal()
    {
        jQuery(".modal").show().addClass('show');
    }
    hideModal()
    {
        jQuery(".modal").hide();
    }

}
