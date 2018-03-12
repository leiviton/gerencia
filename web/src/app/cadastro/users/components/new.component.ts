import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { UsersService } from '../services/users.service';
import { FormsModule } from '@angular/forms';
import {AppMessageService} from "../../../app-message.service";

@Component({
    templateUrl: 'new.component.html'
})
export class NewComponent implements OnInit {

    constructor(private httpService: UsersService, private router: Router, private route: ActivatedRoute
        ,private toasterService: AppMessageService
    ) {}

    user = {
        name:null,
        email:null,
        role:'caixa',
        password: null
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
        setTimeout(() => {
            this.hideLoading();
        },300)
    }

    save(e)
    {
        if(this.user.name != null && this.user.name.length > 4
            && this.user.email != null && this.user.email.length > 4
            && this.user.role != null && this.user.role.length > 4
            && this.user.password != null && this.user.password.length > 4) {
            this.showLoading();
            this.httpService.setAccessToken();
            this.httpService.builder()
                .insert(e, 'users')
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
