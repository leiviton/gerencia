import { Component, OnInit } from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import * as jQuery from 'jquery';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { MesasService } from '../services/mesas.service';
import { FormsModule } from '@angular/forms';

@Component({
    templateUrl: 'new.component.html'
})
export class NewComponent implements OnInit {

    constructor(private httpService: MesasService, private router: Router, private route: ActivatedRoute
        ,private toasterService: ToasterService
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
            this.toasterService.pop('error','Sem permissão','Usuário sem acesso, contate o administrador');
            this.router.navigate(['/dashboard']);
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
