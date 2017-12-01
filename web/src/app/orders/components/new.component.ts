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
    }

    cart =  this.httpService.get();
    order = {};
    client = '';
    items = [];
    result = {};
    qtd = 1;
    total = this.httpService.get().total;
    pesquisa = {
        value:null,
        telefone:null
    };
    mesas: {};
    mesa_id = 1;

    ngOnInit(): void {
        if(!this.cart)
        {
            this.httpService.initCart();
        }
        this.items = this.httpService.get();
        console.log('items', this.items);
        this.total = this.httpService.get().total;

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
        },300)
    }

    buscarCliente()
    {
        console.log(this.pesquisa.telefone);
    }

    buscar()
    {
        this.showLoading();
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
        console.log('mesa',this.mesa_id);
        this.showLoading();
        if(this.httpService.get().items.length > 0)
        {
            let pedido = {
                items: this.httpService.get().items,
                total: this.httpService.get().total,
                mesa_id: this.mesa_id,
                client_id: 1
            };
            this.httpService.builder()
                .insert(pedido,'order')
                .then((res) => {
                    this.httpService.clear();
                    this.httpService.eventEmitter.emit();
                    this.hideLoading();
                    this.toasterService.pop('success', 'Sucesso', 'Pedido '+ res.data.id +' salvo com sucesso');
                    this.close();
                });
        }else {
            this.hideLoading();
            this.toasterService.pop('error', 'Erro', 'É necessário adicionar ao menos um produto');
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
