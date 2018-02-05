import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {ToasterService} from 'angular2-toaster';
import {ClientsService} from "../services/clients.service";

@Component({
    templateUrl: 'edit.component.html'
})
export class EditComponent implements OnInit {

    constructor(private httpService: ClientsService, private router: Router, private route: ActivatedRoute
        ,private toasterService: ToasterService
    ) {}

    client = {
        id:null,
        name:null,
        phone:null,
        address:{
            address:null,
            numero:null,
            bairro:null,
            city_id:0,
            complemento:null
        },
        email:null
    };
    ngOnInit(): void {
        this.showLoading();
        jQuery('#infoModal').show().addClass('show');
        this.httpService.setAccessToken();
        this.route.params
            .subscribe(params => {
                this.httpService.builder().view(params['id'],'client')
                    .then((res) => {
                        if(res.data.user){
                            this.client.id = res.data.id;
                            this.client.name = res.data.name;
                            this.client.phone = res.data.phone;
                            this.client.email = res.data.user.data.email;
                            this.client.address.address = res.data.addressClient.data.address;
                            this.client.address.numero = res.data.addressClient.data.numero;
                            this.client.address.bairro = res.data.addressClient.data.bairro;
                            this.client.address.complemento = res.data.addressClient.data.complemento;
                            this.client.address.city_id = res.data.addressClient.data.city.data.id;
                            this.hideLoading();
                        }else{
                            this.client.id = res.data.id;
                            this.client.name = res.data.name;
                            this.client.phone = res.data.phone;
                            this.client.email = '';
                            this.client.address.address = res.data.addressClient.data.address;
                            this.client.address.numero = res.data.addressClient.data.numero;
                            this.client.address.bairro = res.data.addressClient.data.bairro;
                            this.client.address.complemento = res.data.addressClient.data.complemento;
                            this.client.address.city_id = res.data.addressClient.data.city.data.id;
                            this.hideLoading();
                        }
                    });
            });
    }

    save(e)
    {
        if(this.client.name != null && this.client.name.length > 4
            && this.client.email != null && this.client.email.length > 4
            && this.client.phone != null && this.client.phone > 10
            && this.client.address.bairro != null && this.client.address.bairro.length > 4
            && this.client.address.address != null && this.client.address.address.length > 4
            && this.client.address.numero != null && this.client.address.city_id != null) {
            this.showLoading();
            this.httpService.setAccessToken();
            this.httpService.builder('client')
                .update(this.client.id, e)
                .then(() => {
                    this.httpService.eventEmitter.emit();
                    this.hideLoading();
                    this.toasterService.pop('success', 'Sucesso', 'Cliente salvo com sucesso');
                    this.close();
                });
        }else{
            this.toasterService.pop('error', 'Erro', 'Verifique se todos os campos foram preenchidos.');
        }

    }

    close(){
        jQuery('#infoModal').hide();
        this.router.navigate(['/cadastro/clients']);
    }

    hideLoading(){
        jQuery(".container-loading").hide();
    }

    showLoading(){
        jQuery(".container-loading").show();
    }

}
