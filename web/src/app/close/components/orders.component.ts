import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { OrdersService } from '../services/orders.service';
import { FormsModule } from '@angular/forms';

import { environment } from '../../../environments/environment';

import * as jQuery from 'jquery';
import {AppMessageService} from "../../app-message.service";


@Component({
  templateUrl: 'orders.component.html'
})
export class OrdersCloseComponent implements OnInit {

      constructor(
          private httpService: OrdersService,
                  private router: Router,
                  private notification: AppMessageService
        ) {
          document.onkeydown = ((e) =>{
              if(e.keyCode == 113)
              {
                  return this.showModal('#search');
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
            status:null,
            cliente:'todos',
            ativo:'S',
            tipo:'todos'
      };
      en:any = {};
      clients = {
          data:[]
      };
      types_payments = {
          data:[]
      };
      link_report = '';
      ngOnInit(): void {
        this.showLoading();
        this.httpService.setAccessToken();
        this.httpService.builder().list({}, 'close?status=3')
              .then((res) => {
                  this.orders = res;
                  this.tamanho = res.data.length;
                  this.hideLoading();
                  if(this.tamanho > 0) {
                      this.notification.message('Sucesso', 'Dados carregados com sucesso', 'success');
                  }else if(this.tamanho == 0)
                  {
                      this.notification.message('Informação', 'Sem pedidos fechados com data de hoje', 'info');
                  }
              });
          this.en = {
              firstDayOfWeek: 0,
              dayNames: ["Domingo","Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
              dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
              dayNamesMin: ["Do","Sg","Te","Qa","Qi","Sx","Sa"],
              monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
              monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Sep", "Out", "Nov", "Dez" ],
              today: 'Today',
              clear: 'Clear'
          };

          this.getClients();

          this.getTypesPayments();

          jQuery('.modal').hide()
      }

    getTypesPayments()
    {
        this.httpService.setAccessToken();
        this.httpService.builder()
            .list({},'typepayment')
            .then((res)=>{
                this.types_payments = res;
            })
    }
    getClients()
    {
        this.httpService.setAccessToken();
        this.httpService.builder()
            .list({},'clients')
            .then((res) => {
                this.clients = res;
            });
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


    pesquisar()
    {

        this.showLoading();
            if(this.pesquisa.inicio !== null && this.pesquisa.fim !== null)
            {
                let options = {
                    filters: [
                        {status: 3},
                        {inicio: this.pesquisa.inicio.toString()},
                        {fim: this.pesquisa.fim.toString()}
                    ]
                };
                this.httpService.builder().list(options, 'filters')
                    .then((res) => {
                        this.orders = res;
                        console.log(this.orders);
                        this.tamanho = res.data.length;
                        this.hideModal('#search');
                        this.hideLoading();
                        if(this.tamanho > 0) {
                            this.notification.message('Sucesso', 'Dados carregados com sucesso', 'success');
                        }else if(this.tamanho == 0)
                        {
                            this.notification.message('Informação', 'Sem pedidos fechados com data a data selecionada', 'info');
                        }
                    });
            }else  {
                this.notification.message('Erro','Preencha inicio, fim e status para pesquisar.','error');
                this.hideLoading();
            }
    }
    openReal() {
        this.hideModal('#rel');
        window.open('/#/relatorios/relatorio-pedidos-periodo', '_blank');
    }

    report()
    {

        this.showLoading();
            if(this.pesquisa.inicio !== null && this.pesquisa.fim !== null)
            {
                let data = new Array();
                data['ativo'] = this.pesquisa.ativo;
                data['cliente'] = this.pesquisa.cliente;
                data['inicio'] = this.pesquisa.inicio;
                data['fim'] = this.pesquisa.fim;
                data['tipo'] = this.pesquisa.tipo;
                this.httpService.builder().list({}, "orders/report?data[cliente]="+this.pesquisa.cliente+"&data[inicio]="+this.pesquisa.inicio+
                    "&data[fim]="+this.pesquisa.fim+"&data[tipo]="+this.pesquisa.tipo+"&data[ativo]="+this.pesquisa.ativo)
                    .then((res) => {
                        localStorage.setItem('rel_pedidos_filtros',JSON.stringify({data:res}));
                        this.openReal();
                        this.hideModal('#rel');
                        this.hideLoading();
                        if(res.length > 0) {
                            this.notification.message('Sucesso', 'Relatorio gerado com sucesso', 'success');
                        }else if(res.length == 0)
                        {
                            this.notification.message('Informação', 'Sem pedidos fechados com data a data selecionada', 'info');
                        }
                    });
            }else  {
                this.notification.message('Erro','Preencha inicio, fim e status para pesquisar.','error');
                this.hideLoading();
            }
    }

    reportXLS() {

        this.showLoading();
            if(this.pesquisa.inicio !== null && this.pesquisa.fim !== null)
            {
                let data = new Array();
                data['ativo'] = this.pesquisa.ativo;
                data['cliente'] = this.pesquisa.cliente;
                data['inicio'] = this.pesquisa.inicio;
                data['fim'] = this.pesquisa.fim;
                data['tipo'] = this.pesquisa.tipo;
                this.httpService.builder().list({}, "orders/report/xls?data[cliente]="+this.pesquisa.cliente+"&data[inicio]="+this.pesquisa.inicio+
                    "&data[fim]="+this.pesquisa.fim+"&data[tipo]="+this.pesquisa.tipo+"&data[ativo]="+this.pesquisa.ativo)
                    .then((res) => {
                        this.hideLoading();
                        this.link_report = environment.server_url+'/printer/'+res+'.xls';

                        if(res.length > 0) {
                            this.notification.message('Sucesso', 'Relatorio gerado com sucesso', 'success');
                        }else if(res.length == 0)
                        {
                            this.notification.message('Informação', 'Sem pedidos fechados com data a data selecionada', 'info');
                        }
                    });
            }else  {
                this.notification.message('Erro','Preencha inicio, fim e status para pesquisar.','error');
                this.hideLoading();
            }
    }

    hideLoading(){
        jQuery("#bifrostBarSpinner").hide();
    }
    showLoading(){
        jQuery("#bifrostBarSpinner").show();
    }

    showModal(id)
    {
        jQuery(id).show().addClass('show');
    }
    hideModal(id)
    {
        jQuery(id).hide();
    }

}
