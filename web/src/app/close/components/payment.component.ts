import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { OrdersService } from '../services/orders.service';
import { FormsModule } from '@angular/forms';

import {AppMessageService} from "../../app-message.service";

@Component({
    templateUrl: 'payment.component.html'
})
export class PaymentComponent implements OnInit {

    constructor(private httpService: OrdersService, private router: Router,
                private route: ActivatedRoute,private toasterService: AppMessageService) {
        document.onkeydown = ((e) =>{

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
            data:null
        }
    };
    mesa = '';
    products = {
        data:null
    };
    total = 0;
    type_id = null;
    payment = {
        'order_id':null,
        'total_pago':0,
        'desconto':0,
        'acrescimo':0,
        'total_original':0,
        'payment_types':'',
        'data_pagamento':''
    };
    troco = 0;
    tipo = {};
    valor_pag = 0;
    divisao = 1;
    result_div = 0;
    client = {
        name:'',
        address:''
    };
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
                        this.payment.order_id = this.order.id;
                        this.payment.total_pago = res.data.payment.data[0].total_pago;
                        this.payment.total_original = res.data.total;
                        this.payment.data_pagamento = res.data.payment.data[0].created_at;
                        this.payment.desconto = res.data.payment.data[0].desconto;
                        this.payment.acrescimo = res.data.payment.data[0].acrescimo;
                        this.payment.payment_types = res.data.payment.data[0].type.data.name;
                        this.products = res.data.items;
                        this.client.name = res.data.client.data.name;
                        this.client.address = res.data.client.data.endereco;
                        this.mesa = res.data.mesa.data.name;
                        this.hideLoading();
                    });


            });
        this.httpService.eventEmitter.emit();
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
        this.router.navigate(['/close']);
    }


    hideLoading(){
        jQuery("#bifrostBarSpinner").hide();
    }
    showLoading(){
        jQuery("#bifrostBarSpinner").show();
    }
}

