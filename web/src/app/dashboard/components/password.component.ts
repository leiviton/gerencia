import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Router } from '@angular/router';
import * as jQuery from 'jquery';

import { environment } from '../../../environments/environment';
import {AuthService} from "../../user/services/auth.service";
import {AppMessageService} from "../../app-message.service";
@Component({
    templateUrl: './password.component.html'
})
export class PasswordComponent{

    constructor(private authService: DashboardService,private service: AuthService, private toast: AppMessageService, private router: Router){}

    user: any = {
        password: null,
        password_confirmation:null
    };

    id:null;
    password_at: '';
    validar = false;
    ngOnInit(): void {
        let u = {id:null};
        u = JSON.parse(localStorage.getItem('user') || null);
        this.id = u.id;
        this.showLoading();
        jQuery('#infoModal').on('show.bs.modal').show().addClass('show');
        setTimeout(() => {
            this.hideLoading();
        },300)
    }
    save(e){
        this.showLoading();
        if (this.user.password && this.user.password === this.user.password_confirmation) {
            this.authService.builder('password').update(this.id,this.user)
                .then(() => {
                    this.hideLoading();
                    this.toast.message('Sucesso','Nova senha definida com sucesso','success');
                    this.router.navigate(['dashboard']);
                });
        } else {
            this.toast.message('Erro','Não foi possivel salvar','error');
        }
    }

    valid()
    {

        let u = JSON.parse(localStorage.getItem('user') || null);
        let data = {
            grant_type: 'password',
            client_id: environment.client_id,
            client_secret: environment.client_secret,
            username: u.email,
            password: this.password_at,
            scope: ''
        };

        this.service.login(data).then((res) => {
            this.validar = true;
        }).catch(() => {
            this.validar = false;
            this.toast.message('Erro','Senha incorreta','error');
        })
    }
    close(){
        jQuery('#successModal').hide();
        this.router.navigate(['/dashboard']);
    }
    hideLoading(){
        jQuery("#bifrostBarSpinner").hide();
    }

    showLoading(){
        jQuery("#bifrostBarSpinner").show();
    }

}
