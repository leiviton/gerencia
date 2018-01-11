import { Component, OnInit } from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import * as jQuery from 'jquery';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { UsersService } from '../services/users.service';
import { FormsModule } from '@angular/forms';

@Component({
    templateUrl: 'new.component.html'
})
export class NewComponent implements OnInit {

    constructor(private httpService: UsersService, private router: Router, private route: ActivatedRoute
        ,private toasterService: ToasterService
    ) {}

    user = {
        name:null,
        email:null,
        role:null,
        password: null
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
        if(this.user.name != null && this.user.name.length > 4
            && this.user.email != null && this.user.email.length > 4
            && this.user.role != null && this.user.role > 10
            && this.user.password != null && this.user.password.length > 4) {
            this.showLoading();
            this.httpService.setAccessToken();
            this.httpService.builder()
                .insert(e, 'user')
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
