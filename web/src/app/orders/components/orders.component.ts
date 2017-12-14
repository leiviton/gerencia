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
export class OrdersComponent implements OnInit {

  constructor(private httpService: OrdersService, private router: Router, private toasterService: ToasterService) {
      document.onkeydown = ((e) =>{
          if(e.keyCode == 113)
          {
              return this.showModal();
          }
      });
  }

  cor = false;

  orders:object = {};
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
                      this.tamanho = res.data.length;
                      console.log(this.tamanho);
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
    pesquisar(fields)
    {

        this.showLoading();
            if(this.pesquisa.inicio !== null && this.pesquisa.fim !== null && this.pesquisa.status)
            {
                console.log(this.pesquisa.inicio);
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
                        this.toasterService.pop('success', 'Sucesso', 'Dados carregados com sucesso');

                    });
            }else if (this.pesquisa.status!==null && this.pesquisa.inicio===null && this.pesquisa.fim===null){
                let options = {
                    filters: [
                        {status: this.pesquisa.status}
                    ]
                };
                this.httpService.builder().list(options, 'filters/')
                    .then((res) => {
                        this.orders = res;
                        console.log(this.orders);
                        this.tamanho = res.data.length;
                        console.log(this.tamanho);
                        this.hideModal();
                        this.hideLoading();
                        this.toasterService.pop('success', 'Sucesso', 'Dados carregados com sucesso');
                    });
                this.hideLoading();
            }else {
                this.hideLoading();
            }
    }
}
