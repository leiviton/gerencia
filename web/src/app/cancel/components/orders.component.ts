import { Component, OnInit } from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { OrdersService } from '../services/orders.service';
import { FormsModule } from '@angular/forms';

import * as jQuery from 'jquery';
import {AppMessageService} from "../../app-message.service";
@Component({
  templateUrl: 'orders.component.html'
})
export class OrdersCancelComponent implements OnInit {

  constructor(private httpService: OrdersService,
              private router: Router,
              private notification: AppMessageService
) {
      document.onkeydown = ((e) =>{
          if(e.keyCode == 113)
          {
              return this.showModal();
          }
      });
  }

  cor = false;

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
      this.httpService.builder().list({}, 'close/?status=5')
          .then((res) => {
              this.orders = res;
              console.log(this.orders);
              this.tamanho = res.data.length;
              this.hideModal();
              this.hideLoading();
              if(this.tamanho > 0) {
                  this.notification.message('Sucesso', 'Dados carregados com sucesso', 'success');
              }else if(this.tamanho == 0)
              {
                  this.notification.message('Informação', 'Sem pedidos fechados com data de hoje', 'info');
              }
          });

  }

    edit(id)
    {
        this.cor = true;
        this.router.navigate(['/orders/cancel/edit/'+ id]);
    }

    new()
    {
       return this.router.navigate(['/orders/new']);
    }


    hideLoading(){
        jQuery(".container-loading").hide();
    }
    showLoading(){
        jQuery(".container-loading").show();
    }

    showModal()
    {
        jQuery(".modal").show().addClass('show');
    }
    hideModal()
    {
        jQuery(".modal").hide();
    }
    pesquisar()
    {

        this.showLoading();
            if(this.pesquisa.inicio !== null && this.pesquisa.fim !== null)
            {
                let options = {
                    filters: [
                        {status: 5},
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
                        if(this.tamanho > 0) {
                            this.notification.message('Sucesso', 'Dados carregados com sucesso', 'success');
                        }else if(this.tamanho == 0)
                        {
                            this.notification.message('Informação', 'Sem pedidos fechados com data de hoje', 'info');
                        }
                });
            }else  {
                this.notification.message('Sucesso', 'Preencha inicio, fim e status para pesquisar.', 'success');
                this.hideLoading();
            }
    }
}
