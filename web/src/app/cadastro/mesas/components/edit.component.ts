import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {MesasService} from "../services/mesas.service";
import {AppMessageService} from "../../../app-message.service";

@Component({
    templateUrl: 'edit.component.html'
})
export class EditComponent implements OnInit {

    constructor(private httpService: MesasService, private router: Router, private route: ActivatedRoute
        ,private notification: AppMessageService
    ) {}

    mesa = {
        id:null,
        name:null,
        description:null,
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
        this.httpService.setAccessToken();
        this.route.params
            .subscribe(params => {
                this.httpService.builder().view(params['id'],'mesa')
                    .then((res) => {
                        this.mesa.id = res.data.id;
                        this.mesa.name = res.data.name;
                        this.mesa.description = res.data.description;
                        this.hideLoading();
                    });
            });
    }

    save(e)
    {
        if(this.mesa.name != null && this.mesa.name.length > 4
            && this.mesa.description != null && this.mesa.description.length > 4
            ) {
            this.showLoading();
            this.httpService.setAccessToken();
            this.httpService.builder('mesa')
                .update(this.mesa.id, e)
                .then(() => {
                    this.httpService.eventEmitter.emit();
                    this.hideLoading();
                    this.notification.message('Sucesso', 'Mesa salva com sucesso', 'success');
                    this.close();
                });
        }else{
            this.notification.message('Error', 'Verifique se todos os campos foram preenchidos.', 'error');
        }

    }

    close(){
        jQuery('#infoModal').hide();
        this.router.navigate(['/cadastro/mesas']);
    }

    hideLoading(){
        jQuery(".container-loading").hide();
    }

    showLoading(){
        jQuery(".container-loading").show();
    }

}
