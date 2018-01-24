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
                this.cancel();
            }
        });
    }


    cart =  this.httpService.get();
    order = {};
    client = {
        id:1,
        name:null,
        phone:null,
        address:{
            address:null,
            numero:null,
            bairro:null,
            city_id:0
        },
        email:null
    };
    items = [];
    result = [];
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
    cartao = false;
    troco = 0;
    bandeira = '';
    complements = {};
    complement = [{
          "id":0,
          "name":"Sem complemento",
          "price":0.0,
          "ativo":"S",
          "created_at":"",
          "updated_at":""
    }];
    idItem = 0;
    idCom = 0;
    ngOnInit(): void {
        if(!this.cart)
        {
            this.httpService.initCart();
        }
        this.items = this.httpService.get();
        this.total = this.httpService.get().total;
        this.httpService.setAccessToken();
        this.httpService.builder()
            .list({},'mesas/livres')
            .then((res) => {
                this.mesas = res.data;

            });

        this.showLoading();
        jQuery('#new_order').show().addClass('show');
        setTimeout(() => {
            this.hideLoading();
        },300);


        jQuery('#pesquisa').hide();
        jQuery('#complement').hide();
        jQuery('#cliente').hide();
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
                    if(res.data.length == 0){
                        this.client.id = 1;
                        this.client.name = null;
                        this.client.phone = null;
                        this.client.email = null;
                        this.client.address.address = null;
                        this.client.address.numero = null;
                        this.client.address.bairro = null;
                        this.client.address.city_id = 0;
                        this.novo = true;
                        this.toasterService.pop('info', 'Nenhum cliente encontrado, cadastre o cliente');
                    }else if (res.data.length == 1){
                        this.client.id = res.data[0].id;
                        this.client.name = res.data[0].name;
                        this.client.phone = res.data[0].phone;
                        this.client.email = res.data[0].user.data.email;
                        this.client.address.address = res.data[0].addressClient.data.address;
                        this.client.address.numero = res.data[0].addressClient.data.numero;
                        this.client.address.bairro = res.data[0].addressClient.data.bairro;
                        this.client.address.city_id = res.data[0].addressClient.data.city.data.id;
                        this.novo = false;
                    }else if(res.data.length > 1)
                    {
                        jQuery('#cliente').show().addClass('show').css('z-index', 1050 + 50);
                        jQuery('#new_order').css('z-index', 1040);
                        this.result = res;
                    }
                });
        }
    }

    addClient(c)
    {
        this.client.id = c.id;
        this.client.name = c.name;
        this.client.phone = c.phone;
        this.client.email = c.user.data.email;
        this.client.address.address = c.addressClient.data.address;
        this.client.address.numero = c.addressClient.data.numero;
        this.client.address.bairro = c.addressClient.data.bairro;
        this.client.address.city_id = c.addressClient.data.city.data.id;
        this.novo = false;
        this.pesquisa.value2 = null;
        jQuery('#cliente').hide();
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
                this.result = res;
                this.hideLoading();
                if(res.data.length > 1){
                    jQuery('#pesquisa').show().addClass('show').css('z-index', 1050 + 50);
                    jQuery('#new_order').css('z-index', 1040);
                }else{
                    if(res.data.length===1)
                    {
                        this.addItem(this.result["data"][0]);
                        this.total = this.httpService.get().total;
                        this.items = this.httpService.get();
                        this.qtd = 1;
                    }
                }
            });
    }

    addItem(item)
    {
        this.httpService.addItem(item,this.qtd);
        this.items = this.httpService.get();
        this.total = this.httpService.get().total;
        jQuery('#pesquisa').hide();
        this.toasterService.pop('success', 'Sucesso', 'Item codigo '+item.name+' adicionado.');
    }

    removeItem(i)
    {
        this.httpService.removeItem(i);
        this.total = this.httpService.get().total;
        this.items = this.httpService.get();
        this.complement = [{
            "id":0,
            "name":"Sem complemento",
            "price":0.0,
            "ativo":"S",
            "created_at":"",
            "updated_at":""
        }];
        this.toasterService.pop('info', 'Informação', 'Item removido.');
    }

    save()
    {
        let card = '';
        let bandeira = '';
        let pedido = {};
        if(this.tipo != 1){
            this.mesa_id = 1;
        }

        if(this.tipo != 1 && this.novo == true)
        {
            this.toasterService.pop('error', 'É necessário cadastrar um cliente ou selecionar');
        }else {
            if (this.mesa_id != null) {
                let troco = null;
                if(this.cartao == false)
                {
                    card = 'Não';
                }else{
                    card = 'Sim';
                    bandeira = 'Bandeira do cartão:' + this.bandeira;
                }

                if(this.troco > 0)
                {
                    troco = 'Troco para: '+this.troco+',00 reais';
                }else{
                    troco = '';
                }

                this.showLoading();
                this.httpService.setAccessToken();
                if (this.httpService.get().items.length > 0) {
                    pedido = {
                        items: this.httpService.get().items,
                        total: this.httpService.get().total,
                        mesa_id: this.mesa_id,
                        client_id: this.client.id,
                        type: this.tipo,
                        cartao: card,
                        troco: troco,
                        observacao: bandeira
                    };
                    this.httpService.builder()
                        .insert(pedido, 'order')
                        .then((res) => {
                            this.httpService.clear();
                            this.httpService.eventEmitter.emit();
                            this.hideLoading();
                            this.toasterService.pop('success', 'Sucesso', 'Pedido ' + res.data.id + ' salvo com sucesso');
                            this.close(res.data.id);
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

    saveClient()
    {
        if(this.client.name == null || this.client.phone == null)
        {
            this.toasterService.pop('error', 'Campos do cadastro vazio, verifique');
        }else if(this.client.address.address == null || this.client.address.bairro == null || this.client.address.numero == null)
        {
            this.toasterService.pop('error', 'Campos do endereço vazio, verifique');
        }else if(this.client.address.city_id == 0)
        {
            this.toasterService.pop('error', 'Selecione uma cidade');
        }else{
            this.client.id = null;
            this.httpService.builder()
                .insert(this.client,'client')
                .then((res) =>{
                    console.log(res);
                    this.client.id = res.data.id;
                    this.client.name = res.data.name;
                    this.client.phone = res.data.phone;
                    this.client.email = res.data.email;
                    this.client.address.address = res.data.addressClient.data.address;
                    this.client.address.numero = res.data.addressClient.data.numero;
                    this.client.address.bairro = res.data.addressClient.data.bairro;
                    this.client.address.city_id = res.data.addressClient.data.city.data.id;
                    this.novo = false;
                    this.toasterService.pop('success','Cliente '+ this.client.name+' cadastrado com sucesso, codigo:' + this.client.id);
                })
        }
    }

    close(id: number)
    {
        jQuery('#new_order').hide();
        this.router.navigate(['/orders/printer/'+id+'/S']);
    }

    cancel()
    {
        jQuery('#new_order').hide();
        this.router.navigate(['/orders']);
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

    addComplement(id)
    {
        this.httpService.builder()
            .view(id,'complement')
            .then((res)=>{
                let cart = this.httpService.get();
                if(this.complement[0].id == 0){
                    this.complement[0] = res.data;
                }else{
                    this.complement.push(res.data);
                }
                this.toasterService.pop('success','Sucesso','Adicionado complemento '+res.data.name);
            });
    }

    saveComplement()
    {
        if(this.complement[0].id != 0){
            this.httpService.addComplement(this.complement,this.idItem);
            this.items = this.httpService.get();
            this.total = this.httpService.get().total;
            this.complement = [{
                "id":0,
                "name":"Sem complemento",
                "price":0.0,
                "ativo":"S",
                "created_at":"",
                "updated_at":""
            }];
            this.closeComplement();
        }
        else{
            this.toasterService.pop('error', 'Erro','Adicionais não inseridos');
        }
    }
    closeComplement()
    {
        jQuery('#complement').hide();
    }

    closeMd()
    {
        jQuery('#pesquisa').hide();
    }


    closeC()
    {
        jQuery('#cliente').hide();
    }

    hideLoading(){
        jQuery(".container-loading").hide();
    }
    showLoading(){
        jQuery(".container-loading").show();
    }
}

