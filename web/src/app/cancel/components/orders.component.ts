import { Component, OnInit } from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { OrdersService } from '../services/orders.service';
import { FormsModule } from '@angular/forms';

import { ToastyService, ToastOptions, ToastyConfig } from "ng2-toasty";


import * as jQuery from 'jquery';
@Component({
  templateUrl: 'orders.component.html'
})
export class OrdersCancelComponent implements OnInit {

  constructor(private httpService: OrdersService,
              private router: Router,
              private tosty: ToastyService,
              private toastyOptions: ToastOptions,
              private toastyConfig: ToastyConfig
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
                  this.message('Sucesso', 'Dados carregados com sucesso', 5000, 'success');
              }else if(this.tamanho == 0)
              {
                  this.message('Informação', 'Sem pedidos fechados com data de hoje', 5000, 'info');
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
                        this.message('Sucesso', 'Dados carregados com sucesso', 5000, 'success');

                    });
            }else  {
                this.message('Sucesso', 'Preencha inicio, fim e status para pesquisar.', 5000, 'success');
                this.hideLoading();
            }
    }

    message(titulo:string,message:string,time:number,type:string)
    {
        this.toastyOptions = {
            title:titulo,
            msg:message,
            timeout:time,
        }

        switch (type) {
            case 'default': this.tosty.default(this.toastyOptions); break;
            case 'info': this.tosty.info(this.toastyOptions); break;
            case 'success': this.tosty.success(this.toastyOptions); break;
            case 'wait': this.tosty.wait(this.toastyOptions); break;
            case 'error': this.tosty.error(this.toastyOptions); break;
            case 'warning': this.tosty.warning(this.toastyOptions); break;
        }
    }
}
