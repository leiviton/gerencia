import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {UsersService} from "../services/users.service";
import {AppMessageService} from "../../../app-message.service";

@Component({
    templateUrl: 'edit.component.html'
})
export class EditComponent implements OnInit {

    constructor(private httpService: UsersService, private router: Router, private route: ActivatedRoute
        ,private toasterService: AppMessageService
    ) {}

    user = {
        id:null,
        name:null,
        email:null,
        role:null,
        password:null
    };

    roles = {
        data:[]
    };
    ngOnInit(): void {
        this.showLoading();
        let u = {role:null};
        u = JSON.parse(localStorage.getItem('user') || null);
        if(u.role !== 'gerente' && u.role !== 'admin')
        {
            this.toasterService.message('Sem permissão','Usuário sem acesso, contate o administrador','error');
            this.router.navigate(['/']);
        }
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
        this.httpService.builder()
            .list({},'roles')
            .then((res)=>{
                this.roles.data = res;
                this.hideLoading();
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
                    this.toasterService.message('Sucesso', 'Usuário salvo com sucesso','success');
                    this.close();
                });
        }else{
            this.toasterService.message('Erro', 'Verifique se todos os campos foram preenchidos.','error');
        }

    }

    close(){
        jQuery('#infoModal').hide();
        this.router.navigate(['/cadastro/users']);
    }

    hideLoading(){
        jQuery("#bifrostBarSpinner").hide();
    }

    showLoading(){
        jQuery("#bifrostBarSpinner").show();
    }
}
