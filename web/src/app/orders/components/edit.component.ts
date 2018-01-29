import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { OrdersService } from '../services/orders.service';
import { FormsModule } from '@angular/forms';


import {ToasterService} from 'angular2-toaster';

@Component({
    templateUrl: 'edit.component.html'
})
export class EditComponent implements OnInit {

    constructor(private httpService: OrdersService, private router: Router, private route: ActivatedRoute
        ,private toasterService: ToasterService)
    {
        document.onkeydown = ((e) =>{
            if(e.keyCode  == 120)
            {
                this.update();
            }

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
        observacao:''
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

    mesa_id = null;
    products = {};
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
    historico = '';
    idItem = 0;
    complements = {};
    complement = [{
        "id":0,
        "name":"Sem complemento",
        "price":0.0,
        "ativo":"S",
        "created_at":"",
        "updated_at":""
    }];

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
                            if(res.data.client.data.user) {
                                this.client.id = res.data.client.data.id;
                                this.client.name = res.data.client.data.name;
                                this.client.phone = res.data.client.data.phone;
                                this.client.email = res.data.client.data.user.data.email;
                                this.client.address.address = res.data.client.data.addressClient.data.address;
                                this.client.address.numero = res.data.client.data.addressClient.data.numero;
                                this.client.address.bairro = res.data.client.data.addressClient.data.bairro;
                                this.client.address.city_id = res.data.client.data.addressClient.data.city.data.id;
                            }else{
                                this.client.id = res.data.client.data.id;
                                this.client.name = res.data.client.data.name;
                                this.client.phone = res.data.client.data.phone;
                                this.client.email = '';
                                this.client.address.address = res.data.client.data.addressClient.data.address;
                                this.client.address.numero = res.data.client.data.addressClient.data.numero;
                                this.client.address.bairro = res.data.client.data.addressClient.data.bairro;
                                this.client.address.city_id = res.data.client.data.addressClient.data.city.data.id;
                            }
                            this.products = res.data.items;
                            this.mesa = res.data.mesa.data.name;
                            this.mesa_id = res.data.mesa.data.id;
                            this.hideLoading();
                    });
                this.httpService.setAccessToken();
                this.httpService.builder()
                    .list({},'mesas/livres')
                    .then((res) => {
                        this.mesas = res;
                    });

            });
        this.httpService.eventEmitter.emit();

        jQuery('#pesquisa').hide();

        this.closeComplement();

        this.closeInformacao();
    }

    update()
    {
        this.showLoading();
        let order = {
            'status': this.order.status,
            'mesa_id': this.mesa_id,
            'mesa_id_ant': this.order.mesa.data.id,
            'observacao': this.order.observacao
        };
        this.httpService.builder('order')
            .update(this.order.id, order)
            .then((res) => {
                this.httpService.eventEmitter.emit();
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
                }else{
                    this.client.id = res.data.client.data.id;
                    this.client.name = res.data.client.data.name;
                    this.client.phone = res.data.client.data.phone;
                    this.client.email = '';
                    this.client.address.address = res.data.client.data.addressClient.data.address;
                    this.client.address.numero = res.data.client.data.addressClient.data.numero;
                    this.client.address.bairro = res.data.client.data.addressClient.data.bairro;
                    this.client.address.city_id = res.data.client.data.addressClient.data.city.data.id;
                }
                this.products = res.data.items;
                this.mesa = res.data.mesa.data.name
                this.mesa_id = res.data.mesa.data.id;
                this.hideLoading();
                this.toasterService.pop('success', 'Sucesso','Pedido '+this.order.id+' com sucesso!')
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
                this.result = res;
                if(res.data.length > 1)
                {
                    this.hideLoading();
                    jQuery('#pesquisa').show().addClass('show').css('z-index', 1050 + 50);
                    jQuery('#successModal').css('z-index', 1040);
                }else if(res.data.length == 1){
                    this.hideLoading();
                    this.addItem(res.data[0]);
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
                }
            });
    }

    addComplement(id)
    {
        this.httpService.builder()
            .view(id,'complement')
            .then((res)=>{
                let cart = this.httpService.get();
                if(this.complement[0].id == 0){
                    this.complement[0] = res.data;
                    this.complement[0]['complement_id'] = res.data.id;
                    this.complement[0]['qtd'] = 1;
                }else{
                    let data = res.data;
                    data['complement_id'] = res.data.id;
                    data['qtd'] = 1;
                    this.complement.push(res.data);
                }
                this.toasterService.pop('success','Sucesso','Adicionado complemento '+res.data.name);
            });
    }

    saveComplement()
    {
        if(this.complement[0].id != 0){
            let data = {
                'complements':this.complement,
                'order_id': this.order.id,
                'item_id': this.idItem
            };

            this.httpService.builder()
                .insert(data,'complements/item')
                .then((res) =>{
                    this.httpService.eventEmitter.emit();
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
                    }else{
                        this.client.id = res.data.client.data.id;
                        this.client.name = res.data.client.data.name;
                        this.client.phone = res.data.client.data.phone;
                        this.client.email = '';
                        this.client.address.address = res.data.client.data.addressClient.data.address;
                        this.client.address.numero = res.data.client.data.addressClient.data.numero;
                        this.client.address.bairro = res.data.client.data.addressClient.data.bairro;
                        this.client.address.city_id = res.data.client.data.addressClient.data.city.data.id;
                    }
                    this.products = res.data.items;
                    this.mesa = res.data.mesa.data.name
                    this.mesa_id = res.data.mesa.data.id;
                    this.complement = [{
                        "id":0,
                        "name":"Sem complemento",
                        "price":0.0,
                        "ativo":"S",
                        "created_at":"",
                        "updated_at":""
                    }];
                    this.closeComplement();
                    this.hideLoading();
                    this.toasterService.pop('success', 'Sucesso','Complementos salvos com sucesso!');
                });
        }
        else{
            this.closeComplement();
            this.hideLoading();
            this.toasterService.pop('error', 'Erro','Adicionais não inseridos');
        }
    }

    addHistorico()
    {
        this.showLoading();
        let data = {
            'order_id': this.order.id,
            'item_id': this.idItem,
            'historico': this.historico
        };
        this.httpService.builder('historico')
            .update(this.idItem,data)
            .then((res) =>{
                this.httpService.eventEmitter.emit();
                this.order = res.data;
                if(res.data.client.data.user) {
                    this.client.id = res.data.client.data.id;
                    this.client.name = res.data.client.data.name;
                    this.client.phone = res.data.client.data.phone;
                    this.client.email = res.data.client.data.user.data.email;
                    this.client.address.address = res.data.client.data.addressClient.data.address;
                    this.client.address.numero = res.data.client.data.addressClient.data.numero;
                    this.client.address.bairro = res.data.client.data.addressClient.data.bairro;
                    this.client.address.city_id = res.data.client.data.addressClient.data.city.data.id;
                }else{
                    this.client.id = res.data.client.data.id;
                    this.client.name = res.data.client.data.name;
                    this.client.phone = res.data.client.data.phone;
                    this.client.email = '';
                    this.client.address.address = res.data.client.data.addressClient.data.address;
                    this.client.address.numero = res.data.client.data.addressClient.data.numero;
                    this.client.address.bairro = res.data.client.data.addressClient.data.bairro;
                    this.client.address.city_id = res.data.client.data.addressClient.data.city.data.id;
                }
                this.products = res.data.items;
                this.mesa = res.data.mesa.data.name;
                this.mesa_id = res.data.mesa.data.id;
                this.historico = '';
                this.idItem = 0;
                this.toasterService.pop('success', 'Sucesso','Salvo com sucesso!');
                this.closeInformacao();
                this.hideLoading();
            });

    }

    removeItem(i)
    {
        this.showLoading();
        this.httpService.builder('remove/item')
            .delete(i)
            .then((res) =>{
                this.httpService.eventEmitter.emit();
                this.order = res.data;
                if(res.data.client.data.user) {
                    this.client.id = res.data.client.data.id;
                    this.client.name = res.data.client.data.name;
                    this.client.phone = res.data.client.data.phone;
                    this.client.email = res.data.client.data.user.data.email;
                    this.client.address.address = res.data.client.data.addressClient.data.address;
                    this.client.address.numero = res.data.client.data.addressClient.data.numero;
                    this.client.address.bairro = res.data.client.data.addressClient.data.bairro;
                    this.client.address.city_id = res.data.client.data.addressClient.data.city.data.id;
                }else{
                    this.client.id = res.data.client.data.id;
                    this.client.name = res.data.client.data.name;
                    this.client.phone = res.data.client.data.phone;
                    this.client.email = '';
                    this.client.address.address = res.data.client.data.addressClient.data.address;
                    this.client.address.numero = res.data.client.data.addressClient.data.numero;
                    this.client.address.bairro = res.data.client.data.addressClient.data.bairro;
                    this.client.address.city_id = res.data.client.data.addressClient.data.city.data.id;
                }
                this.products = res.data.items;
                this.mesa = res.data.mesa.data.name;
                this.mesa_id = res.data.mesa.data.id;
                this.historico = '';
                this.idItem = 0;
                this.toasterService.pop('success', 'success','Removido com sucesso');
                this.hideLoading();
            });
    }

    showInformacao(i)
    {
        jQuery('#informacao').show().addClass('show').css('z-index',1050 + 60);
        jQuery('#new_order').css('z-index', 1040);
        this.idItem = i;
    }

    showComplement(i)
    {
        jQuery('#complement').show().addClass('show').css('z-index',1050 + 60);
        jQuery('#new_order').css('z-index', 1040);
        this.getComplements();
        this.idItem = i;
        console.log('index',i);
    }

    getComplements()
    {
        this.httpService.builder()
            .list({},'complements')
            .then((res) =>{
                this.complements = res;
                console.log('complements',res);
            })
    }
    closeMd()
    {
        jQuery('#pesquisa').hide();
    }

    closeInformacao()
    {
        jQuery('#informacao').hide();
    }

    closeComplement()
    {
        jQuery('#complement').hide();
    }

    saveItem(item)
    {
        this.showLoading();
        this.addItem(item);
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
                this.hideLoading();
                jQuery('#pesquisa').hide();
            });
    }

    addItem(item)
    {
        this.httpService.addItem(item,this.qtd);
        this.toasterService.pop('success', 'Sucesso', 'Item codigo '+item.id+' adicionado.');
    }


    close(){
        jQuery('#successModal').on('show.bs.modal').show().removeClass('show');
        this.router.navigate(['/orders']);
    }

    pagar(){
        jQuery('#successModal').hide();
        this.router.navigate(['/orders/payment/'+this.order.id]);
    }

    save(){
        if(this.imprimir == true){
            jQuery('#successModal').on('show.bs.modal').show().removeClass('show');
            this.router.navigate(['/orders/printer/'+ this.order.id+'/N']);
        }else{
            this.toasterService.pop('error', 'Erro', 'Para imprimir é necessário ter adicionado novos itens.');
        }
    }

    habilitarEdicao()
    {
        this.editar = !this.editar;
    }
    hideLoading(){
        jQuery(".container-loading").hide();
    }

    showLoading(){
        jQuery(".container-loading").show();
    }

}
