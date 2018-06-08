import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { OrdersService } from '../services/orders.service';
import { FormsModule } from '@angular/forms';

import {AppMessageService} from "../../app-message.service";

@Component({
    templateUrl: 'edit.component.html'
})
export class EditComponent implements OnInit {

    constructor(private httpService: OrdersService, private router: Router, private route: ActivatedRoute
        ,private toasterService: AppMessageService)
    {
        document.onkeydown = ((e) =>{

            if(e.keyCode == 27)
            {
                this.close();
            }

            if(e.keyCode == 118)
            {
                this.save();
            }
        });
    }
    order = {
        id:0,
        status:0,
        mesa:{
            data:{
                id:1
            }
        },
        payment:{data:{type:{data:{id:0}}}},
        type:0,
        total:0
    };
    client = {
        id:1,
        name:'',
        phone:'',
        address:{
            address:null,
            numero:null,
            bairro:null,
            city_id:0
        },
        email:''
    };
    products = {
        data:[]
    };
    mesas = {
        data:null
    };
    mesa = '';
    pesquisa = {
        value:null,
        telefone:null
    };
    result = {
        qtd:1
    };
    qtd = 1;
    editar = true;
    imprimir = false;
    ngOnInit(): void {
        this.showLoading();
        this.httpService.setAccessToken();
        jQuery('#successModal').on('show.bs.modal').show().addClass('show');

        jQuery('name').disabled = false;
        this.route.params
            .subscribe(params => {
                this.httpService.builder().view(params['id'],'order')
                    .then((res) => {
                            this.order = res.data;
                            if(res.data.client.data.user)
                            {
                                this.client.id = res.data.client.data.id;
                                this.client.name = res.data.client.data.name;
                                this.client.phone = res.data.client.data.phone;
                                this.client.email = res.data.client.data.user.data.email;
                                this.client.address.address = res.data.client.data.addressClient.data.address;
                                this.client.address.numero = res.data.client.data.addressClient.data.numero;
                                this.client.address.bairro = res.data.client.data.addressClient.data.bairro;
                                this.client.address.city_id = res.data.client.data.addressClient.data.city.data.id;
                                this.products = res.data.items;
                                this.mesa = res.data.mesa.data.name;
                            }else{
                                this.client.id = res.data.client.data.id;
                                this.client.name = res.data.client.data.name;
                                this.client.phone = res.data.client.data.phone;
                                this.client.email = '';
                                this.client.address.address = res.data.client.data.addressClient.data.address;
                                this.client.address.numero = res.data.client.data.addressClient.data.numero;
                                this.client.address.bairro = res.data.client.data.addressClient.data.bairro;
                                this.client.address.city_id = res.data.client.data.addressClient.data.city.data.id;
                                this.products = res.data.items;
                                this.mesa = res.data.mesa.data.name;

                            }
                            this.hideLoading();
                    });
                this.httpService.setAccessToken();
                this.httpService.builder()
                    .list({},'mesas/all')
                    .then((res) => {
                        this.mesas = res;
                    });

            });
        this.httpService.eventEmitter.emit();
    }

    openOrder()
    {
        let type_payment;
        let data_payment;
        let paymets = this.order.payment.data;
        let di = new Date();

        for(let i in paymets)
        {
            if(paymets[i].ativo == 'S') {
                if (paymets[i].type.data.id == 1) {
                    type_payment = 1;
                    data_payment = paymets[i].data.date;
                    console.log(paymets[i].data.date)
                }
            }
        }

        if(type_payment == 1 && (new Date(data_payment).toDateString() < new Date(di).toDateString()))
        {
            this.toasterService.message('Erro','Existem pagamentos em dinheiro, caixa da data está fechado.','error')
        }else{
            this.showLoading();
            let data = {
                order_id:this.order.id
            };

            this.httpService.builder()
                .insert(data,'order/open')
                .then((res)=>{
                    this.hideLoading();
                    this.toasterService.message('Sucesso', 'Pedido '+res.data.id+' reaberto.','success');
                    this.router.navigate(['/orders/payment/'+res.data.id]);
                });
        }
    }

    close(){
        jQuery('#successModal').on('show.bs.modal').show().removeClass('show');
        this.router.navigate(['/close']);
    }

    save(){
            jQuery('#successModal').on('show.bs.modal').show().removeClass('show');
            this.router.navigate(['/close/printer/'+ this.order.id+'/N']);
    }

    habilitarEdicao()
    {
        this.editar = !this.editar;
    }
    hideLoading(){
        jQuery("#bifrostBarSpinner").hide();
    }

    showLoading(){
        jQuery("#bifrostBarSpinner").show();
    }

}
