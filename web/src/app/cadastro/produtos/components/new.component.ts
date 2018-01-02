import { Component, OnInit } from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import * as jQuery from 'jquery';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { ProdutosService } from '../services/produtos.service';
import { FormsModule } from '@angular/forms';

@Component({
    templateUrl: 'new.component.html'
})
export class NewComponent implements OnInit {

    constructor(private httpService: ProdutosService, private router: Router, private route: ActivatedRoute
        ,private toasterService: ToasterService
    ) {}

    client = '';
    product = {
        name:null,
        description:null,
        price:null,
        category_id:null
    };
    groups = {};
    subgroups = {};
    ngOnInit(): void {
       this.showLoading();
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
                    this.toasterService.pop('success', 'Sucesso', 'Produto salvo com sucesso');
                    this.close();
                });
        }else{
            this.toasterService.pop('error', 'Erro', 'Verifique se todos os campos foram preenchidos.');
        }

    }

    close(){
        jQuery('#infoModal').hide();
        this.router.navigate(['/cadastro/produtos']);
    }

    hideLoading(){
        jQuery(".container-loading").hide();
    }

    showLoading(){
        jQuery(".container-loading").show();
    }

}
