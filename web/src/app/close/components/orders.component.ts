import { Component, OnInit } from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { OrdersService } from '../services/orders.service';
import { FormsModule } from '@angular/forms';



import * as jQuery from 'jquery';
@Component({
  templateUrl: 'orders.component.html'
})
export class OrdersCloseComponent implements OnInit {

  constructor(private httpService: OrdersService, private router: Router, private toasterService: ToasterService) {
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
                        this.toasterService.pop('success', 'Sucesso', 'Dados carregados com sucesso');

                    });
            }else  {
                this.toasterService.pop('error', 'Erro', 'Preencha inicio, fim e status para pesquisar.');

                this.hideLoading();
            }
    }
}
