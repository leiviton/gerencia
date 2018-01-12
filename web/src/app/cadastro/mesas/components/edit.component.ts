import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {ToasterService} from 'angular2-toaster';
import {MesasService} from "../services/mesas.service";

@Component({
    templateUrl: 'edit.component.html'
})
export class EditComponent implements OnInit {

    constructor(private httpService: MesasService, private router: Router, private route: ActivatedRoute
        ,private toasterService: ToasterService
    ) {}

    mesa = {
        id:null,
        name:null,
        description:null,
    };
    ngOnInit(): void {
        this.showLoading();
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
            this.httpService.builder('users')
                .update(this.mesa.id, e)
                .then(() => {
                    this.httpService.eventEmitter.emit();
                    this.hideLoading();
                    this.toasterService.pop('success', 'Sucesso', 'Mesa salva com sucesso');
                    this.close();
                });
        }else{
            this.toasterService.pop('error', 'Erro', 'Verifique se todos os campos foram preenchidos.');
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
