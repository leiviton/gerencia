import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Router } from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import * as jQuery from 'jquery';
@Component({
    templateUrl: './password.component.html'
})
export class PasswordComponent{

    constructor(private authService: DashboardService, private toast: ToasterService, private router: Router){}
   
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
                    this.toast.pop('success','Salvo','Nova senha definida com sucesso');
                    this.router.navigate(['dashboard']);
                });
        } else {
            this.toast.pop('error','Error','Não foi possivel salvar');
        }
    }

    validarSenha(p)
    {
        let u = JSON.parse(localStorage.getItem('user') || null);
        let us = {
            username:u.email,
            password:p
        }
        this.authService.builder('validar')
            .valid(u.id, us.password)
            .then((res)=>{
                if(res == true)
                {
                    this.validar = true;
                }else{
                    this.toast.pop('error','Error','Senha anterior inválida');
                }
            });
    }
    close(){
        jQuery('#successModal').hide();
        this.router.navigate(['/dashboard']);
    }
    hideLoading(){
        jQuery(".container-loading").hide();
    }

    showLoading(){
        jQuery(".container-loading").show();
    }

}