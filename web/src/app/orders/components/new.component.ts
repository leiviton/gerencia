import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { OrdersService } from '../services/orders.service';
import { FormsModule } from '@angular/forms';

import {AppMessageService} from "../../app-message.service";

@Component({
    templateUrl: 'new.component.html'
})
export class NewComponent implements OnInit {

    constructor(private httpService: OrdersService, private router: Router,
                private route: ActivatedRoute,private toasterService: AppMessageService) {
        document.onkeydown = ((e) =>{
            if(e.keyCode  == 120)
            {
                this.save();
            }

            if(e.keyCode == 27)
            {
                this.cancel();
            }

            if(e.keyCode == 113)
            {
                this.buscarCliente();
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
        user:{
            id:1
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
    historico = '';
    observacao = '';
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
        jQuery('#informacao').hide();
    }

    buscarCliente()
    {
        this.showLoading();
        if(this.pesquisa.value2 == null)
        {
            this.httpService.builder().list({}, 'clients')
                .then((res) => {
                    jQuery('#cliente').show().addClass('show').css('z-index', 1050 + 50);
                    jQuery('#new_order').css('z-index', 1040);
                    this.result = res;
                    this.hideLoading();
                });
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
                        this.toasterService.message('Informação', 'Nenhum cliente encontrado, cadastre o cliente','info');
                    }else if (res.data.length == 1){
                        if(this.client.user){
                            this.client.id = res.data[0].id;
                            this.client.name = res.data[0].name;
                            this.client.phone = res.data[0].phone;
                            this.client.email = '';
                            this.client.address.address = res.data[0].addressClient.data.address;
                            this.client.address.numero = res.data[0].addressClient.data.numero;
                            this.client.address.bairro = res.data[0].addressClient.data.bairro;
                            this.client.address.city_id = res.data[0].addressClient.data.city.data.id;
                        }else{
                            this.client.id = res.data[0].id;
                            this.client.name = res.data[0].name;
                            this.client.phone = res.data[0].phone;
                            this.client.email = '';
                            this.client.address.address = res.data[0].addressClient.data.address;
                            this.client.address.numero = res.data[0].addressClient.data.numero;
                            this.client.address.bairro = res.data[0].addressClient.data.bairro;
                            this.client.address.city_id = res.data[0].addressClient.data.city.data.id;
                        }
                        this.novo = false;
                    }else if(res.data.length > 1)
                    {
                        jQuery('#cliente').show().addClass('show').css('z-index', 1050 + 50);
                        jQuery('#new_order').css('z-index', 1040);
                        this.result = res;
                    }
                    this.hideLoading()
                });
        }
    }

    addClient(c)
    {
        if(c.user){
            this.client.id = c.id;
            this.client.name = c.name;
            this.client.phone = c.phone;
            this.client.email = c.user.data.email;
            this.client.user.id = c.user.data.id;
            this.client.address.address = c.addressClient.data.address;
            this.client.address.numero = c.addressClient.data.numero;
            this.client.address.bairro = c.addressClient.data.bairro;
            this.client.address.city_id = c.addressClient.data.city.data.id;
        }else{
            this.client.id = c.id;
            this.client.name = c.name;
            this.client.phone = c.phone;
            this.client.email = '';
            this.client.address.address = c.addressClient.data.address;
            this.client.address.numero = c.addressClient.data.numero;
            this.client.address.bairro = c.addressClient.data.bairro;
            this.client.address.city_id = c.addressClient.data.city.data.id;
        }
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
                if(res.data.length == 0 || res.data[0].id == 58)
                {
                    this.toasterService.message('Erro', 'Item não localizado','error');

                }else{
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
                }
            });
    }

    addItem(item)
    {
        this.httpService.addItem(item,this.qtd);
        this.items = this.httpService.get();
        this.total = this.httpService.get().total;
        jQuery('#pesquisa').hide();
        this.toasterService.message('Sucesso', 'Item '+item.name+' adicionado.','success');
    }

    saveObserve(o)
    {
        this.httpService.obs(o,this.idItem);
        this.items = this.httpService.get();
        jQuery('#informacao').hide();
        this.toasterService.message('Sucesso', 'Observção salva','success');
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
        this.toasterService.message('Informação', 'Item removido.','info');
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
            this.toasterService.message('Erro', 'É necessário cadastrar um cliente ou selecionar','error');
        }else {
            if (this.mesa_id != null) {
                let troco = null;
                if(this.cartao == false)
                {
                    card = 'Não';
                }else{
                    card = 'Sim ';
                    bandeira = '- Bandeira do cartão:' + this.bandeira;
                }

                if(this.troco > 0)
                {
                    troco = 'Troco para: '+this.troco+',00 reais';
                }else{
                    troco = '';
                    bandeira = '';
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
                        cartao: card+bandeira,
                        troco: troco,
                        observacao: this.observacao
                    };
                    this.httpService.setAccessToken();
                    this.httpService.builder()
                        .insert(pedido, 'order')
                        .then((res) => {
                            this.httpService.clear();
                            this.httpService.eventEmitter.emit();
                            this.hideLoading();
                            this.toasterService.message('Sucesso', 'Pedido ' + res.data.id + ' salvo com sucesso','success');
                            this.close(res.data.id);
                        });
                } else {
                    this.hideLoading();
                    this.toasterService.message('Erro', 'É necessário adicionar ao menos um produto','error');
                }
            } else {
                this.toasterService.message('Erro', 'É necessário escolher uma mesa','error');
            }
        }
    }

    saveClient()
    {
        if(this.client.name == null || this.client.phone == null)
        {
            this.toasterService.message('Erro', 'Verifique nome e telefone do cliente','error');
        }else if(this.client.address.address == null || this.client.address.bairro == null || this.client.address.numero == null)
        {
            this.toasterService.message('Erro', 'Campos do endereço vazio, verifique','error');
        }else if(this.client.address.city_id == 0)
        {
            this.toasterService.message('Erro', 'Selecione uma cidade','error');
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
                    this.toasterService.message('Sucesso','Cliente '+ this.client.name+' cadastrado com sucesso, codigo:' + this.client.id,'success');
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

    showObservacao(i)
    {
        jQuery('#informacao').show().addClass('show').css('z-index',1050 + 60);
        jQuery('#new_order').css('z-index', 1040);
        this.idItem = i;
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
                this.toasterService.message('Sucesso','Adicionado complemento '+res.data.name,'success');
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
            this.toasterService.message('Erro','Adicionais não inseridos','error');
        }
    }
    closeComplement()
    {
        jQuery('#complement').hide();
    }

    closeInformacao()
    {
        jQuery('#informacao').hide();
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
        jQuery("#bifrostBarSpinner").hide();
    }
    showLoading(){
        jQuery("#bifrostBarSpinner").show();
    }
}

