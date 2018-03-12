import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { MesasService } from '../services/mesas.service';
import { FormsModule } from '@angular/forms';
import {AppMessageService} from "../../../app-message.service";

@Component({
    templateUrl: 'new.component.html'
})
export class NewComponent implements OnInit {

    constructor(private httpService: MesasService, private router: Router, private route: ActivatedRoute
        ,private notification: AppMessageService
    ) {}
    mesa = {
        name:null,
        description:null
    };
    ngOnInit(): void {
       this.showLoading();
        let u = {role:null};
        u = JSON.parse(localStorage.getItem('user') || null);
        if(u.role !== 'gerente' && u.role !== 'admin')
        {
            this.notification.message('Erro','Sem permissão, contate o administrador','error');
            this.router.navigate(['/user/login']);
        }
        jQuery('#infoModal').show().addClass('show');
        setTimeout(() => {
            this.hideLoading();
        },300)
    }

    save(e)
    {
        if(this.mesa.name != null && this.mesa.name.length > 4
            && this.mesa.description != null && this.mesa.description.length > 4) {
            this.showLoading();
            this.httpService.setAccessToken();
            this.httpService.builder()
                .insert(e, 'mesa')
                .then(() => {
                    this.httpService.eventEmitter.emit();
                    this.hideLoading();
                    this.notification.message('Sucesso','Cliente salvo com sucesso','success');
                    this.close();
                });
        }else{
            this.notification.message('Erro','Verifique se todos os campos foram preenchidos.','error');
        }

    }

    close(){
        jQuery('#infoModal').hide();
        this.router.navigate(['/cadastro/mesas']);
    }

    hideLoading(){
        jQuery("#bifrostBarSpinner").hide();
    }

    showLoading(){
        jQuery("#bifrostBarSpinner").show();
    }
}
