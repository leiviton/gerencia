import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { OrdersService } from '../services/orders.service';
import { FormsModule } from '@angular/forms';

import {ToasterService} from 'angular2-toaster';

@Component({
    templateUrl: 'payment.component.html'
})
export class PaymentComponent implements OnInit {

    constructor(private httpService: OrdersService, private router: Router, private route: ActivatedRoute,private toasterService: ToasterService) {
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
        total:0
    };


    mesa = '';
    products = {};
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
    tipo = {};
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
                        console.log(res.data.payment.data)
                        for(var i = 0; i < res.data.payment.data.length; i++)
                        {
                            this.total -= res.data.payment.data[i].total_pago;
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
        console.log('troco',this.troco);
        console.log(this.valor_pag);
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
                                if(res == 0)
                                {
                                    console.log('aqui')
                                    this.hideLoading();
                                    this.toasterService.pop('error','Ops houve um erro, tente novamente');
                                }else {
                                    console.log('aqui')
                                    this.httpService.eventEmitter.emit();
                                    this.payment.total_realizado = this.payment.total_pago;
                                    this.valor_pag = 0;
                                    this.hideLoading();
                                    this.toasterService.pop('success', 'Sucesso', 'Pagamento do pedido ' + res.data.id + ' realizado com sucesso');
                                    this.close();
                                }
                            });

                }else{
                    this.hideLoading();
                    this.toasterService.pop('error', 'Erro', 'Tipo pagamento não selecionado');

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
                            if(res == 0)
                            {

                                console.log('aqui2')
                                this.hideLoading();
                                this.toasterService.pop('error','Ops houve um erro, tente novamente');
                            }else {
                                console.log('aqui2')
                                this.httpService.eventEmitter.emit();
                                this.valor_pag = 0;
                                this.hideLoading();
                                this.toasterService.pop('success', 'Sucesso', 'Pagamento do pedido ' + res.data.id + ' realizado com sucesso');
                                this.close();
                            }
                    });
                }else{
                    this.hideLoading();
                    this.toasterService.pop('error', 'Erro', 'Tipo pagamento não selecionado');
                }
            }else if((this.valor_pag + this.payment.desconto) < this.total) {
                this.payment.total_pago = (this.valor_pag - this.troco);
                this.payment.total_original = this.order.total;
                this.payment.payment_types_id = this.type_id;
                this.httpService.setAccessToken();
                if (this.type_id !== null) {
                    this.httpService.builder()
                        .insert(this.payment, 'payment')
                        .then((res) => {
                            if (res == 0) {
                                console.log("aqui3")
                                this.hideLoading();
                                this.toasterService.pop('error', 'Ops houve um erro, tente novamente');
                            } else {

                                this.httpService.eventEmitter.emit();
                                this.order = res.data;
                                this.valor_pag = 0;
                                for (var i = 0; i < res.data.payment.data.length; i++) {
                                    this.total -= res.data.payment.data[i].total_pago;
                                }
                                this.hideLoading();
                                this.toasterService.pop('success', 'Sucesso', 'Pagamento parcial ' + res.data.id + ' realizado com sucesso');
                            }
                        });
                } else {
                    this.hideLoading();
                    this.toasterService.pop('error', 'Erro', 'Tipo pagamento não selecionado');
                }
            }
        }else{
            this.hideLoading();
            this.toasterService.pop('error','Erro','Pagamento igual a zaro');
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
        jQuery(".container-loading").hide();
    }
    showLoading(){
        jQuery(".container-loading").show();
    }
}

