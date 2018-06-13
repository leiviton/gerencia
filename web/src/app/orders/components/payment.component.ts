import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { OrdersService } from '../services/orders.service';
import { FormsModule } from '@angular/forms';
import {AppMessageService} from "../../app-message.service";

+6
@Component({
    templateUrl: 'payment.component.html'
})
export class PaymentComponent implements OnInit {

    constructor(private httpService: OrdersService, private router: Router, private route: ActivatedRoute,private toasterService: AppMessageService) {
        document.onkeydown = ((e) =>{
            if(e.keyCode  == 120)
            {
                this.save();
            }

            if(e.keyCode == 27)
            {
                this.close();
            }
        });
    }

    order = {
        id:0,
        total:0,
        payment:{
            data:[{
                type:[{
                    data:[]
                }]
            }]
        }
    };


    mesa = '';
    products = {
        data:[],
        complement:{
            data:[]
        },
        product:{
            data:[]
        }
    };
    total = 0;
    type_id = null;
    payment = {
        'order_id':null,
        'total_pago':0,
        'desconto':0,
        'acrescimo':0,
        'total_original':0,
        'total_realizado':0,
        'payment_types_id':1
    };
    troco = 0;
    tipo = {
        data:[]
    };
    valor_pag = 0;
    divisao = 1;
    result_div = 0;
    ngOnInit(): void {
        this.showLoading();
        jQuery('#payment').show().addClass('show');
        this.tipos();
        this.httpService.setAccessToken();
        this.route.params
            .subscribe(params => {
                this.httpService.builder().view(params['id'],'order')
                    .then((res) => {
                        this.order = res.data;
                        this.total = res.data.total;
                        for(var i = 0; i < res.data.payment.data.length; i++)
                        {
                            if(res.data.payment.data[i].ativo == 'S') {
                                this.total -= res.data.payment.data[i].total_pago;
                            }
                        }
                        this.payment.order_id = this.order.id;
                        this.products = res.data.items;
                        this.mesa = res.data.mesa.data.name;
                        this.hideLoading();
                    });


            });
        this.httpService.eventEmitter.emit();
    }

    save()
    {
        this.showLoading();
        if(this.valor_pag > 0){
            if(this.valor_pag >= this.total){
                this.payment.total_pago = (this.valor_pag - (this.valor_pag - ((this.total + this.payment.acrescimo) - this.payment.desconto)));
                this.payment.total_original = this.order.total;
                this.payment.payment_types_id = this.type_id;
                this.httpService.setAccessToken();
                if(this.type_id !== null) {
                        this.httpService.builder()
                            .insert(this.payment, 'payment')
                            .then((res) => {
                                if(res == 'fechado'){
                                    this.hideLoading();
                                    this.toasterService.message('Error','Caixa está fechado','error');
                                }else {
                                    if (res == 0) {
                                        this.hideLoading();
                                        this.toasterService.message('Erro', 'Ops houve um erro, tente novamente','error');
                                    } else {
                                        this.httpService.eventEmitter.emit();
                                        this.payment.total_realizado = this.payment.total_pago;
                                        this.valor_pag = 0;
                                        this.hideLoading();
                                        this.toasterService.message('Sucesso', 'Pagamento do pedido ' + res.data.id + ' realizado com sucesso','success');
                                        this.close();
                                    }
                                }
                            });

                }else{
                    this.hideLoading();
                    this.toasterService.message('Erro', 'Tipo pagamento não selecionado','error');

                }
            }else if (this.valor_pag + this.payment.desconto >= this.total){
                this.payment.total_pago = (this.valor_pag - this.troco);
                this.payment.total_original = this.order.total;
                this.payment.payment_types_id = this.type_id;
                this.httpService.setAccessToken();
                if(this.type_id !== null) {
                    this.httpService.builder()
                        .insert(this.payment, 'payment')
                        .then((res) => {
                            if(res=='fechado'){
                                this.hideLoading();
                                this.toasterService.message('Erro','Caixa está fechado','error');
                            }else {
                                if (res == 0) {
                                    this.hideLoading();
                                    this.toasterService.message('Erro', 'Ops houve um erro, tente novamente','error');
                                } else {
                                    this.httpService.eventEmitter.emit();
                                    this.valor_pag = 0;
                                    this.hideLoading();
                                    this.toasterService.message('Sucesso', 'Pagamento do pedido ' + res.data.id + ' realizado com sucesso','success');
                                    this.close();
                                }
                            }
                    });
                }else{
                    this.hideLoading();
                    this.toasterService.message('Erro', 'Tipo pagamento não selecionado','error');
                }
            }else if((this.valor_pag + this.payment.desconto) < this.total) {
                this.payment.total_pago = (this.valor_pag - (-1 * this.troco));
                this.payment.total_original = this.order.total;
                this.payment.payment_types_id = this.type_id;
                this.httpService.setAccessToken();
                if (this.type_id !== null) {
                    this.httpService.builder()
                        .insert(this.payment, 'payment')
                        .then((res) => {
                            if(res=='fechado'){
                                this.hideLoading();
                                this.toasterService.message('Error','Caixa está fechado','error');
                            }else {
                                if (res == 0) {
                                    this.hideLoading();
                                    this.toasterService.message('Erro', 'Ops houve um erro, tente novamente','error');
                                } else {

                                    this.httpService.eventEmitter.emit();
                                    this.total = res.data.total;
                                    this.order = res.data;
                                    this.valor_pag = 0;

                                    for (var i = 0; i < res.data.payment.data.length; i++) {
                                        if(res.data.payment.data[i].ativo === 'S') {
                                            this.total -= res.data.payment.data[i].total_pago;
                                        }
                                    }
                                    this.hideLoading();
                                    this.toasterService.message('Sucesso', 'Pagamento parcial ' + res.data.id + ' realizado com sucesso','success');
                                }
                            }
                        });
                } else {
                    this.hideLoading();
                    this.toasterService.message('Erro', 'Tipo pagamento não selecionado','error');
                }
            }
        }else{
            this.hideLoading();
            this.toasterService.message('Erro','Pagamento igual a zaro','error');
        }
    }

    tipos()
    {
        this.httpService.setAccessToken();
        this.httpService.builder()
            .list({},'typepayment')
            .then((res)=>{
                this.tipo = res;
            })
    }

    close()
    {
        jQuery('#payment').hide();
        this.router.navigate(['/orders']);
    }

    edit(){
        jQuery('#payment').hide();
        this.router.navigate(['/orders/edit/' + this.order.id]);
    }
    hideLoading(){
        jQuery("#bifrostBarSpinner").hide();
    }
    showLoading(){
        jQuery("#bifrostBarSpinner").show();
    }
}

