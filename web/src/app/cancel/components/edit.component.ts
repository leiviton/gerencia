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

    constructor(private httpService: OrdersService, private router: Router,
                private route: ActivatedRoute,private toasterService: AppMessageService)
    {
        document.onkeydown = ((e) =>{
            if(e.keyCode == 27)
            {
                this.close();
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
        type:0,
        total:0,
        motivo_cancelamento:null
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
        data:null
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

    update()
    {
        this.showLoading();
        let order = {
            'status': this.order.status,
            'mesa_id': this.order.mesa.data.id
        };
        this.httpService.builder('order')
            .update(this.order.id, order)
            .then((res) => {
                this.httpService.eventEmitter.emit();
                this.order = res.data;
                this.client.id = res.data.client.data.id;
                this.client.name = res.data.client.data.name;
                this.client.phone = res.data.client.data.phone;
                if(res.data.client.data.user) {
                    this.client.email = res.data.client.data.user.data.email;
                }else{
                    this.client.email = res.data.client.data.user.data.email;
                }
                this.client.address.address = res.data.client.data.addressClient.data.address;
                this.client.address.numero = res.data.client.data.addressClient.data.numero;
                this.client.address.bairro = res.data.client.data.addressClient.data.bairro;
                this.client.address.city_id = res.data.client.data.addressClient.data.city.data.id;
                this.products = res.data.items;
                this.mesa = res.data.mesa.data.name;
                this.hideLoading();
                this.toasterService.message('Sucesso','Pedido '+this.order.id+' com sucesso!')
            });
    }

    buscar()
    {
        this.showLoading();
        this.httpService.setAccessToken();
        this.httpService.builder('search')
            .search(this.pesquisa.value)
            .then((res) => {
                this.pesquisa.value = null;
                this.result = res.data;
                this.hideLoading();
                this.addItem(this.result[0]);

                let pedido = {
                    items: this.httpService.get().items,
                    order_id: this.order.id
                };

                this.httpService.builder()
                    .insert(pedido,'addItem')
                    .then((res) => {
                        this.httpService.eventEmitter.emit();
                        this.httpService.clear();
                        this.order = res.data;
                        this.products = res.data.items;
                        this.imprimir = true;
                    });
               });
    }

    addItem(item)
    {
        this.httpService.addItem(item,this.qtd);
        this.toasterService.message('Sucesso', 'Item codigo '+item.id+' adicionado.','success');
    }


    close(){
        jQuery('#successModal').on('show.bs.modal').show().removeClass('show');
        this.router.navigate(['/orders/cancel']);
    }

    save(){
            jQuery('#successModal').on('show.bs.modal').show().removeClass('show');
            this.router.navigate(['/orders/cancel/printer/'+ this.order.id+'/N']);
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
