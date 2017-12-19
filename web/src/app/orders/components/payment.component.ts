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
        id:0
    };
    products = {};
    total = 0;
    payment = {
        'order_id':null,
        'total_pago':0,
        'desconto':0,
        'acrescimo':0,
        'total_original':0,
        'payment_id':1
    };
    troco = 0;
    tipo = [
        {
            id:1,
            name: 'Dinheiro'
        },
        {
            id:2,
            name: 'Cartão'
        },
        {
            id:3,
            name: 'Cheque'
        }
    ];
    ngOnInit(): void {

        this.httpService.setAccessToken();
        this.route.params
            .subscribe(params => {
                this.httpService.builder().view(params['id'],'order')
                    .then((res) => {
                        this.order = res.data;
                        this.payment.order_id = this.order.id;
                        this.products = res.data.items.data;
                        console.log('order',this.order);
                        this.hideLoading();
                    });
                this.httpService.builder().list('','typepayment')
                    .then((res) => {
                        this.tipo = res.data;
                        console.log('tipo',this.tipo)
                });
            });

        this.httpService.eventEmitter.emit();
        this.showLoading();
        jQuery('#payment').show().addClass('show');
        setTimeout(() => {
            this.hideLoading();
        },300);
    }

    save()
    {
        this.showLoading();
        this.payment.total_pago = this.payment.total_pago - this.troco;
        console.log(this.payment);
        this.httpService.setAccessToken();
        if(this.payment.total_pago > 0)
        {
            this.httpService.builder()
                .insert(this.payment,'payment')
                .then((res) => {
                    this.httpService.eventEmitter.emit();
                    this.hideLoading();
                    this.toasterService.pop('success', 'Sucesso', 'Pagamento do pedido '+ res.data.id +' realizado com sucesso');
                    this.close();
                });
        }else {
            this.hideLoading();
            this.toasterService.pop('error', 'Erro', 'Pagamento não pode ser igual a zero');
        }
    }

    close()
    {
        jQuery('#payment').hide();
        this.router.navigate(['/orders']);
    }


    hideLoading(){
        jQuery(".container-loading").hide();
    }
    showLoading(){
        jQuery(".container-loading").show();
    }
}

