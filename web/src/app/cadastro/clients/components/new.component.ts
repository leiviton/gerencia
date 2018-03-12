import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { ClientsService } from '../services/clients.service';
import { FormsModule } from '@angular/forms';
import {AppMessageService} from "../../../app-message.service";

@Component({
    templateUrl: 'new.component.html'
})
export class NewComponent implements OnInit {

    constructor(private httpService: ClientsService, private router: Router, private route: ActivatedRoute
        , private notification: AppMessageService
    ) {}

    client = {
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
        setTimeout(() => {
            this.hideLoading();
        },300)
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
            this.httpService.builder()
                .insert(e, 'client')
                .then(() => {
                    this.httpService.eventEmitter.emit();
                    this.hideLoading();
                    this.notification.message('Sucesso', 'Cliente salvo com sucesso', 'success');
                    this.close();
                });
        }else{
            this.notification.message('Erro', 'Verifique se todos os campos foram preenchidos.', 'error');
        }

    }

    close(){
        jQuery('#infoModal').hide();
        this.router.navigate(['/cadastro/clients']);
    }

    hideLoading(){
        jQuery("#bifrostBarSpinner").hide();
    }

    showLoading(){
        jQuery("#bifrostBarSpinner").show();
    }
}
