import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { OrdersService } from '../services/orders.service';
import { FormsModule } from '@angular/forms';

import {ToasterService} from 'angular2-toaster';

@Component({
    templateUrl: 'new.component.html'
})
export class NewComponent implements OnInit {

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


    cart =  this.httpService.get();
    order = {};
    client = {
        id:1,
        name:'',
        phone:'',
        address:{
            rua:null,
            bairro:null,
            cidade:null,
            estado:null
        },
        email:''
    };
    items = [];
    result = {};
    qtd = 1;
    total = 0;
    pesquisa = {
        value:null,
        value2:null
    };
    mesas: {};
    mesa_id = null;
    tipo = 0;
    novo = true;

    ngOnInit(): void {
        if(!this.cart)
        {
            this.httpService.initCart();
        }
        this.items = this.httpService.get();
        console.log('items', this.items);
        this.total = this.httpService.get().total;
        this.httpService.setAccessToken();
        this.httpService.builder()
            .list({},'mesas')
            .then((res) => {
                this.mesas = res.data;
                console.log('mesas', this.mesas);
            });

        this.showLoading();
        jQuery('#new_order').show().addClass('show');
        setTimeout(() => {
            this.hideLoading();
        },300);
    }

    buscarCliente()
    {
        if(this.pesquisa.value2 == null)
        {
            this.toasterService.pop('error','campo cliente vazio')
        }else{
            this.httpService.builder('search/client')
                .search(this.pesquisa.value2)
                .then((res) => {

                    if(res.data == []){
                        this.toasterService.pop('info', 'Nenhum cliente encontrado, cadastre o cliente');
                    }else {
                        console.log('res', res.data);
                        this.client.id = res.data[0].id;
                        this.client.name = res.data[0].name;
                        this.client.phone = res.data[0].phone;
                        this.client.email = res.data[0].user.data.email;
                        this.client.address = res.data[0].address;
                        this.novo = false;
                        console.log(this.client);
                    }
                });
        }

    }

    buscar()
    {
        this.showLoading();
        this.httpService.setAccessToken();
        this.httpService.builder('search')
            .search(this.pesquisa.value)
            .then((res) => {
                this.httpService.eventEmitter.emit();
                this.pesquisa.value = null;
                this.result = res.data;
                this.hideLoading();
                if(res.data.length>1){
                    jQuery('#pesquisa').show().addClass('show');
                }else{
                    if(res.data.length===1)
                    {
                        this.addItem(this.result[0]);
                        this.total = this.httpService.get().total;
                        this.items = this.httpService.get();
                        this.qtd = 1;
                        console.log('item',this.items);
                    }
                }
                console.log("pesquisou", this.result)
            });

        console.log("pesquisou", this.pesquisa)
    }

    addItem(item)
    {
        item.qtd = this.qtd;
        this.httpService.addItem(item);
        this.toasterService.pop('success', 'Sucesso', 'Item codigo '+item.id+' adicionado.');
    }

    removeItem(i)
    {
        this.httpService.removeItem(i);

        this.total = this.httpService.get().total;
        this.items = this.httpService.get();

        this.toasterService.pop('info', 'Informação', 'Item removido.');
    }

    save()
    {
        if(this.tipo != 1){
            this.mesa_id = 1;
        }

        if(this.tipo != 1 && this.client.id == 1)
        {
            this.toasterService.pop('error', 'É necessário cadastrar um cliente ou selecionar');
        }else {
            if (this.mesa_id != null) {
                console.log('mesa', this.mesa_id);
                this.showLoading();
                this.httpService.setAccessToken();
                if (this.httpService.get().items.length > 0) {
                    let pedido = {
                        items: this.httpService.get().items,
                        total: this.httpService.get().total,
                        mesa_id: this.mesa_id,
                        client_id: this.client.id,
                        type: this.tipo
                    };
                    this.httpService.builder()
                        .insert(pedido, 'order')
                        .then((res) => {
                            this.httpService.clear();
                            this.httpService.eventEmitter.emit();
                            this.hideLoading();
                            this.toasterService.pop('success', 'Sucesso', 'Pedido ' + res.data.id + ' salvo com sucesso');
                            this.close();
                        });
                } else {
                    this.hideLoading();
                    this.toasterService.pop('error', 'Erro', 'É necessário adicionar ao menos um produto');
                }
            } else {
                this.toasterService.pop('error', 'Erro', 'É necessário escolher uma mesa');
            }
        }
    }

    close()
    {
        jQuery('#new_order').hide();
        this.router.navigate(['/orders']);
    }

    closeMd()
    {
        jQuery('#pesquisa').hide();
    }

    hideLoading(){
        jQuery(".container-loading").hide();
    }
    showLoading(){
        jQuery(".container-loading").show();
    }
}

