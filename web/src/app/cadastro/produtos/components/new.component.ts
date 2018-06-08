import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { ProdutosService } from '../services/produtos.service';
import { FormsModule } from '@angular/forms';
import {AppMessageService} from "../../../app-message.service";

@Component({
    templateUrl: 'new.component.html'
})
export class NewComponent implements OnInit {

    constructor(private httpService: ProdutosService, private router: Router,
                private route: ActivatedRoute,private toasterService: AppMessageService
    ) {}

    client = '';
    product = {
        name:null,
        description:null,
        price:null,
        category_id:null
    };
    groups = {
        data:[]
    };
    subgroups = {};
    ngOnInit(): void {
       this.showLoading();
        let u = {role:null};
        u = JSON.parse(localStorage.getItem('user') || null);
        if(u.role !== 'gerente' && u.role !== 'admin' && u.role !== 'superuser')
        {
            this.toasterService.message('Sem permissão','Usuário sem acesso, contate o administrador','error');
            this.router.navigate(['/cadastro/produtos']);
            this.hideLoading();
        }
        jQuery('#infoModal').show().addClass('show');
        setTimeout(() => {
            this.grupos();
            this.hideLoading();
        },300)
    }

    grupos()
    {
        this.httpService.setAccessToken();
        this.httpService.builder()
            .list({},'groups')
            .then((res)=>{
                this.groups = res;
            });
    }

    subgrupos()
    {
        this.httpService.setAccessToken();
        this.httpService.builder()
            .list({},'subgroups')
            .then((res)=>{
                this.subgroups = res;
            })
    }

    save(e)
    {
        if(this.product.name != null && this.product.name.length > 4
            && this.product.description != null && this.product.description.length > 4
            && this.product.price != null && this.product.category_id != null) {
            this.showLoading();
            this.httpService.setAccessToken();
            this.httpService.builder()
                .insert(e, 'product/store')
                .then(() => {
                    this.httpService.eventEmitter.emit();
                    this.hideLoading();
                    this.toasterService.message('Sucesso', 'Produto salvo com sucesso','success');
                    this.close();
                });
        }else{
            this.toasterService.message('Erro', 'Verifique se todos os campos foram preenchidos.','error');
        }
    }

    close(){
        jQuery('#infoModal').hide();
        this.router.navigate(['/cadastro/produtos']);
    }

    hideLoading(){
        jQuery("#bifrostBarSpinner").hide();
    }

    showLoading(){
        jQuery("#bifrostBarSpinner").show();
    }

}
