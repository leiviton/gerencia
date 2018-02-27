import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { OrdersService } from '../services/orders.service';
import { FormsModule } from '@angular/forms';

import * as jQuery from 'jquery';
import { ToastyService, ToastOptions, ToastyConfig } from "ng2-toasty";

@Component({
  templateUrl: 'orders.component.html'
})
export class OrdersCloseComponent implements OnInit {

  constructor(
      private httpService: OrdersService,
              private router: Router,
              private tosty: ToastyService,
              private toastyOptions: ToastOptions,
              private toastyConfig: ToastyConfig
    ) {
      this.toastyConfig.position = 'top-right';
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
    setTimeout(this.hideLoading(),2000);
  }

    edit(id)
    {
        this.cor = true;
        this.router.navigate(['/close/edit/'+ id]);
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
                        {status: 3},
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
                        //this.toasterService.pop('success', 'Sucesso', 'Dados carregados com sucesso');
                        this.message('Sucesso','Pesquisa feita com sucesso',5000,'success');
                    });
            }else  {
                this.message('Erro','Preencha inicio, fim e status para pesquisar.',5000,'error');
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
