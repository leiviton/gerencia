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

    user = {
        id:null,
        name:null,
        email:null,
        role:null,
        password:null
    };
    ngOnInit(): void {
        this.showLoading();
        jQuery('#infoModal').show().addClass('show');
        this.httpService.setAccessToken();
        this.route.params
            .subscribe(params => {
                this.httpService.builder().view(params['id'],'users')
                    .then((res) => {
                        this.user.id = res.data.id;
                        this.user.name = res.data.name;
                        this.user.email = res.data.email;
                        this.user.role = res.data.role;
                        this.hideLoading();
                    });
            });
    }

    save(e)
    {
        if(this.user.name != null && this.user.name.length > 4
            && this.user.email != null && this.user.email.length > 4
            && this.user.role != null && this.user.role.length > 3
            ) {
            this.showLoading();
            this.httpService.setAccessToken();
            this.httpService.builder('users')
                .update(this.user.id, e)
                .then(() => {
                    this.httpService.eventEmitter.emit();
                    this.hideLoading();
                    this.toasterService.pop('success', 'Sucesso', 'Usuário salvo com sucesso');
                    this.close();
                });
        }else{
            this.toasterService.pop('error', 'Erro', 'Verifique se todos os campos foram preenchidos.');
        }

    }

    close(){
        jQuery('#infoModal').hide();
        this.router.navigate(['/cadastro/users']);
    }

    hideLoading(){
        jQuery(".container-loading").hide();
    }

    showLoading(){
        jQuery(".container-loading").show();
    }

}
